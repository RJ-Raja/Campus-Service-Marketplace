import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';

import errorHandler from './middlewares/errorHandler';
import healthRoutes from './routes/healthRoutes';
import authRoutes from './routes/authRoutes';
import profileRoutes from './routes/profileRoutes';
import serviceRoutes from './routes/serviceRoutes';
import searchRoutes from './routes/searchRoutes';
import bookingRoutes from './routes/bookingRoutes';
import orderRoutes from './routes/orderRoutes';

const app: Express = express();

// ============================================
// MIDDLEWARE
// ============================================

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ============================================
// ROUTES
// ============================================

app.use('/api/v1/csmp/auth', authRoutes);
app.use('/api/v1', healthRoutes);
app.use('/api/v1/csmp/profile', profileRoutes);
app.use('/api/v1/csmp/services', serviceRoutes);
app.use('/api/v1/csmp/search', searchRoutes);
app.use('/api/v1/csmp/bookings', bookingRoutes);
app.use('/api/v1/csmp/orders', orderRoutes);

// Root route
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Campus Service Marketplace API',
    version: '1.0.0',
    endpoints: {
      health: '/api/v1/health',
      testConnection: '/api/v1/test-connection',
    },
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
    statusCode: 404,
  });
});

// ============================================
// ERROR HANDLING
// ============================================

app.use(errorHandler);

export default app;
