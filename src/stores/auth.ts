import { reactive } from "vue";
import type { AuthResponse, LoginCredentials, User } from "../types/auth";
import { api } from "../api/axios";
import { AUTH_TOKEN, AUTH_USER } from "../consts";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
}

const state = reactive<AuthState>({
  user: null,
  accessToken: null,
  loading: false
});

export const authStore = {
  get user() { return state.user; },
  get token() { return state.accessToken; },
  get loading() { return state.loading; },
  get isAuthenticated() { return !!state.accessToken && !!state.user; },

  // Авторизация
  async login(credentials: LoginCredentials) {
    state.loading = true;
    
    try {
      const { data } = await api.post<AuthResponse>('/auth/login', credentials);
      
      state.accessToken = data.accessToken;
      state.user = data.user;
      
      localStorage.setItem(AUTH_TOKEN, data.accessToken);
      localStorage.setItem(AUTH_USER, JSON.stringify(data.user));
      
      api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
      
      return { success: true };
      
    } catch (error: any) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Ошибка авторизации'
      };
    } finally {
      state.loading = false;
    }
  },

  isTokenValid(): boolean {
    const token = localStorage.getItem(AUTH_TOKEN);
    if(!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      return Date.now() < exp;
    } catch {
      return false;
    }
  },

  logout() {
    state.accessToken = null;
    state.user = null;
    
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(AUTH_USER);
    
    delete api.defaults.headers.common['Authorization'];
    
    window.location.href = '/auth';
  },

  init() {
    const token = localStorage.getItem(AUTH_TOKEN);
    const userJson = localStorage.getItem(AUTH_USER);
    
    if (token && userJson) {
      try {
        state.accessToken = token;
        state.user = JSON.parse(userJson);
        
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error('Ошибка инициализации авторизации:', error);
        this.logout();
      }
    }
  }
};