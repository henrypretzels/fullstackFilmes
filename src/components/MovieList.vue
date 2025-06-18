<template>
  <div class="movie-list">
    <div class="search-bar">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Buscar filmes..."
        @input="handleSearch"
      />
      <select v-model="selectedGenre" @change="handleGenreFilter">
        <option value="">Todos os gêneros</option>
        <option v-for="genre in genres" :key="genre" :value="genre">
          {{ genre }}
        </option>
      </select>
    </div>

    <div v-if="store.loading" class="loading">
      Carregando filmes...
    </div>

    <div v-else-if="store.error" class="error">
      {{ store.error }}
    </div>

    <div v-else-if="store.movies.length === 0" class="error">
      Nenhum filme encontrado
    </div>

    <div v-else class="movie-grid">
      <MovieCard
        v-for="movie in store.filteredMovies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useMovieStore } from '@/stores/movieStore';
import MovieCard from './MovieCard.vue';
import type { Movie } from '@/types/movie';

const store = useMovieStore();
const searchQuery = ref('');
const selectedGenre = ref('');
const genres = ref<string[]>([]);

onMounted(async () => {
  try {
    await store.fetchMovies();
    extractGenres();
    // Only fetch favorites if movies were loaded successfully
    if (!store.error) {
      await store.fetchFavorites();
    }
  } catch (err) {
    console.error('Error in MovieList setup:', err);
  }
});

function extractGenres() {
  const genreSet = new Set<string>();
  store.movies.forEach((movie: Movie) => {
    movie.generos.forEach((genero: string) => genreSet.add(genero));
  });
  genres.value = Array.from(genreSet).sort();
}

async function handleSearch() {
  if (searchQuery.value.trim()) {
    await store.searchMovies(searchQuery.value);
  } else {
    await store.fetchMovies();
  }
}

async function handleGenreFilter() {
  if (selectedGenre.value) {
    await store.filterByGenre(selectedGenre.value);
  } else {
    await store.fetchMovies();
  }
}

watch(searchQuery, () => {
  if (!searchQuery.value.trim()) {
    store.fetchMovies();
  }
});
</script>

<style scoped>
.movie-list {
  padding: 20px;
}

.search-bar {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.search-bar input,
.search-bar select {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.search-bar input {
  flex: 1;
}

.loading,
.error {
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: #666;
}

.error {
  color: #ff4d4d;
  background-color: #fee;
  border-radius: 8px;
  margin: 2rem auto;
  max-width: 600px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
  padding: 20px 0;
}
</style> 