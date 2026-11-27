import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Base API URL configured via environment or defaulting to local Modular Monolith port
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';
export const IS_MOCK_FALLBACK = import.meta.env.VITE_ENABLE_MOCK_FALLBACK !== 'false';

// Standard Unified API Response Envelope matching docs/ARCHITECTURE.md
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    [key: string]: unknown;
  };
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

// Global Axios Instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor: Attach JWT bearer token if available
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    try {
      const authData = localStorage.getItem('eviq-auth');
      if (authData && authData !== 'logged_out') {
        const token = localStorage.getItem('eviq-jwt-token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch {
      // Ignore localStorage errors (e.g. during SSR or test environments)
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Centralized error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiResponse>) => {
    // If backend returns a structured error envelope
    if (error.response?.data?.error) {
      console.warn(`[API Error ${error.response.status}]:`, error.response.data.error.message);
    }

    // Auto logout on 401 Unauthorized if real JWT expires
    if (error.response?.status === 401) {
      try {
        localStorage.removeItem('eviq-jwt-token');
        localStorage.setItem('eviq-auth', 'logged_out');
      } catch {
        // Ignore
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
