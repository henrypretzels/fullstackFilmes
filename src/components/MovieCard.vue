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
        :disabled="isLoading"
        :class="['favorite-btn', { 'is-favorite': isFavorite }]"
      >
        {{ isFavorite ? '❤️' : '🤍' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Movie } from '@/types/movie';
import { favoriteService } from '@/services/api';

const props = defineProps<{
  movie: Movie;
}>();

const isFavorite = ref(false);
const isLoading = ref(false);

const toggleFavorite = async () => {
  try {
    isLoading.value = true;
    if (isFavorite.value) {
      await favoriteService.removeFavorite(props.movie.id);
    } else {
      await favoriteService.addFavorite(props.movie.id);
    }
    isFavorite.value = !isFavorite.value;
  } catch (error) {
    console.error('Error toggling favorite:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  try {
    isFavorite.value = await favoriteService.checkFavorite(props.movie.id);
  } catch (error) {
    console.error('Error checking favorite status:', error);
  }
});
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