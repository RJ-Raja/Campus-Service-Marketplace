import api from '../../../api/axiosConfig';

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  status: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
    token: string;
  };
  statusCode: number;
}

export interface RegisterPayload {
  email: string;
  password: string;
  role?: 'Service Buyer' | 'Service Provider' | 'Moderator' | 'Admin';
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const authAPI = {
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/csmp/auth/register', payload);
    return response.data;
  },
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/csmp/auth/login', payload);
    return response.data;
  },
};
