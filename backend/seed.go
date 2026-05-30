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

	for _, col := range []string{"admins", "profile", "skills", "projects", "experience", "education", "testimonials", "blog", "contacts"} {
		database.Collection(col).Drop(ctx)
	}
	log.Println("Existing collections cleared")

	// Admin
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte("admin123"), bcrypt.DefaultCost)
	admin := Admin{
		ID:        primitive.NewObjectID(),
		Username:  "admin",
		Password:  string(hashedPassword),
		Email:     "admin@portfolio.com",
		CreatedAt: time.Now(),
	}
	database.Collection("admins").InsertOne(ctx, admin)

	// Profile
	profile := Profile{
		ID:        primitive.NewObjectID(),
		Name:      "Nodirbek Iskandarov",
		Title:     "Frontend Developer",
		TitleRu:   "Frontend-разработчик",
		TitleUz:   "Frontend dasturchi",
		Bio:       "Results-driven Frontend Developer with nearly 2 years of professional experience building data-intensive government web applications. Specialized in React, Redux, and interactive data visualization (GIS maps, charts, dashboards). Proven ability to collaborate with cross-functional teams and deliver performant, accessible, and responsive UIs at scale.",
		BioRu:     "Целеустремлённый Frontend-разработчик с почти 2 годами профессионального опыта создания веб-приложений для государственного сектора. Специализируюсь на React, Redux и интерактивной визуализации данных (ГИС-карты, графики, дашборды). Умею работать в кросс-функциональных командах и создавать производительные, доступные и адаптивные интерфейсы.",
		BioUz:     "Deyarli 2 yillik professional tajribaga ega Frontend-dasturchi. Davlat sektorida ma'lumot-intensiv veb-ilovalar yaratishga ixtisoslashganman. React, Redux va interaktiv ma'lumotlar vizualizatsiyasi (GIS xaritalar, grafiklar, dashboardlar) bo'yicha mutaxassislikka egaman. Kross-funksional jamoalarda ishlash va samarali, qulay va moslashuvchan interfeys yaratish tajribasiga egaman.",
		Email:     "nodirbekiskandarov2003@gmail.com",
		Phone:     "+998 99 579 8545",
		Location:  "Tashkent, Uzbekistan",
		Github:    "https://github.com/nodirbekiskandarov",
		LinkedIn:  "https://linkedin.com/in/nodirbek-iskandarov",
		Twitter:   "https://twitter.com/nodirbekiskandarov",
		Website:   "https://nodirbekiskandarov.dev",
		UpdatedAt: time.Now(),
	}
	database.Collection("profile").InsertOne(ctx, profile)

	// Skills
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

	// Projects
	projects := []Project{
		{
			ID:            primitive.NewObjectID(),
			Title:         "AI-Powered Educational Platform",
			TitleRu:       "Образовательная платформа на базе ИИ",
			TitleUz:       "AI-asosida ta'lim platformasi",
			Description:   "Full-stack educational platform with AI-powered chat tutoring built using Next.js and Claude AI. Features course and module management, topic-based learning, student progress tracking, and an intelligent AI assistant that answers student questions in real time. Backend powered by Prisma ORM with SQLite/Turso database.",
			DescriptionRu: "Полнофункциональная образовательная платформа с ИИ-тьютором, построенная на Next.js и Claude AI. Включает управление курсами и модулями, тематическое обучение, отслеживание прогресса студентов и умный ИИ-ассистент, отвечающий на вопросы в реальном времени. Бэкенд на Prisma ORM с базой данных SQLite/Turso.",
			DescriptionUz: "Next.js va Claude AI yordamida qurilgan AI-asosida ta'lim platformasi. Kurslar va modullarni boshqarish, mavzuga asoslangan o'rganish, o'quvchilar progressini kuzatish va real vaqtda savollarni javob beradigan aqlli AI-assistent mavjud. Backend Prisma ORM va SQLite/Turso ma'lumotlar bazasi bilan ishlaydi.",
			Technologies:  []string{"Next.js", "TypeScript", "Prisma", "SQLite", "Claude AI", "NextAuth", "TailwindCSS"},
			Featured:      true,
			Order:         1,
			CreatedAt:     time.Now(),
		},
		{
			ID:            primitive.NewObjectID(),
			Title:         "Census GIS Monitoring Dashboard",
			TitleRu:       "ГИС-дашборд мониторинга переписи",
			TitleUz:       "Ro'yxatga olish GIS monitoring dashboardi",
			Description:   "Enterprise-grade React admin dashboard for monitoring census GIS and agricultural statistics across Uzbekistan's regions. Includes 18+ report types, crop field mapping, target tracking, multi-role access control, and deep data visualization with Recharts and Material-UI. Backed by Supabase.",
			DescriptionRu: "Корпоративный React-дашборд для мониторинга ГИС переписи и сельскохозяйственной статистики по регионам Узбекистана. Включает 18+ типов отчётов, картирование полей, отслеживание показателей, многоролевой доступ и глубокую визуализацию данных с Recharts и Material-UI. Бэкенд на Supabase.",
			DescriptionUz: "O'zbekiston viloyatlari bo'yicha ro'yxatga olish GIS va qishloq xo'jaligi statistikasini kuzatish uchun enterprise-darajadagi React admin dashboard. 18+ turdagi hisobotlar, ekin maydonlarini xaritada ko'rsatish, ko'p rolli kirish nazorati va Recharts va Material-UI bilan chuqur ma'lumot vizualizatsiyasi. Supabase asosida.",
			Technologies:  []string{"React", "TypeScript", "Redux Toolkit", "Supabase", "Recharts", "Material-UI", "TailwindCSS", "Vite"},
			Featured:      true,
			Order:         2,
			CreatedAt:     time.Now(),
		},
		{
			ID:            primitive.NewObjectID(),
			Title:         "Statistical Registers Portal",
			TitleRu:       "Портал статистических реестров",
			TitleUz:       "Statistik registrlar portali",
			Description:   "Large-scale government administrative portal for managing statistical registers and organizations in Uzbekistan. Features role-based access, dynamic form creation, complex CRUD for classifiers and records, report generation, audit logs, data synchronization, and real-time updates via Socket.io. Built with React, MUI, and i18next.",
			DescriptionRu: "Крупный государственный административный портал для управления статистическими реестрами и организациями в Узбекистане. Включает ролевой доступ, динамическое создание форм, сложные CRUD-операции, генерацию отчётов, журналы аудита, синхронизацию данных и обновления в реальном времени через Socket.io.",
			DescriptionUz: "O'zbekistondagi statistik registrlar va tashkilotlarni boshqarish uchun yirik davlat administrativ portali. Rol asosidagi kirish, dinamik forma yaratish, murakkab CRUD, hisobot generatsiyasi, audit jurnallari, ma'lumotlar sinxronizatsiyasi va Socket.io orqali real vaqtli yangilanishlar.",
			Technologies:  []string{"React", "TypeScript", "Material-UI", "Styled Components", "Socket.io", "Chart.js", "i18next", "Axios"},
			Featured:      true,
			Order:         3,
			CreatedAt:     time.Now(),
		},
		{
			ID:            primitive.NewObjectID(),
			Title:         "Barber Shop Admin Dashboard",
			TitleRu:       "Панель администратора парикмахерской",
			TitleUz:       "Sartaroshxona admin paneli",
			Description:   "Full-featured admin panel for managing a barber shop business. Includes barber and service management, appointment/booking system, customer reviews, interactive location map with Leaflet, and analytics charts with Recharts. Built with React, TypeScript, and Vite.",
			DescriptionRu: "Полнофункциональная панель администратора для управления бизнесом парикмахерской. Включает управление барберами и услугами, систему записи/бронирования, отзывы клиентов, интерактивную карту на Leaflet и аналитику на Recharts.",
			DescriptionUz: "Sartaroshxona biznesini boshqarish uchun to'liq funksional admin panel. Sartaroshlar va xizmatlarni boshqarish, qabul/bron tizimi, mijozlar sharhlari, Leaflet orqali interaktiv joylashuv xaritasi va Recharts bilan analitika grafiklar.",
			Technologies:  []string{"React", "TypeScript", "Vite", "Leaflet", "Recharts", "React Router", "Axios"},
			Featured:      true,
			Order:         4,
			CreatedAt:     time.Now(),
		},
		{
			ID:            primitive.NewObjectID(),
			Title:         "Regional GIS Portal",
			TitleRu:       "Региональный ГИС-портал",
			TitleUz:       "Mintaqaviy GIS portali",
			Description:   "Interactive frontend application for viewing and managing regional geographic data across Uzbekistan. Features interactive Leaflet maps, region passport data, republic-wide statistics, dark/light theme, multi-language support (i18next), data caching with React Query, and Zustand state management.",
			DescriptionRu: "Интерактивное приложение для просмотра региональных географических данных Узбекистана. Включает интерактивные карты Leaflet, данные региональных паспортов, статистику по республике, тёмную/светлую тему, многоязычность (i18next), кэширование с React Query и управление состоянием Zustand.",
			DescriptionUz: "O'zbekiston viloyatlari bo'yicha geografik ma'lumotlarni ko'rish va boshqarish uchun interaktiv dastur. Leaflet xaritalar, viloyat pasporti ma'lumotlari, respublika statistikasi, qorongu/yorug' mavzu, ko'p tillilik (i18next), React Query bilan kesh va Zustand state boshqaruvi.",
			Technologies:  []string{"React", "TypeScript", "Vite", "Leaflet", "React Query", "Zustand", "TailwindCSS", "Material-UI", "i18next"},
			Featured:      false,
			Order:         5,
			CreatedAt:     time.Now(),
		},
		{
			ID:            primitive.NewObjectID(),
			Title:         "Census GIS Backend API",
			TitleRu:       "Бэкенд API для ГИС переписи",
			TitleUz:       "Ro'yxatga olish GIS Backend API",
			Description:   "Robust Node.js REST API for geospatial and census data management. Handles KML/GeoJSON file uploads, spatial analysis with Turf.js, PostgreSQL and MongoDB integration, JWT authentication, background job queues with Bull/Redis, Swagger API docs, and rate limiting.",
			DescriptionRu: "Надёжный Node.js REST API для управления геопространственными и переписными данными. Обрабатывает загрузку KML/GeoJSON файлов, пространственный анализ с Turf.js, интеграцию с PostgreSQL и MongoDB, JWT-аутентификацию, фоновые очереди Bull/Redis и документацию Swagger.",
			DescriptionUz: "Geospatial va ro'yxatga olish ma'lumotlarini boshqarish uchun mustahkam Node.js REST API. KML/GeoJSON fayl yuklashlar, Turf.js bilan fazoviy tahlil, PostgreSQL va MongoDB integratsiyasi, JWT autentifikatsiya, Bull/Redis fon navbatlari va Swagger API hujjatlari.",
			Technologies:  []string{"Node.js", "Express", "PostgreSQL", "MongoDB", "Turf.js", "Redis", "Bull", "JWT", "Swagger"},
			Featured:      false,
			Order:         6,
			CreatedAt:     time.Now(),
		},
		{
			ID:            primitive.NewObjectID(),
			Title:         "Organization Search Portal",
			TitleRu:       "Портал поиска организаций",
			TitleUz:       "Tashkilotlarni qidirish portali",
			Description:   "React-based enterprise portal for searching and managing organizations and their statistical data. Includes organization and user management, classifier CRUD, records and data exchange handling, Highcharts visualizations, CSV export, multi-language support, and test-mode security features.",
			DescriptionRu: "React-портал для поиска и управления организациями и их статистическими данными. Включает управление организациями и пользователями, CRUD классификаторов, обработку записей и обмена данными, визуализации Highcharts, экспорт CSV и многоязычность.",
			DescriptionUz: "Tashkilotlar va ularning statistik ma'lumotlarini qidirish va boshqarish uchun React-asosida enterprise portal. Tashkilotlar va foydalanuvchilarni boshqarish, klassifikatorlar CRUD, yozuvlar va ma'lumot almashinuvi, Highcharts vizualizatsiyasi, CSV eksport va ko'p tillilik.",
			Technologies:  []string{"React", "Material-UI", "Highcharts", "i18next", "Axios", "TailwindCSS"},
			Featured:      false,
			Order:         7,
			CreatedAt:     time.Now(),
		},
		{
			ID:            primitive.NewObjectID(),
			Title:         "Tab Survey Monitoring System",
			TitleRu:       "Система мониторинга обследования угодий",
			TitleUz:       "Yer so'rovi monitoring tizimi",
			Description:   "React monitoring system for agricultural land survey data. Features interactive Leaflet maps with drawing tools (Geoman), role-based dashboard views, survey data visualization with Recharts, XLSX data export, and Redux state management.",
			DescriptionRu: "React-система мониторинга данных обследования сельскохозяйственных угодий. Включает интерактивные карты Leaflet с инструментами рисования (Geoman), дашборды по ролям, визуализацию данных на Recharts, экспорт XLSX и управление состоянием Redux.",
			DescriptionUz: "Qishloq xo'jaligi yer so'rovini kuzatish uchun React monitoring tizimi. Geoman chizish vositalari bilan interaktiv Leaflet xaritalari, rol asosidagi dashboard ko'rinishlari, Recharts orqali ma'lumot vizualizatsiyasi, XLSX eksport va Redux state boshqaruvi.",
			Technologies:  []string{"React", "Redux Toolkit", "Leaflet", "Geoman", "Ant Design", "Recharts", "TailwindCSS"},
			Featured:      false,
			Order:         8,
			CreatedAt:     time.Now(),
		},
		{
			ID:            primitive.NewObjectID(),
			Title:         "KML to GeoJSON Converter",
			TitleRu:       "Конвертер KML в GeoJSON",
			TitleUz:       "KML dan GeoJSON ga konvertor",
			Description:   "Web utility for batch-converting KML/KMZ geographic files to GeoJSON format. Supports files up to 50MB, processes multiple files simultaneously, tracks feature counts, and provides clear error reporting per file. Built with Node.js and Express.",
			DescriptionRu: "Веб-утилита для пакетной конвертации KML/KMZ географических файлов в формат GeoJSON. Поддерживает файлы до 50 МБ, одновременную обработку нескольких файлов, подсчёт объектов и чёткую отчётность об ошибках по каждому файлу.",
			DescriptionUz: "KML/KMZ geografik fayllarni GeoJSON formatiga toplu o'zgartirish uchun veb-yordam dasturi. 50 MB gacha fayllarni qo'llab-quvvatlaydi, bir vaqtda bir nechta faylni qayta ishlaydi, xususiyatlar sonini kuzatadi va har bir fayl uchun aniq xato hisobotini taqdim etadi.",
			Technologies:  []string{"Node.js", "Express", "Multer", "Turf.js", "GeoJSON"},
			Featured:      false,
			Order:         9,
			CreatedAt:     time.Now(),
		},
	}
	for _, project := range projects {
		database.Collection("projects").InsertOne(ctx, project)
	}

	// Experience
	experiences := []Experience{
		{
			ID:            primitive.NewObjectID(),
			Company:       "The State Committee of the Republic of Uzbekistan on Statistics",
			CompanyRu:     "Государственный комитет Республики Узбекистан по статистике",
			CompanyUz:     "O'zbekiston Respublikasi Davlat statistika qo'mitasi",
			Position:      "Software Engineer",
			PositionRu:    "Инженер-программист",
			PositionUz:    "Dasturiy ta'minot muhandisi",
			Description:   "Developed and maintained GIS-based web applications for visualizing regional statistical data of Uzbekistan. Built interactive maps using Leaflet and GeoJSON to display demographic, economic, and social indicators. Implemented dynamic charts and dashboards (bar, donut, line, population pyramid) for data analysis. Refactored and optimized frontend components using React, Redux, MUI, and Styled Components. Integrated REST APIs and handled large datasets with graceful error and null-data handling.",
			DescriptionRu: "Разрабатывал и поддерживал ГИС-веб-приложения для визуализации региональной статистики Узбекистана. Создавал интерактивные карты на Leaflet и GeoJSON для отображения демографических, экономических и социальных показателей. Реализовывал динамические графики и дашборды (столбчатые, кольцевые, линейные, пирамида населения). Рефакторил компоненты на React, Redux, MUI и Styled Components. Интегрировал REST API и работал с большими датасетами.",
			DescriptionUz: "O'zbekistonning mintaqaviy statistik ma'lumotlarini vizualizatsiya qilish uchun GIS-asosida veb-ilovalar ishlab chiqdim va qo'llab-quvvatladim. Demografik, iqtisodiy va ijtimoiy ko'rsatkichlarni aks ettirish uchun Leaflet va GeoJSON yordamida interaktiv xaritalar yaratdim. Dinamik grafiklar va dashboardlar (ustun, donut, chiziq, aholi piramidalari) amalga oshirdim. React, Redux, MUI va Styled Components yordamida frontend komponentlarini refaktoring va optimallashtirdim.",
			Location:      "Tashkent, Uzbekistan",
			StartDate:     "2025-03",
			Current:       true,
			Order:         1,
			CreatedAt:     time.Now(),
		},
		{
			ID:            primitive.NewObjectID(),
			Company:       "Statistics Agency under the President of the Republic of Uzbekistan",
			CompanyRu:     "Агентство по статистике при Президенте Республики Узбекистан",
			CompanyUz:     "O'zbekiston Respublikasi Prezidenti huzuridagi Statistika agentligi",
			Position:      "Lead Software Engineer",
			PositionRu:    "Ведущий инженер-программист",
			PositionUz:    "Yetakchi dasturiy ta'minot muhandisi",
			Description:   "Led development and support of internal statistical web systems used by government analysts. Designed and implemented frontend architecture using React, Redux, and modern UI libraries. Developed interactive data visualization modules (charts, tables, dashboards) for regional and national statistics. Worked with GIS data and maps to visualize location-based statistical indicators. Integrated and optimized REST APIs, ensuring data accuracy and system stability.",
			DescriptionRu: "Руководил разработкой и поддержкой внутренних статистических веб-систем для государственных аналитиков. Проектировал и реализовывал фронтенд-архитектуру на React, Redux и современных UI-библиотеках. Разрабатывал интерактивные модули визуализации данных (графики, таблицы, дашборды) для региональной и национальной статистики. Работал с ГИС-данными и картами для визуализации статистических показателей.",
			DescriptionUz: "Davlat analitiklari tomonidan ishlatiladigan ichki statistik veb-tizimlarni ishlab chiqish va qo'llab-quvvatlashga rahbarlik qildim. React, Redux va zamonaviy UI kutubxonalari yordamida frontend arxitekturasini loyihalashtirdim. Mintaqaviy va milliy statistika uchun interaktiv ma'lumotlar vizualizatsiya modullarini yaratdim. GIS ma'lumotlari va xaritalar bilan joylashuv asosidagi statistik ko'rsatkichlarni vizualizatsiya qildim.",
			Location:      "Tashkent, Uzbekistan",
			StartDate:     "2024-07",
			EndDate:       "2025-03",
			Current:       false,
			Order:         2,
			CreatedAt:     time.Now(),
		},
	}
	for _, exp := range experiences {
		database.Collection("experience").InsertOne(ctx, exp)
	}

	// Education
	educationData := []Education{
		{
			ID:            primitive.NewObjectID(),
			Institution:   "Tashkent University of Information Technologies",
			InstitutionRu: "Ташкентский университет информационных технологий",
			InstitutionUz: "Toshkent axborot texnologiyalari universiteti (TATU)",
			Degree:        "Bachelor's Degree",
			DegreeRu:      "Бакалавр",
			DegreeUz:      "Bakalavr",
			Field:         "Software Engineering",
			FieldRu:       "Программная инженерия",
			FieldUz:       "Dasturiy muhandislik",
			StartDate:     "2021-09",
			EndDate:       "2025-06",
			Current:       false,
			Location:      "Tashkent, Uzbekistan",
			Description:   "Studied computer science fundamentals, software engineering, algorithms, data structures, and modern web development technologies. Actively participated in university projects and programming competitions.",
			DescriptionRu: "Изучал основы информатики, программную инженерию, алгоритмы, структуры данных и современные технологии веб-разработки. Активно участвовал в университетских проектах и соревнованиях по программированию.",
			DescriptionUz: "Informatika asoslarini, dasturiy muhandislik, algoritmlar, ma'lumotlar strukturalari va zamonaviy veb-dasturlash texnologiyalarini o'rgandim. Universitet loyihalari va dasturlash musobaqalarida faol qatnashdim.",
			Grade:         "3.7 / 4.0",
			Order:         1,
			CreatedAt:     time.Now(),
		},
	}
	for _, edu := range educationData {
		database.Collection("education").InsertOne(ctx, edu)
	}

	// Blog posts
	blogPosts := []BlogPost{
		{
			ID:        primitive.NewObjectID(),
			Title:     "Getting Started with Go and MongoDB",
			TitleRu:   "Начало работы с Go и MongoDB",
			TitleUz:   "Go va MongoDB bilan ishlashni boshlash",
			Slug:      "getting-started-go-mongodb",
			Content:   "In this article, we'll explore how to build a REST API using Go and MongoDB...",
			ContentRu: "В этой статье мы рассмотрим, как создать REST API на Go и MongoDB...",
			ContentUz: "Ushbu maqolada Go va MongoDB yordamida REST API yaratishni o'rganamiz...",
			Excerpt:   "Learn how to build a REST API using Go and MongoDB with practical examples.",
			ExcerptRu: "Узнайте, как создать REST API на Go и MongoDB с практическими примерами.",
			ExcerptUz: "Amaliy misollar bilan Go va MongoDB yordamida REST API yaratishni o'rganing.",
			Tags:      []string{"Go", "MongoDB", "Backend", "Tutorial"},
			Published: true,
			Views:     0,
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
		{
			ID:        primitive.NewObjectID(),
			Title:     "Modern React Patterns in 2026",
			TitleRu:   "Современные паттерны React в 2026",
			TitleUz:   "2026 yildagi zamonaviy React patternlari",
			Slug:      "modern-react-patterns-2026",
			Content:   "React continues to evolve, and with it, new patterns emerge...",
			ContentRu: "React продолжает развиваться, и вместе с ним появляются новые паттерны...",
			ContentUz: "React rivojlanishda davom etmoqda va u bilan birga yangi patternlar paydo bo'lmoqda...",
			Excerpt:   "Explore the latest React patterns and best practices for building modern web applications.",
			ExcerptRu: "Изучите последние паттерны React и лучшие практики для создания современных веб-приложений.",
			ExcerptUz: "Zamonaviy veb-ilovalar yaratish uchun eng so'nggi React patternlari va eng yaxshi amaliyotlarni o'rganing.",
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
