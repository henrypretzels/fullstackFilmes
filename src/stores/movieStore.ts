import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Movie, MovieReview } from '@/types/movie';
import { movieService, reviewService, favoriteService } from '@/services/api';

export const useMovieStore = defineStore('movie', () => {
  const movies = ref<Movie[]>([]);
  const currentMovie = ref<Movie | null>(null);
  const reviews = ref<MovieReview[]>([]);
  // const favorites = ref<string[]>([]); // Commented out favorites state
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
    } catch (err) {
      error.value = 'Erro ao carregar avaliações';
      console.error(err);
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

  // --- Commented out favorites logic ---
  // async function fetchFavorites() {
  //   try {
  //     favorites.value = await favoriteService.getFavorites();
  //   } catch (err) {
  //     error.value = 'Erro ao carregar favoritos';
  //     console.error(err);
  //   }
  // }

  // async function toggleFavorite(filmeId: string) {
  //   try {
  //     const isFavorite = await favoriteService.checkFavorite(filmeId);
  //     if (isFavorite) {
  //       await favoriteService.removeFavorite(filmeId);
  //       favorites.value = favorites.value.filter((id: string) => id !== filmeId);
  //     } else {
  //       await favoriteService.addFavorite(filmeId);
  //       favorites.value.push(filmeId);
  //     }
  //   } catch (err) {
  //     error.value = 'Erro ao atualizar favoritos';
  //     console.error(err);
  //   }
  // }
  // -------------------------------------

  return {
    movies,
    currentMovie,
    reviews,
    // favorites, // Commented out favorites state in return
    loading,
    error,
    filteredMovies,
    fetchMovies,
    fetchMovieById,
    searchMovies,
    filterByGenre,
    fetchMovieReviews,
    addReview,
    // fetchFavorites, // Commented out favorites function in return
    // toggleFavorite, // Commented out favorites function in return
  };
}); 