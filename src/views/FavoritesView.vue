<template>
  <div class="favorites-view">
    <h1>Meus Favoritos</h1>

    <div v-if="store.loading" class="loading">
      Carregando favoritos...
    </div>

    <div v-else-if="store.error" class="error">
      {{ store.error }}
    </div>

    <div v-else-if="favoriteMovies.length === 0" class="no-favorites">
      <p>Você ainda não tem filmes favoritos.</p>
      <router-link to="/" class="browse-link">Explorar filmes</router-link>
    </div>

    <div v-else class="favorites-grid">
      <MovieCard
        v-for="movie in favoriteMovies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useMovieStore } from '@/stores/movieStore';
import MovieCard from '@/components/MovieCard.vue';
import type { Movie } from '@/types/movie';

const store = useMovieStore();

const favoriteMovies = computed(() => {
  return store.movies.filter((movie: Movie) => store.favorites.includes(movie.id));
});

onMounted(async () => {
  await store.fetchMovies();
  await store.fetchFavorites();
});
</script>

<style scoped>
.favorites-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 32px;
  font-size: 2rem;
  color: #fff;
  text-shadow: 0 2px 8px rgba(0,0,0,0.18);
}

.loading,
.error,
.no-favorites {
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: #666;
}

.error {
  color: #ff4d4d;
}

.no-favorites {
  background: #f8f8f8;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.browse-link {
  display: inline-block;
  padding: 8px 24px;
  background: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.2s;
}

.browse-link:hover {
  background: #45a049;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
}
</style> 