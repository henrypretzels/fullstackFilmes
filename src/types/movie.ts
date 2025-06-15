export interface Movie {
  id: string;
  titulo: string;
  imagemUrl: string;
  ano: number;
  generos: string[];
  sinopse: string;
}

export interface MovieReview {
  id: string;
  filmeId: string;
  autor: string;
  nota: number;
  comentario: string;
}

export interface User {
  id: string;
  nome: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    nome: string;
    role: 'ADMIN' | 'USER';
  };
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegisterRequest extends LoginRequest {
  nome: string;
  isAdmin: boolean;
} 