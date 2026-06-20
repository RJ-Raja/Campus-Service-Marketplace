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

export const profileUpdateSchema = z.object({
  bio: z.string().max(1000).optional(),
  skills: z.string().optional(), // comma separated list on frontend
});

export const serviceCreateSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(2000),
  price: z.number().nonnegative(),
  category: z.string().min(1),
});

export const serviceUpdateSchema = serviceCreateSchema.partial();

export const searchSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  page: z.preprocess((v) => Number(v), z.number().int().positive().default(1)).optional(),
  limit: z.preprocess((v) => Number(v), z.number().int().positive().default(10)).optional(),
});

export const bookingCreateSchema = z.object({
  serviceId: z.string().min(1),
  details: z.string().max(2000).optional(),
  requestedDate: z.string().optional(),
});

export const bookingUpdateSchema = z.object({
  status: z.enum(['accepted', 'rejected']),
  agreedPrice: z.number().nonnegative().optional(),
});

export type ServiceCreateInput = z.infer<typeof serviceCreateSchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
