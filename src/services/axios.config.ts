import axios from 'axios'
import { authService } from './auth.service'
import router from '@/router'

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
})

api.interceptors.request.use(
  (config) => {
    const token = authService.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
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
      authService.logout()
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