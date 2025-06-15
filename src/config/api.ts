export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/registrar',
      logout: '/auth/logout'
    },
    movies: {
      list: '/filmes',
      detail: (id: string) => `/filmes/${id}`,
      search: (query: string) => `/filmes/search?titulo=${query}`,
      byGenre: (genre: string) => `/filmes/genero?genero=${genre}`
    },
    reviews: {
      list: (movieId: string) => `/avaliacoes/${movieId}`,
      create: (movieId: string) => `/avaliacoes/${movieId}`
    },
    favorites: {
      list: '/favoritos',
      add: (movieId: string) => `/favoritos/${movieId}`,
      remove: (movieId: string) => `/favoritos/${movieId}`,
      check: (movieId: string) => `/favoritos/${movieId}`
    }
  }
} as const; 