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

	// Clear existing collections before seeding
	for _, col := range []string{"admins", "profile", "skills", "projects", "experience", "testimonials", "blog", "contacts"} {
		database.Collection(col).Drop(ctx)
	}
	log.Println("Existing collections cleared")

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
			Title:       "AI-Powered Educational Platform",
			Description: "Full-stack educational platform with AI-powered chat tutoring built using Next.js and Claude AI. Features course and module management, topic-based learning, student progress tracking, and an intelligent AI assistant that answers student questions in real time. Backend powered by Prisma ORM with SQLite/Turso database.",
			Technologies: []string{"Next.js", "TypeScript", "Prisma", "SQLite", "Claude AI", "NextAuth", "TailwindCSS"},
			GithubURL:   "",
			LiveURL:     "",
			Featured:    true,
			Order:       1,
			CreatedAt:   time.Now(),
		},
		{
			ID:          primitive.NewObjectID(),
			Title:       "Census GIS Monitoring Dashboard",
			Description: "Enterprise-grade React admin dashboard for monitoring census GIS and agricultural statistics across Uzbekistan's regions. Includes 18+ report types, crop field mapping, target tracking, multi-role access control, and deep data visualization with Recharts and Material-UI. Backed by Supabase.",
			Technologies: []string{"React", "TypeScript", "Redux Toolkit", "Supabase", "Recharts", "Material-UI", "TailwindCSS", "Vite"},
			GithubURL:   "",
			LiveURL:     "",
			Featured:    true,
			Order:       2,
			CreatedAt:   time.Now(),
		},
		{
			ID:          primitive.NewObjectID(),
			Title:       "Statistical Registers Portal",
			Description: "Large-scale government administrative portal for managing statistical registers and organizations in Uzbekistan. Features role-based access, dynamic form creation, complex CRUD for classifiers and records, report generation, audit logs, data synchronization, and real-time updates via Socket.io. Built with React, MUI, and i18next.",
			Technologies: []string{"React", "TypeScript", "Material-UI", "Styled Components", "Socket.io", "Chart.js", "i18next", "Axios"},
			GithubURL:   "",
			LiveURL:     "",
			Featured:    true,
			Order:       3,
			CreatedAt:   time.Now(),
		},
		{
			ID:          primitive.NewObjectID(),
			Title:       "Barber Shop Admin Dashboard",
			Description: "Full-featured admin panel for managing a barber shop business. Includes barber and service management, appointment/booking system, customer reviews, interactive location map with Leaflet, and analytics charts with Recharts. Built with React, TypeScript, and Vite.",
			Technologies: []string{"React", "TypeScript", "Vite", "Leaflet", "Recharts", "React Router", "Axios"},
			GithubURL:   "",
			LiveURL:     "",
			Featured:    true,
			Order:       4,
			CreatedAt:   time.Now(),
		},
		{
			ID:          primitive.NewObjectID(),
			Title:       "Regional GIS Portal",
			Description: "Interactive frontend application for viewing and managing regional geographic data across Uzbekistan. Features interactive Leaflet maps, region passport data, republic-wide statistics, dark/light theme, multi-language support (i18next), data caching with React Query, and Zustand state management.",
			Technologies: []string{"React", "TypeScript", "Vite", "Leaflet", "React Query", "Zustand", "TailwindCSS", "Material-UI", "i18next"},
			GithubURL:   "",
			LiveURL:     "",
			Featured:    false,
			Order:       5,
			CreatedAt:   time.Now(),
		},
		{
			ID:          primitive.NewObjectID(),
			Title:       "Census GIS Backend API",
			Description: "Robust Node.js REST API for geospatial and census data management. Handles KML/GeoJSON file uploads, spatial analysis with Turf.js, PostgreSQL and MongoDB integration, JWT authentication, background job queues with Bull/Redis, Swagger API docs, and rate limiting.",
			Technologies: []string{"Node.js", "Express", "PostgreSQL", "MongoDB", "Turf.js", "Redis", "Bull", "JWT", "Swagger"},
			GithubURL:   "",
			LiveURL:     "",
			Featured:    false,
			Order:       6,
			CreatedAt:   time.Now(),
		},
		{
			ID:          primitive.NewObjectID(),
			Title:       "Organization Search Portal",
			Description: "React-based enterprise portal for searching and managing organizations and their statistical data. Includes organization and user management, classifier CRUD, records and data exchange (DXA) handling, Highcharts visualizations, CSV export, multi-language support, and test-mode security features.",
			Technologies: []string{"React", "Material-UI", "Highcharts", "i18next", "Axios", "TailwindCSS"},
			GithubURL:   "",
			LiveURL:     "",
			Featured:    false,
			Order:       7,
			CreatedAt:   time.Now(),
		},
		{
			ID:          primitive.NewObjectID(),
			Title:       "Tab Survey Monitoring System",
			Description: "React monitoring system for agricultural land survey data. Features interactive Leaflet maps with drawing tools (Geoman), role-based dashboard views, survey data visualization with Recharts, XLSX data export, and Redux state management.",
			Technologies: []string{"React", "Redux Toolkit", "Leaflet", "Geoman", "Ant Design", "Recharts", "TailwindCSS"},
			GithubURL:   "",
			LiveURL:     "",
			Featured:    false,
			Order:       8,
			CreatedAt:   time.Now(),
		},
		{
			ID:          primitive.NewObjectID(),
			Title:       "KML to GeoJSON Converter",
			Description: "Web utility for batch-converting KML/KMZ geographic files to GeoJSON format. Supports files up to 50MB, processes multiple files simultaneously, tracks feature counts, and provides clear error reporting per file. Built with Node.js and Express.",
			Technologies: []string{"Node.js", "Express", "Multer", "Turf.js", "GeoJSON"},
			GithubURL:   "",
			LiveURL:     "",
			Featured:    false,
			Order:       9,
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
			StartDate:   "2025-03",
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
			StartDate:   "2024-07",
			EndDate:     "2025-03",
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
