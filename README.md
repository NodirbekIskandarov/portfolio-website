# Portfolio Website

Full-stack portfolio website with blog functionality, built with Next.js, Go, and MongoDB.

## 🏗️ Project Structure

```
portfolio-website/
├── frontend/          # Next.js + TypeScript + Redux Toolkit
├── backend/           # Go + MongoDB
└── admin-panel/       # React + TypeScript (Admin Dashboard)
```

## 🚀 Features

### Frontend (Portfolio Website)
- ✅ Responsive design with TailwindCSS
- ✅ Hero section with profile information
- ✅ Skills showcase with progress bars
- ✅ Featured projects gallery
- ✅ Work experience timeline
- ✅ Client testimonials
- ✅ Blog with latest posts
- ✅ Contact information
- ✅ Redux Toolkit for state management

### Backend (Go API)
- ✅ RESTful API with Gin framework
- ✅ MongoDB database integration
- ✅ JWT authentication for admin
- ✅ CRUD operations for all content
- ✅ CORS enabled for frontend/admin
- ✅ Environment variable configuration

### Admin Panel
- ✅ Secure login with JWT
- ✅ Profile management
- ✅ Skills CRUD operations
- ✅ Projects CRUD operations
- ✅ Experience CRUD operations
- ✅ Testimonials CRUD operations
- ✅ Blog post management
- ✅ Contact messages inbox

## 📋 Prerequisites

- Node.js (v18+)
- Go (v1.20+)
- MongoDB (v6.0+)

## 🔧 Installation & Setup

### 1. Backend Setup

```bash
cd backend

# Install Go dependencies
go mod download

# Start MongoDB (if not running)
brew services start mongodb/brew/mongodb-community@8.0

# Seed the database with initial data
go run . -seed

# Run the backend server
go run .
```

Backend will run on `http://localhost:8080`

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:8080/api" > .env.local

# Run development server
npm run dev
```

Frontend will run on `http://localhost:3000`

### 3. Admin Panel Setup

```bash
cd admin-panel

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8080/api" > .env

# Run development server
npm run dev
```

Admin Panel will run on `http://localhost:5173`

## 🗄️ Database Schema

### Collections:
- **profile** - User profile information
- **skills** - Technical skills with levels
- **projects** - Portfolio projects
- **experience** - Work experience
- **testimonials** - Client testimonials
- **blog** - Blog posts
- **contacts** - Contact form messages
- **admins** - Admin users

## 🔐 API Endpoints

### Public Endpoints
- `GET /api/profile` - Get profile information
- `GET /api/skills` - Get all skills
- `GET /api/projects` - Get all projects
- `GET /api/experience` - Get work experience
- `GET /api/testimonials` - Get testimonials
- `GET /api/blog` - Get published blog posts
- `GET /api/blog/:id` - Get single blog post
- `POST /api/contact` - Send contact message

### Auth Endpoints
- `POST /api/auth/login` - Admin login

### Admin Endpoints (Protected)
- `PUT /api/admin/profile` - Update profile
- `POST /api/admin/skills` - Create skill
- `PUT /api/admin/skills/:id` - Update skill
- `DELETE /api/admin/skills/:id` - Delete skill
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project
- `POST /api/admin/experience` - Create experience
- `PUT /api/admin/experience/:id` - Update experience
- `DELETE /api/admin/experience/:id` - Delete experience
- `POST /api/admin/testimonials` - Create testimonial
- `PUT /api/admin/testimonials/:id` - Update testimonial
- `DELETE /api/admin/testimonials/:id` - Delete testimonial
- `POST /api/admin/blog` - Create blog post
- `PUT /api/admin/blog/:id` - Update blog post
- `DELETE /api/admin/blog/:id` - Delete blog post
- `GET /api/admin/contacts` - Get all contact messages
- `DELETE /api/admin/contacts/:id` - Delete contact message

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **State Management:** Redux Toolkit
- **Styling:** TailwindCSS
- **HTTP Client:** Axios
- **Icons:** React Icons

### Backend
- **Language:** Go
- **Framework:** Gin
- **Database:** MongoDB
- **Authentication:** JWT
- **Environment:** godotenv

### Admin Panel
- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **HTTP Client:** Axios
- **Routing:** React Router

## 📝 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017
DB_NAME=portfolio
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=8080
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### Admin Panel (.env)
```env
VITE_API_URL=http://localhost:8080/api
```

## 🚀 Production Deployment

### Backend
```bash
cd backend
go build -o portfolio-backend
./portfolio-backend
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

### Admin Panel
```bash
cd admin-panel
npm run build
# Serve the dist folder with any static file server
```

## 📱 Features to Add (Future Enhancements)

- [ ] Image upload functionality
- [ ] Rich text editor for blog posts
- [ ] Email notifications for contact form
- [ ] Analytics dashboard
- [ ] SEO optimization
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Resume/CV download
- [ ] Social media integration
- [ ] Comments system for blog
- [ ] Search functionality
- [ ] Tags and categories for blog
- [ ] Pagination for blog posts
- [ ] Rate limiting for API
- [ ] API documentation with Swagger

## 🤝 Contributing

This is a personal portfolio project, but suggestions and improvements are welcome!

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 👤 Author

**Nodirbek Iskandarov**
- Software Engineer
- Location: Tashkent, Uzbekistan
- Email: nodirbek@example.com

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by best practices in full-stack development
- Designed for performance and scalability

---

**Note:** Remember to change default passwords and JWT secrets in production!
# portfolio-website
