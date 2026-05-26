package main

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

func seedDatabase() {
	ctx := context.Background()

	// Seed admin user
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte("admin123"), bcrypt.DefaultCost)
	admin := Admin{
		ID:        primitive.NewObjectID(),
		Username:  "admin",
		Password:  string(hashedPassword),
		Email:     "admin@portfolio.com",
		CreatedAt: time.Now(),
	}
	database.Collection("admins").InsertOne(ctx, admin)

	// Seed profile
	profile := Profile{
		ID:       primitive.NewObjectID(),
		Name:     "Nodirbek Iskandarov",
		Title:    "Frontend Developer",
		Bio:      "Results-driven Frontend Developer with nearly 2 years of professional experience building data-intensive government web applications. Specialized in React, Redux, and interactive data visualization (GIS maps, charts, dashboards). Proven ability to collaborate with cross-functional teams and deliver performant, accessible, and responsive UIs at scale.",
		Email:    "nodirbekiskandarov2003@gmail.com",
		Phone:    "+998 99 579 8545",
		Location: "Tashkent, Uzbekistan",
		Github:   "https://github.com/nodirbekiskandarov",
		LinkedIn: "https://linkedin.com/in/nodirbek-iskandarov",
		Twitter:  "https://twitter.com/nodirbekiskandarov",
		Website:  "https://nodirbekiskandarov.dev",
		UpdatedAt: time.Now(),
	}
	database.Collection("profile").InsertOne(ctx, profile)

	// Seed skills
	skills := []Skill{
		{ID: primitive.NewObjectID(), Name: "React.js", Category: "Frontend", Level: 95, Icon: "react", Order: 1, CreatedAt: time.Now()},
		{ID: primitive.NewObjectID(), Name: "Redux / Redux Toolkit", Category: "Frontend", Level: 90, Icon: "redux", Order: 2, CreatedAt: time.Now()},
		{ID: primitive.NewObjectID(), Name: "Next.js", Category: "Frontend", Level: 85, Icon: "nextjs", Order: 3, CreatedAt: time.Now()},
		{ID: primitive.NewObjectID(), Name: "JavaScript (ES6+)", Category: "Frontend", Level: 95, Icon: "javascript", Order: 4, CreatedAt: time.Now()},
		{ID: primitive.NewObjectID(), Name: "TypeScript", Category: "Frontend", Level: 85, Icon: "typescript", Order: 5, CreatedAt: time.Now()},
		{ID: primitive.NewObjectID(), Name: "HTML5 / CSS3", Category: "Frontend", Level: 95, Icon: "html", Order: 6, CreatedAt: time.Now()},
		{ID: primitive.NewObjectID(), Name: "SCSS / Tailwind", Category: "Frontend", Level: 90, Icon: "tailwind", Order: 7, CreatedAt: time.Now()},
		{ID: primitive.NewObjectID(), Name: "Bootstrap", Category: "Frontend", Level: 85, Icon: "bootstrap", Order: 8, CreatedAt: time.Now()},
		{ID: primitive.NewObjectID(), Name: "MUI (Material-UI)", Category: "Frontend", Level: 90, Icon: "mui", Order: 9, CreatedAt: time.Now()},
		{ID: primitive.NewObjectID(), Name: "Leaflet / GeoJSON", Category: "Frontend", Level: 85, Icon: "leaflet", Order: 10, CreatedAt: time.Now()},
		{ID: primitive.NewObjectID(), Name: "REST API", Category: "Backend", Level: 85, Icon: "api", Order: 11, CreatedAt: time.Now()},
		{ID: primitive.NewObjectID(), Name: "Git", Category: "Tools", Level: 90, Icon: "git", Order: 12, CreatedAt: time.Now()},
		{ID: primitive.NewObjectID(), Name: "Node.js", Category: "Backend", Level: 75, Icon: "nodejs", Order: 13, CreatedAt: time.Now()},
		{ID: primitive.NewObjectID(), Name: "MongoDB", Category: "Database", Level: 70, Icon: "mongodb", Order: 14, CreatedAt: time.Now()},
		{ID: primitive.NewObjectID(), Name: "Styled Components", Category: "Frontend", Level: 85, Icon: "styled", Order: 15, CreatedAt: time.Now()},
	}
	for _, skill := range skills {
		database.Collection("skills").InsertOne(ctx, skill)
	}

	// Seed projects
	projects := []Project{
		{
			ID:          primitive.NewObjectID(),
			Title:       "E-Commerce Platform",
			Description: "A full-featured e-commerce platform built with Next.js and Go. Features include product management, shopping cart, payment integration, and admin dashboard.",
			Image:       "https://via.placeholder.com/600x400",
			Technologies: []string{"Next.js", "Go", "MongoDB", "Stripe", "TailwindCSS"},
			GithubURL:   "https://github.com/nodirbek/ecommerce",
			LiveURL:     "https://ecommerce-demo.com",
			Featured:    true,
			Order:       1,
			CreatedAt:   time.Now(),
		},
		{
			ID:          primitive.NewObjectID(),
			Title:       "Task Management App",
			Description: "A collaborative task management application with real-time updates. Built with React, Node.js, and WebSockets.",
			Image:       "https://via.placeholder.com/600x400",
			Technologies: []string{"React", "Node.js", "Socket.io", "PostgreSQL", "Redux"},
			GithubURL:   "https://github.com/nodirbek/taskmanager",
			LiveURL:     "https://taskmanager-demo.com",
			Featured:    true,
			Order:       2,
			CreatedAt:   time.Now(),
		},
		{
			ID:          primitive.NewObjectID(),
			Title:       "Weather Dashboard",
			Description: "A beautiful weather dashboard with forecasts and historical data visualization.",
			Image:       "https://via.placeholder.com/600x400",
			Technologies: []string{"React", "TypeScript", "Chart.js", "OpenWeather API"},
			GithubURL:   "https://github.com/nodirbek/weather",
			LiveURL:     "https://weather-demo.com",
			Featured:    false,
			Order:       3,
			CreatedAt:   time.Now(),
		},
	}
	for _, project := range projects {
		database.Collection("projects").InsertOne(ctx, project)
	}

	// Seed experience
	experiences := []Experience{
		{
			ID:          primitive.NewObjectID(),
			Company:     "The State Committee of the Republic of Uzbekistan on Statistics",
			Position:    "Software Engineer",
			Description: "Developed and maintained GIS-based web applications for visualizing regional statistical data of Uzbekistan. Built interactive maps using Leaflet and GeoJSON to display demographic, economic, and social indicators. Implemented dynamic charts and dashboards (bar, donut, line, population pyramid) for data analysis. Refactored and optimized frontend components using React, Redux, MUI, and Styled Components. Integrated REST APIs and handled large datasets with graceful error and null-data handling. Collaborated with backend developers on MongoDB integration, spatial queries, and data import scripts. Improved application performance, usability, and accessibility across desktop and mobile devices.",
			Location:    "Tashkent, Uzbekistan",
			StartDate:   time.Date(2025, 3, 1, 0, 0, 0, 0, time.UTC),
			Current:     true,
			Order:       1,
			CreatedAt:   time.Now(),
		},
		{
			ID:          primitive.NewObjectID(),
			Company:     "Statistics Agency under the President of the Republic of Uzbekistan",
			Position:    "Lead Software Engineer",
			Description: "Led development and support of internal statistical web systems used by government analysts. Designed and implemented frontend architecture using React, Redux, and modern UI libraries. Developed interactive data visualization modules (charts, tables, dashboards) for regional and national statistics. Worked with GIS data and maps to visualize location-based statistical indicators. Integrated and optimized REST APIs, ensuring data accuracy and system stability. Participated in refactoring legacy code to improve performance, readability, and maintainability. Ensured localization, accessibility, and responsive behavior across different devices.",
			Location:    "Tashkent, Uzbekistan",
			StartDate:   time.Date(2024, 7, 1, 0, 0, 0, 0, time.UTC),
			EndDate:     &[]time.Time{time.Date(2025, 3, 1, 0, 0, 0, 0, time.UTC)}[0],
			Current:     false,
			Order:       2,
			CreatedAt:   time.Now(),
		},
	}
	for _, exp := range experiences {
		database.Collection("experience").InsertOne(ctx, exp)
	}

	// Seed testimonials
	testimonials := []Testimonial{
		{
			ID:        primitive.NewObjectID(),
			Name:      "John Smith",
			Position:  "CTO",
			Company:   "Tech Corp",
			Content:   "Nodirbek is an exceptional developer. His attention to detail and problem-solving skills are outstanding. He delivered our project ahead of schedule with excellent quality.",
			Rating:    5,
			Order:     1,
			CreatedAt: time.Now(),
		},
		{
			ID:        primitive.NewObjectID(),
			Name:      "Sarah Johnson",
			Position:  "Product Manager",
			Company:   "StartupXYZ",
			Content:   "Working with Nodirbek was a pleasure. He understood our requirements perfectly and provided valuable suggestions that improved our product significantly.",
			Rating:    5,
			Order:     2,
			CreatedAt: time.Now(),
		},
	}
	for _, testimonial := range testimonials {
		database.Collection("testimonials").InsertOne(ctx, testimonial)
	}

	// Seed blog posts
	blogPosts := []BlogPost{
		{
			ID:        primitive.NewObjectID(),
			Title:     "Getting Started with Go and MongoDB",
			Slug:      "getting-started-go-mongodb",
			Content:   "In this article, we'll explore how to build a REST API using Go and MongoDB. We'll cover connection setup, CRUD operations, and best practices...",
			Excerpt:   "Learn how to build a REST API using Go and MongoDB with practical examples.",
			Image:     "https://via.placeholder.com/800x400",
			Tags:      []string{"Go", "MongoDB", "Backend", "Tutorial"},
			Published: true,
			Views:     0,
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
		{
			ID:        primitive.NewObjectID(),
			Title:     "Modern React Patterns in 2026",
			Slug:      "modern-react-patterns-2026",
			Content:   "React continues to evolve, and with it, new patterns emerge. In this post, we'll discuss the latest patterns and best practices for building React applications...",
			Excerpt:   "Explore the latest React patterns and best practices for building modern web applications.",
			Image:     "https://via.placeholder.com/800x400",
			Tags:      []string{"React", "JavaScript", "Frontend", "Best Practices"},
			Published: true,
			Views:     0,
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
	}
	for _, post := range blogPosts {
		database.Collection("blog").InsertOne(ctx, post)
	}

	log.Println("Database seeded successfully!")
	log.Println("Admin credentials: username=admin, password=admin123")
}
