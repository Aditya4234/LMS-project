import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Express app
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms';

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB Connected Successfully');
    })
    .catch((err: Error) => {
        console.error('⚠️ MongoDB Connection Error:', err.message);
        console.log('⚠️ Server will continue without MongoDB (in-memory mode)');
    });

// Routes
import authRoutes from './routes/auth';
import coursesRoutes from './routes/courses';
import studentsRoutes from './routes/students';
import instructorsRoutes from './routes/instructors';
import assignmentsRoutes from './routes/assignments';
import attendanceRoutes from './routes/attendance';
import gradesRoutes from './routes/grades';
import announcementsRoutes from './routes/announcements';
import reportsRoutes from './routes/reports';
import settingsRoutes from './routes/settings';
import profileRoutes from './routes/profile';
import contactRoutes from './routes/contact';

app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/instructors', instructorsRoutes);
app.use('/api/assignments', assignmentsRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/grades', gradesRoutes);
app.use('/api/announcements', announcementsRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/contact', contactRoutes);

// Health Check Endpoint
app.get('/', (req: Request, res: Response) => {
    res.json({
        message: '🚀 LMS Backend Server is Running!',
        status: 'OK',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            courses: '/api/courses',
            students: '/api/students',
            instructors: '/api/instructors',
            assignments: '/api/assignments',
            attendance: '/api/attendance',
            grades: '/api/grades',
            announcements: '/api/announcements',
            reports: '/api/reports',
            settings: '/api/settings',
            profile: '/api/profile',
            contact: '/api/contact',
        },
    });
});

// 404 Handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Cannot ${req.method} ${req.path}`,
    });
});

// Error Handler Middleware
interface ErrorWithStatus extends Error {
    status?: number;
}

app.use((err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        status: err.status || 500,
    });
});

// Start Server
const PORT: number = parseInt(process.env.PORT || '5000', 10);

app.listen(PORT, () => {
    console.log(`🎉 Server running on http://localhost:${PORT}`);
    console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
