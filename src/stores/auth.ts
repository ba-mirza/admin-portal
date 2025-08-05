import { reactive } from "vue";
import type { AuthResponse, LoginCredentials, User } from "../types/auth";
import { api } from "../api/axios";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

const state = reactive<AuthState>({
  user: null,
  token: null,
  loading: false
});

export const authStore = {
  get user() { return state.user; },
  get token() { return state.token; },
  get loading() { return state.loading; },
  get isAuthenticated() { return !!state.token && !!state.user; },

  // Авторизация
  async login(credentials: LoginCredentials) {
    state.loading = true;
    
    try {
      const { data } = await api.post<AuthResponse>('/auth/login', credentials);
      
      state.token = data.token;
      state.user = data.user;
      
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('auth_user', JSON.stringify(data.user));
      
      // Устанавливаем токен в headers для всех последующих запросов
      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
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

  logout() {
    state.token = null;
    state.user = null;
    
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    
    delete api.defaults.headers.common['Authorization'];
    
    window.location.href = '/login';
  },

  init() {
    const token = localStorage.getItem('auth_token');
    const userJson = localStorage.getItem('auth_user');
    
    if (token && userJson) {
      try {
        state.token = token;
        state.user = JSON.parse(userJson);
        
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error('Ошибка инициализации авторизации:', error);
        this.logout();
      }
    }
  }
};