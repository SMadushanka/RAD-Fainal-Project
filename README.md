# 🚗 RAD Final Project - Vehicle Marketplace Platform

A full-stack web application for buying and selling vehicles with user authentication, seller profiles, and interactive post management system.

---

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Technologies & Tools](#technologies--tools)
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Running the Application](#running-the-application)
- [Deployed URLs](#deployed-urls)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**RAD Final Project** is a modern vehicle marketplace platform built with **React** (frontend) and **Express.js** (backend). It enables users to:
- Register and authenticate securely
- Browse vehicle listings
- Create, edit, and manage posts
- Interact with other sellers through likes and comments
- View seller profiles
- Manage personal profile settings

The application demonstrates full-stack development with TypeScript, responsive UI with Tailwind CSS, and a robust RESTful API backend.

---

## 🛠️ Technologies & Tools

### **Backend**
| Technology | Purpose |
|------------|---------|
| **Express.js** | Web framework for Node.js |
| **MongoDB** | NoSQL database with Atlas cloud service |
| **Mongoose** | Object Data Modeling (ODM) |
| **TypeScript** | Type-safe JavaScript |
| **JWT (JsonWebToken)** | Token-based authentication |
| **Bcryptjs** | Password hashing & security |
| **Multer** | File upload middleware |
| **CORS** | Cross-Origin Resource Sharing |
| **Nodemon** | Development server auto-reload |
| **ts-node** | TypeScript execution for Node.js |

### **Frontend**
| Technology | Purpose |
|------------|---------|
| **React 19** | UI library |
| **TypeScript** | Type-safe JavaScript |
| **Vite** | Fast build tool & dev server |
| **React Router v7** | Client-side routing |
| **Tailwind CSS** | Utility-first CSS framework |
| **ESLint** | Code quality linting |

### **Tools**
- **VS Code** - Code editor
- **Git** - Version control
- **Postman/Thunder Client** - API testing
- **MongoDB Atlas** - Cloud database
- **Node.js 16+** - JavaScript runtime

---

## ✨ Main Features

### **User Authentication**
- ✅ User registration with validation
- ✅ Secure login with JWT tokens
- ✅ Password hashing with Bcrypt
- ✅ Forgot password functionality
- ✅ Profile settings & account management
- ✅ Seller profile verification

### **Vehicle Listings (Posts)**
- ✅ Create new vehicle listings with images
- ✅ Edit existing posts
- ✅ Delete posts
- ✅ Browse all vehicles with filtering
- ✅ View detailed vehicle information
- ✅ Like/unlike posts
- ✅ Comment on posts
- ✅ View user's own posts

### **Seller Features**
- ✅ Seller profiles with contact information
- ✅ View all sellers
- ✅ Browse specific seller's listings
- ✅ Seller ratings and reviews system

### **User Interface**
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Navigation bar with user menu
- ✅ Hero section with search functionality
- ✅ Vehicle filter by category, price, and location
- ✅ Footer with links and information

---

## 📁 Project Structure

```
RAD Final Project/
│
├── BackEnd/                          # Express.js Backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts          # MongoDB connection setup
│   │   │   ├── env.ts               # Environment variables config
│   │   │   └── jwt.ts               # JWT utilities
│   │   ├── controllers/
│   │   │   ├── authController.ts    # Authentication logic
│   │   │   ├── userController.ts    # User management
│   │   │   └── postController.ts    # Post/listing management
│   │   ├── middleware/
│   │   │   ├── auth.ts              # JWT authentication middleware
│   │   │   ├── errorHandler.ts      # Global error handling
│   │   │   └── uploadMiddleware.ts  # File upload configuration
│   │   ├── models/
│   │   │   ├── User.ts              # User schema & model
│   │   │   └── Post.ts              # Post/listing schema & model
│   │   ├── routes/
│   │   │   ├── auth.ts              # Authentication endpoints
│   │   │   ├── user.ts              # User management endpoints
│   │   │   └── post.ts              # Post management endpoints
│   │   ├── utils/
│   │   │   └── tokens.ts            # Token generation utilities
│   │   └── index.ts                 # Main server file
│   ├── uploads/                     # Uploaded images storage
│   ├── .env                         # Environment variables
│   ├── tsconfig.json
│   ├── package.json
│   └── README.md
│
├── FrontEnd/                         # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx           # Top navigation component
│   │   │   ├── Hero.tsx             # Hero section
│   │   │   ├── FilterBar.tsx        # Filtering component
│   │   │   ├── VehicleCard.tsx      # Vehicle listing card
│   │   │   └── Footer.tsx           # Footer component
│   │   ├── pages/
│   │   │   ├── Home.tsx             # Home page
│   │   │   ├── Vehicles.tsx         # All vehicles page
│   │   │   ├── VehicleDetails.tsx   # Vehicle details page
│   │   │   ├── CreatePost.tsx       # Create listing page
│   │   │   ├── EditPost.tsx         # Edit listing page
│   │   │   ├── MyPosts.tsx          # User's listings page
│   │   │   ├── Sellers.tsx          # All sellers page
│   │   │   ├── SellerProfile.tsx    # Seller details page
│   │   │   ├── Login.tsx            # Login page
│   │   │   ├── Register.tsx         # Registration page
│   │   │   ├── ForgotPassword.tsx   # Password reset page
│   │   │   └── ProfileSettings.tsx  # User settings page
│   │   ├── services/
│   │   │   ├── api.ts               # API client configuration
│   │   │   ├── authService.ts       # Auth API calls
│   │   │   ├── userService.ts       # User API calls
│   │   │   └── postService.ts       # Post API calls
│   │   ├── assets/                  # Images, icons, etc.
│   │   ├── App.tsx                  # Main app component
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.tsx                 # Entry point
│   ├── public/
│   │   └── pic 01.avif              # Sample vehicle image
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── eslint.config.js
│   ├── package.json
│   └── README.md
│
└── README.md                         # This file

```

---

## 🚀 Setup & Installation

### **Prerequisites**
- **Node.js** v16 or higher
- **npm** (comes with Node.js)
- **MongoDB Atlas** account (free tier available)
- **Git** for version control

### **Step 1: Clone the Repository**
```bash
# Clone the project
git clone <repository-url>
cd "IJSE 71/RAD Fainal Project"
```

### **Step 2: Backend Setup**

1. **Navigate to backend directory:**
```bash
cd BackEnd
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file** in `BackEnd/` directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
BCRYPT_SALT=10
```

4. **Get MongoDB Connection String:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free account
   - Create a cluster
   - Click "Connect" → "Drivers"
   - Copy connection string and update `.env`
   - Replace `<username>`, `<password>`, and `dbname` with your credentials

### **Step 3: Frontend Setup**

1. **Navigate to frontend directory:**
```bash
cd ../FrontEnd
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure API endpoint** in [FrontEnd/src/services/api.ts](FrontEnd/src/services/api.ts):
```typescript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

---

## ▶️ Running the Application

### **Option 1: Run Both in Separate Terminals**

**Terminal 1 - Backend:**
```bash
cd BackEnd
npm run dev
```
Server runs on: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd FrontEnd
npm run dev
```
Frontend runs on: `http://localhost:5173` (or shown in terminal)

### **Option 2: Build for Production**

**Backend:**
```bash
cd BackEnd
npm run build
npm start
```

**Frontend:**
```bash
cd FrontEnd
npm run build
npm preview
```

### **Development Commands**

**Backend:**
- `npm run dev` - Start development server with auto-reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled backend

**Frontend:**
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

---

## 🌐 Deployed URLs

| Component | URL | Status |
|-----------|-----|--------|
| **Frontend** | https://rad-vehicle-marketplace.vercel.app | Not yet deployed |
| **Backend API** | https://rad-vehicle-api.onrender.com | Not yet deployed |
| **Database** | MongoDB Atlas (Cloud) | Ready |

**Note:** Update these URLs once deployed to Vercel (frontend) and Render/Railway (backend)

---

## 📡 API Endpoints

### **Base URL:** `http://localhost:5000/api`

### **Authentication Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| POST | `/auth/register` | Register new user | ❌ |
| POST | `/auth/login` | Login user | ❌ |
| POST | `/auth/forgot-password` | Request password reset | ❌ |

### **User Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| GET | `/user/profile` | Get current user profile | ✅ |
| PUT | `/user/profile` | Update user profile | ✅ |
| GET | `/user/all` | Get all users/sellers | ❌ |
| GET | `/user/:userId` | Get specific user | ❌ |

### **Post Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| POST | `/post` | Create new post | ✅ |
| GET | `/post` | Get all posts | ❌ |
| GET | `/post/user/:userId` | Get user's posts | ❌ |
| GET | `/post/:postId` | Get specific post | ❌ |
| PUT | `/post/:postId` | Update post | ✅ |
| DELETE | `/post/:postId` | Delete post | ✅ |
| POST | `/post/:postId/like` | Like/unlike post | ✅ |
| POST | `/post/:postId/comment` | Add comment | ✅ |

### **Health Check**

| Method | Endpoint | Response |
|--------|----------|----------|
| GET | `/health` | `{ status: 'OK', message: 'Server is running' }` |

### **Example Requests**

**Register User:**
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "fullName": "John Doe"
}
```

**Login User:**
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Create Post (with JWT token):**
```bash
POST http://localhost:5000/api/post
Content-Type: application/json
Authorization: Bearer <your_jwt_token>

{
  "title": "2020 Toyota Camry",
  "description": "Excellent condition, well maintained",
  "image": "https://example.com/image.jpg",
  "price": 15000,
  "brand": "Toyota",
  "model": "Camry",
  "year": 2020
}
```

---

## 📸 Screenshots

### **Application Pages**

| Page | Features |
|------|----------|
| **Home** | Hero section, search, featured listings, navbar |
| **Vehicles** | Filter, grid view, vehicle cards, search |
| **Vehicle Details** | Image gallery, specs, seller info, comments, likes |
| **Create/Edit Post** | Form, image upload, vehicle details, validation |
| **My Posts** | User's listings, edit/delete options, stats |
| **Sellers** | Seller cards, ratings, vehicle count, profiles |
| **Seller Profile** | Seller info, vehicles, contact, reviews |
| **Login/Register** | Auth forms, validation, forgot password |
| **Profile Settings** | Personal info, password, preferences |

   ![Home Page](Docs/ss1.png)
    ![Vehicle Details Page](Docs/ss2.png)
   ![Seller Page](Docs/ss3.png)
   ![Vehicle Listing Page](Docs/ss4.png)


### **Backend Server Output**

```bash
🚀 Server running on port 5000
✅ Database connected successfully
📡 API Routes initialized
✓ CORS enabled
```

---

## 🔐 Security Features

- ✅ **Password Hashing** - Bcrypt with salt rounds
- ✅ **JWT Authentication** - Token-based secure sessions
- ✅ **Input Validation** - Server-side data validation
- ✅ **CORS Configuration** - Restricted origin access
- ✅ **Environment Variables** - Sensitive data protection
- ✅ **Authorization Checks** - Role-based access control
- ✅ **Error Handling** - Secure error messages

---

## 🐛 Troubleshooting

### **MongoDB Connection Issues**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Verify MongoDB URI in `.env`
- Ensure IP is whitelisted in MongoDB Atlas
- Check username and password are correct
- Try connection string format: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`

### **Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
- Change PORT in `.env` (e.g., `PORT=5001`)
- Or kill process: `npx kill-port 5000`

### **JWT Token Errors**
```
Error: jwt malformed / Invalid token
```
**Solution:**
- Ensure token is in Authorization header
- Format: `Authorization: Bearer <token>`
- Check JWT_SECRET matches in `.env`
- Token may have expired (check JWT_EXPIRE)

### **CORS Errors**
```
Error: Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Check frontend URL is in CORS whitelist
- Verify `origin: true` in backend CORS config
- Check API endpoint URL is correct

### **Frontend Not Connecting to Backend**
**Solution:**
- Verify backend is running on port 5000
- Check API base URL in [src/services/api.ts](FrontEnd/src/services/api.ts)
- Check browser console for network errors
- Verify CORS is enabled in backend

### **Dependencies Installation Error**
```
Error: npm ERR! code E401
```
**Solution:**
```bash
npm cache clean --force
rm package-lock.json
npm install
```

---

## 📝 Environment Variables Reference

### **Backend (.env)**
```env
# Server Configuration
PORT=5000                                    # Server port
NODE_ENV=development                        # Environment mode

# Database Configuration
MONGODB_URI=mongodb+srv://...              # MongoDB connection string

# JWT Configuration
JWT_SECRET=your_secret_key_here            # JWT signing secret
JWT_EXPIRE=7d                              # Token expiration time

# Security
BCRYPT_SALT=10                             # Bcrypt salt rounds

# Optional: File Upload
MAX_FILE_SIZE=5242880                      # Max file size (5MB)
ALLOWED_FORMATS=jpg,jpeg,png,webp          # Allowed image formats
```

---

## 🎓 Learning Outcomes

This project demonstrates:
- **Full-Stack Development** - Frontend & Backend integration
- **TypeScript** - Type safety in both frontend and backend
- **REST API Design** - RESTful endpoint architecture
- **Database Modeling** - MongoDB schema design with Mongoose
- **Authentication & Authorization** - JWT-based security
- **Responsive UI** - Mobile-first Tailwind CSS design
- **State Management** - React hooks and context
- **Component Architecture** - Modular React components
- **Error Handling** - Comprehensive error management
- **DevOps Basics** - Environment configuration and deployment

---

## 📄 License

This project is licensed under the **ISC License** - see individual README files for details.

---

## 👥 Team & Support

**Project Type:** RAD (Rapid Application Development) Final Project  
**Institution:** IJSE (Institute of Java Software Engineering)

For questions or support, please contact the development team or refer to the individual README files in [BackEnd](BackEnd/README.md) and [FrontEnd](FrontEnd/README.md) directories.

---

## 🚀 Next Steps

1. ✅ Complete setup following installation guide
2. ✅ Configure MongoDB Atlas credentials
3. ✅ Run backend and frontend servers
4. ✅ Create test user accounts
5. ✅ Test API endpoints with Postman
6. ✅ Deploy to cloud platforms (Vercel/Render)
7. ✅ Set up CI/CD pipeline
8. ✅ Add more features (reviews, messaging, etc.)

---

**Built with ❤️ for RAD Final Project**

Last Updated: January 2026
