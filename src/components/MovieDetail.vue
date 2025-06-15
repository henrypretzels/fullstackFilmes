<template>
  <div v-if="store.currentMovie" class="movie-detail">
    <div class="movie-header">
      <div class="movie-poster">
        <img :src="store.currentMovie.imagemUrl" :alt="store.currentMovie.titulo" />
      </div>
      <div class="movie-info">
        <h1>{{ store.currentMovie.titulo }}</h1>
        <div class="movie-meta">
          <span class="year">{{ store.currentMovie.ano }}</span>
          <div class="genres">
            <span v-for="genero in store.currentMovie.generos" :key="genero" class="genre-tag">
              {{ genero }}
            </span>
          </div>
        </div>
        <p class="sinopse">{{ store.currentMovie.sinopse }}</p>
        <button class="favorite-btn" @click="toggleFavorite" :class="{ 'is-favorite': isFavorite }">
          <span class="heart-icon">❤</span>
          {{ isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos' }}
        </button>
      </div>
    </div>

    <div class="reviews-section">
      <h2>Avaliações</h2>
      
      <div class="add-review">
        <h3>Adicionar Avaliação</h3>
        <form @submit.prevent="submitReview">
          <div class="rating">
            <label>Nota:</label>
            <div class="stars">
              <button
                v-for="star in 5"
                :key="star"
                type="button"
                @click="selectedRating = star"
                :class="{ active: star <= selectedRating }"
              >
                ★
              </button>
            </div>
          </div>
          <div class="comment">
            <label for="comment">Comentário:</label>
            <textarea
              id="comment"
              v-model="reviewComment"
              rows="4"
              placeholder="Escreva seu comentário..."
            ></textarea>
          </div>
          <button type="submit" :disabled="!isReviewValid">Enviar Avaliação</button>
        </form>
      </div>

      <div class="reviews-list">
        <div v-if="store.reviews.length === 0" class="no-reviews">
          Nenhuma avaliação ainda.
        </div>
        <div v-else v-for="review in store.reviews" :key="review.id" class="review-card">
          <div class="review-header">
            <span class="review-author">{{ review.autor }}</span>
            <div class="review-rating">
              <span v-for="star in 5" :key="star" :class="{ filled: star <= review.nota }">★</span>
            </div>
          </div>
          <p class="review-comment">{{ review.comentario }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMovieStore } from '@/stores/movieStore';

const route = useRoute();
const store = useMovieStore();
const selectedRating = ref(0);
const reviewComment = ref('');

const isFavorite = computed(() => {
  if (!store.currentMovie) return false;
  return store.favorites.includes(store.currentMovie.id);
});

const isReviewValid = computed(() => {
  return selectedRating.value > 0 && reviewComment.value.trim().length > 0;
});

onMounted(async () => {
  const movieId = route.params.id as string;
  await store.fetchMovieById(movieId);
  await store.fetchFavorites();
});

async function toggleFavorite() {
  if (store.currentMovie) {
    await store.toggleFavorite(store.currentMovie.id);
  }
}

async function submitReview() {
  if (!store.currentMovie || !isReviewValid.value) return;

  await store.addReview(store.currentMovie.id, {
    nota: selectedRating.value,
    comentario: reviewComment.value.trim(),
  });

  selectedRating.value = 0;
  reviewComment.value = '';
}
</script>

<style scoped>
.movie-detail {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.movie-header {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 24px;
  margin-bottom: 40px;
}

.movie-poster img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.movie-info h1 {
  margin: 0 0 16px;
  font-size: 2rem;
  color: #333;
}

.movie-meta {
  margin-bottom: 16px;
}

.year {
  color: #666;
  font-size: 1.1rem;
  margin-right: 16px;
}

.genres {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.genre-tag {
  background: #f0f0f0;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.9rem;
  color: #666;
}

.sinopse {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
  margin-bottom: 24px;
}

.favorite-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #f0f0f0;
  cursor: pointer;
  transition: all 0.2s;
}

.favorite-btn:hover {
  background: #e0e0e0;
}

.favorite-btn.is-favorite {
  background: #ff4d4d;
  color: white;
}

.heart-icon {
  font-size: 1.2rem;
}

.reviews-section {
  margin-top: 40px;
}

.reviews-section h2 {
  margin-bottom: 24px;
  font-size: 1.5rem;
  color: #333;
}

.add-review {
  background: #f8f8f8;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 32px;
}

.add-review h3 {
  margin: 0 0 16px;
  font-size: 1.2rem;
  color: #333;
}

.rating {
  margin-bottom: 16px;
}

.stars {
  display: flex;
  gap: 4px;
  margin-top: 8px;
}

.stars button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #ddd;
  cursor: pointer;
  transition: color 0.2s;
}

.stars button.active {
  color: #ffd700;
}

.comment {
  margin-bottom: 16px;
}

.comment label {
  display: block;
  margin-bottom: 8px;
  color: #666;
}

.comment textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
}

.add-review button[type="submit"] {
  padding: 8px 24px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.add-review button[type="submit"]:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.reviews-list {
  display: grid;
  gap: 16px;
}

.review-card {
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.review-author {
  font-weight: bold;
  color: #333;
}

.review-rating {
  color: #ddd;
}

.review-rating .filled {
  color: #ffd700;
}

.review-comment {
  color: #666;
  line-height: 1.5;
}

.no-reviews {
  text-align: center;
  padding: 32px;
  color: #666;
  background: #f8f8f8;
  border-radius: 8px;
}
</style> 