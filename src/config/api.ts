import axios from 'axios';

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  withCredentials: true, // Enable cookies for session authentication
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor (no redirect here; let route guard handle it)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: string[];
}

// API Error Class
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}