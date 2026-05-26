# Portfolio Website - Setup Guide

## 🚀 Quick Start

### 1. Backend (Go + MongoDB)

```bash
cd backend
go run .
```

**Port:** 8080
**Database:** MongoDB (localhost:27017)

### 2. Frontend (Next.js)

```bash
cd frontend
npm run dev
```

**Port:** 3000

### 3. Admin Panel (React)

```bash
cd admin-panel
npm run dev
```

**Port:** 5174

## 🔐 Admin Credentials

- **Username:** admin
- **Password:** admin123

## 📊 Features

### Backend
- RESTful API (Gin framework)
- JWT Authentication
- MongoDB integration
- CRUD operations for all content

### Frontend
- Next.js 14 with App Router
- Redux Toolkit for state management
- TailwindCSS for styling
- Framer Motion for animations
- Responsive design

### Admin Panel
- Full CRUD operations
- Profile management
- Skills management
- Projects management
- Experience management
- Testimonials management
- Blog post management
- Contact messages viewer

## 🛠️ Tech Stack

**Backend:**
- Go 1.21+
- Gin Web Framework
- MongoDB
- JWT

**Frontend:**
- Next.js 14
- TypeScript
- Redux Toolkit
- TailwindCSS
- Framer Motion
- Axios

**Admin Panel:**
- React 18
- TypeScript
- Vite
- TailwindCSS
- Axios

## 📝 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017
DB_NAME=portfolio
JWT_SECRET=your-secret-key-change-this
PORT=8080
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### Admin Panel (.env)
```
VITE_API_URL=http://localhost:8080/api
```

## 🗄️ Database Seeding

To seed the database with initial data:

```bash
cd backend
go run . -seed
```

This will create:
- Admin user (admin/admin123)
- Sample profile data
- Skills
- Projects
- Experience
- Testimonials
- Blog posts

## 🌐 URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080
- **Admin Panel:** http://localhost:5174
- **API Health:** http://localhost:8080/health

## 📚 API Endpoints

### Public Endpoints
- `GET /api/profile` - Get profile data
- `GET /api/skills` - Get all skills
- `GET /api/projects` - Get all projects
- `GET /api/experience` - Get work experience
- `GET /api/testimonials` - Get testimonials
- `GET /api/blog` - Get blog posts
- `GET /api/blog/:id` - Get single blog post
- `POST /api/contact` - Submit contact form

### Auth Endpoints
- `POST /api/auth/login` - Admin login

### Admin Endpoints (Requires JWT)
- `PUT /api/admin/profile` - Update profile
- `POST /api/admin/skills` - Create skill
- `PUT /api/admin/skills/:id` - Update skill
- `DELETE /api/admin/skills/:id` - Delete skill
- (Similar CRUD for projects, experience, testimonials, blog)
- `GET /api/admin/contacts` - Get contact messages
- `DELETE /api/admin/contacts/:id` - Delete contact message

## 🎨 Customization

### Update Profile Data
1. Login to Admin Panel (http://localhost:5174)
2. Navigate to Profile section
3. Update your information
4. Click Save

### Add Skills
1. Go to Skills section in Admin Panel
2. Click "Add Skill"
3. Fill in the form
4. Save

### Add Projects
1. Go to Projects section
2. Click "Add Project"
3. Add project details, technologies, links
4. Save

## 🔧 Troubleshooting

### Port Already in Use
If you get "port already in use" error:

**Backend:**
```bash
lsof -ti:8080 | xargs kill -9
```

**Frontend:**
```bash
lsof -ti:3000 | xargs kill -9
```

**Admin Panel:**
```bash
lsof -ti:5174 | xargs kill -9
```

### MongoDB Connection Error
Make sure MongoDB is running:
```bash
brew services start mongodb-community
```

### CORS Issues
Backend is configured to allow requests from:
- http://localhost:3000 (Frontend)
- http://localhost:5174 (Admin Panel)

## 📦 Production Deployment

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
npm run preview
```

## 🤝 Support

For issues or questions, check the README.md file or create an issue in the repository.

## 📄 License

MIT License - feel free to use this project for your portfolio!
