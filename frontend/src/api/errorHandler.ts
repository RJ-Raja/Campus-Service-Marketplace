// Example response interceptor for handling errors
import { AxiosError } from 'axios';

interface ErrorResponse {
  success: false;
  message: string;
  error?: string;
  statusCode: number;
}

export const handleApiError = (error: AxiosError<ErrorResponse>) => {
  if (error.response) {
    // Server responded with error status
    console.error('API Error:', {
      status: error.response.status,
      message: error.response.data.message,
    });
    throw new Error(error.response.data.message || 'API Error');
  } else if (error.request) {
    // Request made but no response received
    console.error('No response from server:', error.request);
    throw new Error('No response from server');
  } else {
    // Error during request setup
    console.error('Error:', error.message);
    throw new Error(error.message);
  }
};
