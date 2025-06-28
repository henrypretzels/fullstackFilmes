import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Movie, MovieReview } from '@/types/movie';
import { movieService, reviewService, favoriteService } from '@/services/api';

export const useMovieStore = defineStore('movie', () => {
  console.log('🍍 movie store initialized');
  const movies = ref<Movie[]>([]);
  const currentMovie = ref<Movie | null>(null);
  const reviews = ref<MovieReview[]>([]);
  const favorites = ref<string[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const filteredMovies = computed(() => movies.value);

  async function fetchMovies() {
    try {
      loading.value = true;
      movies.value = await movieService.getAllMovies();
    } catch (err) {
      error.value = 'Erro ao carregar filmes';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function fetchMovieById(id: string) {
    try {
      loading.value = true;
      currentMovie.value = await movieService.getMovieById(id);
      await fetchMovieReviews(id);
    } catch (err) {
      error.value = 'Erro ao carregar filme';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function searchMovies(titulo: string) {
    try {
      loading.value = true;
      movies.value = await movieService.searchMovies(titulo);
    } catch (err) {
      error.value = 'Erro ao buscar filmes';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function filterByGenre(genero: string) {
    try {
      loading.value = true;
      movies.value = await movieService.getMoviesByGenre(genero);
    } catch (err) {
      error.value = 'Erro ao filtrar filmes';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function fetchMovieReviews(filmeId: string) {
    try {
      reviews.value = await reviewService.getMovieReviews(filmeId);
    } catch (err: any) {
      // Handle 404 as "no reviews" rather than an error
      if (err?.response?.status === 404) {
        reviews.value = [];
      } else {
      error.value = 'Erro ao carregar avaliações';
        console.error('Error fetching movie reviews:', err);
      }
    }
  }

  async function addReview(filmeId: string, data: { nota: number; comentario: string }) {
    try {
      const review = await reviewService.addReview(filmeId, data);
      reviews.value.push(review);
    } catch (err) {
      error.value = 'Erro ao adicionar avaliação';
      console.error(err);
    }
  }

  async function fetchFavorites() {
    try {
      console.log('Fetching favorites...');
      const result = await favoriteService.getFavorites();
      console.log('Favorites result:', result);
      // Use a Set to remove duplicates from the backend response
      favorites.value = Array.from(new Set(result));
      console.log('Favorites updated in store (deduplicated):', favorites.value);
    } catch (err: any) {
      console.error('Error fetching favorites:', err.response || err);
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        favorites.value = [];
      } else {
        error.value = 'Erro ao carregar favoritos';
      }
    }
  }

  async function toggleFavorite(filmeId: string) {
    try {
      const isCurrentlyFavorite = favorites.value.includes(filmeId);
      console.log('Toggle favorite:', filmeId, 'Currently favorite:', isCurrentlyFavorite);
      
      if (isCurrentlyFavorite) {
        console.log('Removing favorite...');
        await favoriteService.removeFavorite(filmeId);
        // Create new array reference for reactivity
        favorites.value = favorites.value.filter((id: string) => id !== filmeId);
        console.log('Favorite removed successfully. New favorites:', favorites.value);
      } else {
        console.log('Adding favorite...');
        await favoriteService.addFavorite(filmeId);
        // Create new array reference for reactivity
        favorites.value = [...favorites.value, filmeId];
        console.log('Favorite added successfully. New favorites:', favorites.value);
      }
    } catch (err: any) {
      console.log('Error in toggleFavorite:', err);
      // Log the detailed error response from Axios
      console.log('Error response:', err.response);
      console.log('Error message:', err.response?.data?.message || err.message);
      
      // Handle specific error for already favorited movie
      if (err?.response?.data?.message?.includes('já está nos favoritos')) {
        alert('Este filme já está nos seus favoritos!');
        return;
      }
      // Handle other errors
      error.value = 'Erro ao atualizar favoritos';
      console.error(err);
    }
  }

  function clearFavorites() {
    console.log('Clearing favorites...');
    favorites.value = [];
    console.log('Favorites cleared');
  }

  return {
    movies,
    currentMovie,
    reviews,
    favorites,
    loading,
    error,
    filteredMovies,
    fetchMovies,
    fetchMovieById,
    searchMovies,
    filterByGenre,
    fetchMovieReviews,
    addReview,
    fetchFavorites,
    toggleFavorite,
    clearFavorites,
  };
}); 