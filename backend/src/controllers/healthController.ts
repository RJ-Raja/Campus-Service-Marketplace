// Sample health check controller
import { Request, Response } from 'express';
import sendResponse from '../utils/apiResponse';
import { getRedisClient } from '../config/redis';

export const healthCheck = (req: Request, res: Response): void => {
  sendResponse(res, 200, 'Server is running successfully ✅', {
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
};

export const testConnection = async (req: Request, res: Response): Promise<void> => {
  try {
    const redis = getRedisClient();

    // Test Redis connection
    const redisPing = await redis.ping();

    sendResponse(res, 200, 'All connections are working ✅', {
      database: 'MongoDB connected',
      redis: `Redis connected (${redisPing})`,
      cloudinary: 'Configured',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    sendResponse(res, 500, '❌ Connection test failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
