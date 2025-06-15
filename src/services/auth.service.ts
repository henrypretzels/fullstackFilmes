import api from './axios.config'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  nome: string
  email: string
  password: string
}

export interface User {
  email: string
  nome: string
  isAdmin: boolean
}

export interface AuthResponse {
  token: string
  user: User
}

// Helper function to decode JWT
function decodeJwt(token: string): any {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    return JSON.parse(jsonPayload)
  } catch (e) {
    console.error('Error decoding JWT:', e)
    return {}
  }
}

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post('/api/auth/login', {
      email: data.email,
      senha: data.password
    })
    const token = response.data
    // Decode JWT to get user info
    const userInfo = decodeJwt(token)
    const user: User = {
      email: userInfo.sub,
      nome: userInfo.nome || '',
      isAdmin: userInfo.isAdmin === 1
    }
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    return { token, user }
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post('/api/auth/registrar', {
      nome: data.nome,
      email: data.email,
      senha: data.password
    })
    const token = response.data
    // Decode JWT to get user info
    const userInfo = decodeJwt(token)
    const user: User = {
      email: userInfo.sub,
      nome: userInfo.nome || '',
      isAdmin: userInfo.isAdmin === 1
    }
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    return { token, user }
  },

  logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  getToken(): string | null {
    return localStorage.getItem('token')
  },

  getUser(): User | null {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  isAuthenticated(): boolean {
    return !!this.getToken()
  },

  isAdmin(): boolean {
    const user = this.getUser()
    return user?.isAdmin || false
  }
} 