import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email({ message: 'Email must be valid' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  role: z.enum(['Service Buyer', 'Service Provider', 'Moderator', 'Admin']).optional(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email must be valid' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
