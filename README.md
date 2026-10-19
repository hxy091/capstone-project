# Capstone Project: Full-Stack Portfolio & Blog Application

**Course:** Web Data Management and Application

## Overview

A production-ready full-stack personal portfolio website built with:

- **Backend:** Node.js, Express, MongoDB Atlas (Mongoose), JWT authentication, bcrypt, helmet
- **Frontend:** React 18, Vite, React Router, Context API, responsive CSS
- **Deployment:** Backend on Render, Frontend on Vercel/Netlify

## Live Demo

- **Frontend:** https://your-frontend.vercel.app
- **Backend API:** https://your-backend.onrender.com

## Project Structure

```
CapstoneProject/
├── server/                 # Express backend API
│   ├── config/db.js        # MongoDB connection
│   ├── models/             # Mongoose schemas
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── BlogPost.js
│   │   ├── Comment.js
│   │   └── Message.js
│   ├── controllers/        # Route controllers
│   ├── routes/             # API routes
│   ├── middleware/          # Auth & error middleware
│   ├── server.js           # Entry point
│   └── .env.example
├── client/                 # React frontend
│   ├── src/
│   │   ├── context/        # AuthContext (Context API)
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Route pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
└── README.md
```

## API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /api/users/register | Public | Register a new user |
| POST | /api/users/login | Public | Login and get JWT |

### Projects
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/projects | Public | Get all projects |
| GET | /api/projects/:id | Public | Get single project |
| POST | /api/projects | Protected | Create a project |
| PUT | /api/projects/:id | Protected | Update a project |
| DELETE | /api/projects/:id | Protected | Delete a project |

### Blog
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/blog | Public | Get all blog posts |
| GET | /api/blog/:id | Public | Get post with comments |
| POST | /api/blog | Protected | Create a post |
| PUT | /api/blog/:id | Protected/Author | Update a post |
| DELETE | /api/blog/:id | Protected/Author | Delete a post |

### Comments
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/blog/:postId/comments | Public | Get comments for a post |
| POST | /api/blog/:postId/comments | Protected | Add a comment |

### Contact
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /api/contact | Public | Submit contact form |

## Running Locally

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)

### 1. Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```
Server runs on http://localhost:5000

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```
Client runs on http://localhost:3000 (proxy configured to forward /api to backend)

### 3. Create Admin Account
- Register at http://localhost:3000/register
- Login and access the Admin Dashboard at /admin

## Deployment

### Backend (Render)
1. Push `server/` to GitHub
2. Create a new Web Service on Render
3. Set environment variables: `MONGO_URI`, `JWT_SECRET`, `PORT`
4. Build command: `npm install`, Start command: `npm start`

### Frontend (Vercel/Netlify)
1. Push `client/` to GitHub
2. Import project on Vercel
3. Build command: `npm run build`, Output directory: `dist`
4. Set environment variable `VITE_API_URL` to your deployed backend URL
