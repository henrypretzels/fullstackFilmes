import type { Movie, MovieReview, LoginRequest, RegisterRequest, AuthResponse } from '@/types/movie';
import api from './axios.config'; // Import the shared Axios instance

// Remove the local axios.create() instance and its interceptors
// const api = axios.create({
//   baseURL: 'http://localhost:8080/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add token to requests if it exists
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Add response interceptor to handle errors
// api.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     console.error('API Error:', error);
//     throw error;
//   }
// );

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', {
      email: data.email,
      senha: data.senha
    });
    return response.data;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/registrar', {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      isAdmin: data.isAdmin
    });
    return response.data;
  },
};

export const movieService = {
  async getAllMovies(): Promise<Movie[]> {
    try {
      const response = await api.get<Movie[]>('/filmes');
      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw new Error('Erro ao carregar filmes');
    }
  },

  async getMovieById(id: string): Promise<Movie> {
    try {
      const response = await api.get<Movie>(`/filmes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie:', error);
      throw new Error('Erro ao carregar filme');
    }
  },

  async searchMovies(titulo: string): Promise<Movie[]> {
    try {
      const response = await api.get<Movie[]>(`/filmes/search?titulo=${titulo}`);
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw new Error('Erro ao buscar filmes');
    }
  },

  async getMoviesByGenre(genero: string): Promise<Movie[]> {
    try {
      const response = await api.get<Movie[]>(`/filmes/genero?genero=${genero}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
      throw new Error('Erro ao carregar filmes por gênero');
    }
  },
};

export const reviewService = {
  async getMovieReviews(filmeId: string): Promise<MovieReview[]> {
    try {
      const response = await api.get<MovieReview[]>(`/avaliacoes/${filmeId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw new Error('Erro ao carregar avaliações');
    }
  },

  async addReview(filmeId: string, data: { nota: number; comentario: string }): Promise<MovieReview> {
    try {
      const response = await api.post<MovieReview>(`/avaliacoes/${filmeId}`, data);
      return response.data;
    } catch (error) {
      console.error('Error adding review:', error);
      throw new Error('Erro ao adicionar avaliação');
    }
  },
};

export const favoriteService = {
  async getFavorites(): Promise<string[]> {
    try {
      const response = await api.get<string[]>('/favoritos');
      return response.data;
    } catch (error) {
      console.error('Error fetching favorites:', error);
      throw new Error('Erro ao carregar favoritos');
    }
  },

  async addFavorite(filmeId: string): Promise<void> {
    try {
      await api.post(`/favoritos/${filmeId}`);
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw new Error('Erro ao adicionar favorito');
    }
  },

  async removeFavorite(filmeId: string): Promise<void> {
    try {
      await api.delete(`/favoritos/${filmeId}`);
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw new Error('Erro ao remover favorito');
    }
  },

  async checkFavorite(filmeId: string): Promise<boolean> {
    try {
      const response = await api.get<boolean>(`/favoritos/${filmeId}`);
      return response.data;
    } catch (error) {
      console.error('Error checking favorite:', error);
      throw new Error('Erro ao verificar favorito');
    }
  },
}; 