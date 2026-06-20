import { Request, Response, NextFunction } from 'express';
import authService from '../services/authService';
import { loginSchema, registerSchema } from '../utils/validation';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const parsed = registerSchema.parse(req.body);
    const result = await authService.registerUser(parsed);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: result.user._id,
          email: result.user.email,
          role: result.user.role,
          status: result.user.status,
        },
        token: result.token,
      },
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const parsed = loginSchema.parse(req.body);
    const result = await authService.loginUser(parsed);

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: {
        user: {
          id: result.user._id,
          email: result.user.email,
          role: result.user.role,
          status: result.user.status,
        },
        token: result.token,
      },
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};
