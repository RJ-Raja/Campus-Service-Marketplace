import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

export interface AuthRequest extends Request {
  user?: IUser;
}

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET must be defined in environment variables');
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Authorization token missing or invalid',
        statusCode: 401,
      });
      return;
    }

    const token = header.split(' ')[1];
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string };

    const user = await User.findById(payload.userId);
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'User not found',
        statusCode: 401,
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      statusCode: 401,
    });
  }
};

export const authorize = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    const user = req.user;
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized',
        statusCode: 401,
      });
      return;
    }
    if (!roles.includes(user.role)) {
      res.status(403).json({
        success: false,
        message: 'Forbidden: insufficient permissions',
        statusCode: 403,
      });
      return;
    }
    next();
  };
};
