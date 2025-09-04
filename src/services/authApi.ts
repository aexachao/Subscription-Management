import { API_BASE_URL } from '../config/api';
import { User } from '../store/authStore';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: User;
}

export interface AuthCheckResponse {
  success: boolean;
  authenticated: boolean;
  user?: User;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

class AuthApi {
  private baseUrl = `${API_BASE_URL}/auth`;

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || '登录失败');
      }

      return data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : '登录失败');
    }
  }

  async logout(): Promise<LogoutResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || '登出失败');
      }

      return data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : '登出失败');
    }
  }

  async checkAuth(): Promise<AuthCheckResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/check`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || '验证失败');
      }

      return data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : '验证失败');
    }
  }
}

export const authApi = new AuthApi();
