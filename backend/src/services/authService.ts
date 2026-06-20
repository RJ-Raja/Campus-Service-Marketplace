import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser, UserRole } from '../models/User';
import { RegisterSchema, LoginSchema } from '../utils/validation';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET must be defined in environment variables');
}

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePasswords = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

const generateToken = (user: IUser): string => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
};

const registerUser = async (payload: RegisterSchema) => {
  const validated = registerSchema.parse(payload);
  const existingUser = await User.findOne({ email: validated.email });

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const passwordHash = await hashPassword(validated.password);
  const user = await User.create({
    email: validated.email,
    passwordHash,
    role: validated.role ?? 'Service Buyer',
  });

  return {
    user,
    token: generateToken(user),
  };
};

const loginUser = async (payload: LoginSchema) => {
  const validated = loginSchema.parse(payload);
  const user = await User.findOne({ email: validated.email });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const passwordMatches = await comparePasswords(validated.password, user.passwordHash);
  if (!passwordMatches) {
    throw new Error('Invalid email or password');
  }

  if (user.status !== 'active') {
    throw new Error('User account is not active');
  }

  return {
    user,
    token: generateToken(user),
  };
};

export default {
  registerUser,
  loginUser,
};
