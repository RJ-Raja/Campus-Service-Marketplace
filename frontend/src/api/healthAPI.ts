import api from './axiosConfig';

interface HealthCheckResponse {
  success: boolean;
  message: string;
  data: {
    timestamp: string;
    uptime: number;
    environment: string;
  };
  statusCode: number;
}

interface ConnectionTestResponse {
  success: boolean;
  message: string;
  data: {
    database: string;
    redis: string;
    cloudinary: string;
    timestamp: string;
  };
  statusCode: number;
}

export const healthCheckAPI = {
  getHealth: async (): Promise<HealthCheckResponse> => {
    const response = await api.get<HealthCheckResponse>('/health');
    return response.data;
  },

  testConnection: async (): Promise<ConnectionTestResponse> => {
    const response = await api.get<ConnectionTestResponse>('/test-connection');
    return response.data;
  },
};
