import { apiClient, ApiResponse, IS_MOCK_FALLBACK } from './apiClient';
import { Role, UserProfile } from '../types';
import { DEFAULT_ATTENDEE_USER } from '../mock/data';

export interface LoginCredentials {
  email: string;
  password?: string;
  role?: Role;
}

export interface AuthResponseData {
  user: UserProfile;
  token: string;
  refreshToken: string;
}

export const authService = {
  /**
   * User login with backend integration and mock fallback
   */
  async login(credentials: LoginCredentials): Promise<AuthResponseData> {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponseData>>('/auth/login', credentials);
      if (response.data.success && response.data.data) {
        localStorage.setItem('eviq-jwt-token', response.data.data.token);
        localStorage.setItem('eviq-refresh-token', response.data.data.refreshToken);
        return response.data.data;
      }
      throw new Error(response.data.error?.message || 'Login failed');
    } catch (error) {
      if (IS_MOCK_FALLBACK) {
        // Fallback for Phase 5 prototype
        const fallbackUser: UserProfile = {
          ...DEFAULT_ATTENDEE_USER,
          email: credentials.email || DEFAULT_ATTENDEE_USER.email,
          role: credentials.role || 'attendee',
        };
        const fallbackToken = `mock-jwt-${Date.now()}`;
        localStorage.setItem('eviq-jwt-token', fallbackToken);
        return {
          user: fallbackUser,
          token: fallbackToken,
          refreshToken: `mock-refresh-${Date.now()}`,
        };
      }
      throw error;
    }
  },

  /**
   * Logout user and purge tokens
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem('eviq-jwt-token');
      localStorage.removeItem('eviq-refresh-token');
      localStorage.setItem('eviq-auth', 'logged_out');
    }
  },

  /**
   * Send forgot password request
   */
  async forgotPassword(email: string): Promise<boolean> {
    try {
      const res = await apiClient.post<ApiResponse>('/auth/forgot-password', { email });
      return !!res.data.success;
    } catch (error) {
      if (IS_MOCK_FALLBACK) return true;
      throw error;
    }
  },

  /**
   * Verify email OTP
   */
  async verifyEmailOtp(code: string): Promise<boolean> {
    try {
      const res = await apiClient.post<ApiResponse>('/auth/verify-email', { code });
      return !!res.data.success;
    } catch (error) {
      if (IS_MOCK_FALLBACK) return true;
      throw error;
    }
  },
};

export default authService;
