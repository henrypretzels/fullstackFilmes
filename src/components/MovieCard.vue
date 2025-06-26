<template>
  <div class="movie-card">
    <img :src="movie.imagemUrl" :alt="movie.titulo" class="movie-image" />
    <div class="movie-info">
      <h3>{{ movie.titulo }}</h3>
      <p class="year">{{ movie.ano }}</p>
      <div class="genres">
        <span v-for="genero in movie.generos" :key="genero" class="genre-tag">
          {{ genero }}
        </span>
      </div>
      <p class="sinopse">{{ movie.sinopse }}</p>
      <button 
        @click="toggleFavorite"
        :class="['favorite-btn', { 'is-favorite': isFavorite }]"
      >
        {{ isFavorite ? '❤️' : '🤍' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import type { Movie } from '@/types/movie';
import { useMovieStore } from '@/stores/movieStore';
import { useAuthStore } from '@/stores/authStore';

const props = defineProps<{
  movie: Movie;
}>();

const movieStore = useMovieStore();
const authStore = useAuthStore();
const router = useRouter();

const isFavorite = computed(() => {
  const result = movieStore.favorites.includes(props.movie.id);
  console.log('MovieCard:', props.movie.titulo, 'movieStore.favorites:', movieStore.favorites, 'isFavorite:', result);
  return result;
});

const toggleFavorite = () => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
    return;
  }
  movieStore.toggleFavorite(props.movie.id);
};
</script>

<style scoped>
.movie-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.movie-card:hover {
  transform: translateY(-4px);
}

.movie-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.movie-info {
  padding: 1rem;
}

.movie-info h3 {
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
  color: #333;
}

.year {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 0.5rem;
}

.genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.genre-tag {
  background: #f0f0f0;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #666;
}

.sinopse {
  font-size: 0.9rem;
  color: #666;
  margin: 0.5rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.favorite-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: transform 0.2s;
}

.favorite-btn:hover {
  transform: scale(1.1);
}

.favorite-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style> 