import { Request, Response, NextFunction } from 'express';

interface ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
  error?: string;
  statusCode: number;
}

interface ApiError extends Error {
  statusCode?: number;
  details?: unknown;
}

const errorHandler = (
  error: ApiError,
  _req: Request,
  res: Response<ApiResponse>,
  _next: NextFunction
): void => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  console.error(`[ERROR] ${statusCode}: ${message}`, error.details || '');

  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    statusCode,
  });
};

export default errorHandler;
