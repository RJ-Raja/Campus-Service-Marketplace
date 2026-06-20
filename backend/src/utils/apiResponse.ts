import { Response } from 'express';

interface ApiResponse {
  success: boolean;
  message: string;
  data?: unknown;
  statusCode: number;
}

const sendResponse = (
  res: Response<ApiResponse>,
  statusCode: number,
  message: string,
  data?: unknown
): Response<ApiResponse> => {
  return res.status(statusCode).json({
    success: statusCode >= 200 && statusCode < 300,
    message,
    data: data || undefined,
    statusCode,
  });
};

export default sendResponse;
