import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User, LoginRequest, RegisterRequest, AuthResponse } from '@/types/movie';
import { authService } from '@/services/api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Load user from localStorage on store initialization
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser);
    } catch (e) {
      console.error("Error parsing stored user data:", e);
      localStorage.removeItem('user'); // Clear corrupted data
    }
  }

  const token = computed(() => user.value?.token);
  const isAdmin = computed(() => user.value?.role === 'ADMIN');
  const isAuthenticated = computed(() => !!user.value?.token);

  function setUser(userData: User | null, authToken: string | null) {
    if (userData && authToken) {
      user.value = JSON.parse(JSON.stringify({ ...userData, token: authToken }));
      console.log('Set user.value:', user.value);
      console.log('isAuthenticated:', isAuthenticated.value);
      localStorage.setItem('user', JSON.stringify({ ...userData, token: authToken }));
    } else {
      user.value = null;
      localStorage.removeItem('user');
    }
  }

  async function login(data: LoginRequest) {
    try {
      loading.value = true;
      error.value = null;
      const response: AuthResponse = await authService.login(data);
      setUser({
        id: response.user.id,
        email: response.user.email,
        nome: response.user.nome,
        role: response.user.role,
      }, response.token);
      // window.location.reload(); // Force a full reload to sync state
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erro ao fazer login';
      console.error(err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function register(data: RegisterRequest) {
    try {
      loading.value = true;
      error.value = null;
      const response: AuthResponse = await authService.register(data);
      setUser({
        id: response.user.id,
        email: response.user.email,
        nome: response.user.nome,
        role: response.user.role,
      }, response.token);
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Erro ao registrar';
      console.error(err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function logout() {
    setUser(null, null);
  }

  return {
    user,
    loading,
    error,
    token,
    isAdmin,
    isAuthenticated,
    login,
    register,
    logout,
  };
}); 