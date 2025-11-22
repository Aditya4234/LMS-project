Setup

1) Install deps

   npm install

2) Configure env (optional)

   Create a .env file with:

   MONGODB_URI=mongodb://localhost:27017/lms
   PORT=5000

   If not set, defaults are used.

3) Run

   npm run dev

Endpoints

- GET / -> health
- CRUD /api/students
- CRUD /api/courses
- POST /api/auth/register, /api/auth/login
# LMS Backend Server

Complete backend server for Learning Management System with Express.js, MongoDB, and RESTful API.

## 🚀 Features

- User Authentication (Register/Login)
- Course Management (CRUD operations)
- Student Management (CRUD operations)
- RESTful API endpoints
- MongoDB database integration
- JWT authentication ready
- CORS enabled

## 📦 Installation

```bash
# Install dependencies
npm install

# Create .env file
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lms
JWT_SECRET=your_secret_key
```

## 🏃 Running the Server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get single student
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

## 📁 Project Structure

```
backend/
├── server.js           # Main server file
├── models/            # MongoDB models
│   ├── User.js
│   ├── Course.js
│   └── Student.js
├── routes/            # API routes
│   ├── auth.js
│   ├── courses.js
│   └── students.js
├── .env               # Environment variables
├── package.json
└── README.md
```

## 🗄️ Database

Uses MongoDB with Mongoose ODM. Make sure MongoDB is running on your system.

## 🔗 Frontend Integration

The frontend should connect to `http://localhost:5000` for API calls.

## 📝 License

ISC

