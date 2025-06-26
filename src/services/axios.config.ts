import axios from 'axios'
import router from '@/router'
import { useAuthStore } from '@/stores/authStore'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
})

api.interceptors.request.use(
  (config) => {
    // Always read the token from localStorage to ensure it's up-to-date
    const userStr = localStorage.getItem('user');
    let token = null;
    if (userStr) {
      try {
        token = JSON.parse(userStr).token;
      } catch (e) {
        token = null;
      }
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Axios request token:', token, 'URL:', config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response error:', error.response || error)
    
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      authStore.logout()
      router.push('/login')
    }
    
    // Handle CORS errors
    if (error.message === 'Network Error') {
      console.error('CORS or network error. Check if the backend is running and CORS is properly configured.')
    }
    
    return Promise.reject(error)
  }
)

export default api 