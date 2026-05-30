package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	client     *mongo.Client
	database   *mongo.Database
	jwtSecret  []byte
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment variables")
	}

	// Initialize MongoDB
	mongoURI := getEnv("MONGODB_URI", "mongodb://localhost:27017")
	dbName := getEnv("DB_NAME", "portfolio")
	jwtSecret = []byte(getEnv("JWT_SECRET", "your-secret-key-change-this"))

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var err error
	client, err = mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatal("Failed to connect to MongoDB:", err)
	}

	// Ping the database
	if err := client.Ping(ctx, nil); err != nil {
		log.Fatal("Failed to ping MongoDB:", err)
	}

	database = client.Database(dbName)
	log.Println("Connected to MongoDB successfully!")

	// Check if we should seed the database
	if len(os.Args) > 1 && os.Args[1] == "-seed" {
		seedDatabase()
		return
	}

	if string(jwtSecret) == "your-secret-key-change-this" {
		log.Println("WARNING: JWT_SECRET is using the default value. Set a strong secret in production!")
	}

	// Initialize Gin router
	router := gin.New()
	router.Use(gin.Logger())
	router.Use(gin.Recovery())

	// CORS configuration
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:5173", "http://localhost:5174"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Routes
	setupRoutes(router)

	// Start server
	port := getEnv("PORT", "8080")
	log.Printf("Server starting on port %s...", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}

func setupRoutes(router *gin.Engine) {
	api := router.Group("/api")
	{
		// Public routes
		api.GET("/profile", getProfile)
		api.GET("/skills", getSkills)
		api.GET("/projects", getProjects)
		api.GET("/experience", getExperience)
		api.GET("/education", getEducation)
		api.GET("/testimonials", getTestimonials)
		api.GET("/blog", getBlogPosts)
		api.GET("/blog/:id", getBlogPost)
		api.POST("/contact", createContact)

		// Auth routes
		auth := api.Group("/auth")
		{
			auth.POST("/login", loginRateLimitMiddleware(), login)
		}

		// Protected admin routes
		admin := api.Group("/admin")
		admin.Use(authMiddleware())
		{
			admin.PUT("/profile", updateProfile)
			
			admin.POST("/skills", createSkill)
			admin.PUT("/skills/:id", updateSkill)
			admin.DELETE("/skills/:id", deleteSkill)
			
			admin.POST("/projects", createProject)
			admin.PUT("/projects/:id", updateProject)
			admin.DELETE("/projects/:id", deleteProject)
			
			admin.POST("/experience", createExperience)
			admin.PUT("/experience/:id", updateExperience)
			admin.DELETE("/experience/:id", deleteExperience)

			admin.POST("/education", createEducation)
			admin.PUT("/education/:id", updateEducation)
			admin.DELETE("/education/:id", deleteEducation)
			
			admin.POST("/testimonials", createTestimonial)
			admin.PUT("/testimonials/:id", updateTestimonial)
			admin.DELETE("/testimonials/:id", deleteTestimonial)
			
			admin.POST("/blog", createBlogPost)
			admin.PUT("/blog/:id", updateBlogPost)
			admin.DELETE("/blog/:id", deleteBlogPost)
			
			admin.GET("/blog", getBlogPostsAdmin)

			admin.GET("/contacts", getContacts)
			admin.DELETE("/contacts/:id", deleteContact)
			admin.PATCH("/contacts/:id/read", markContactRead)
		}
	}

	// Health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
