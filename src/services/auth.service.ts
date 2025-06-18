import api from './axios.config'
import type { LoginRequest, RegisterRequest, AuthResponse, User } from '@/types/movie'; // Import types from movie.ts

// Removed local interface definitions: LoginRequest, RegisterRequest, AuthResponse, User

// Removed Helper function to decode JWT - logic moved to authStore if needed
// function decodeJwt(token: string): any { ... }

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', {
      email: data.email,
      senha: data.senha
    });
    return response.data; // Return AuthResponse directly
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/registrar', {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      isAdmin: data.isAdmin
    });
    return response.data; // Return AuthResponse directly
  },

  // Removed logout, getToken, getUser, isAuthenticated, isAdmin methods
  // These are now handled by useAuthStore
}; 