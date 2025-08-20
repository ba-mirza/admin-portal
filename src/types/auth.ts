export interface User {
  id: number;
  name: string;
  role: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
}