<template>
  <div class="movie-card" @click="openPopup">
    <img :src="movie.imagemUrl" :alt="movie.titulo" class="movie-image" />
    <div class="movie-info">
      <h3>{{ movie.titulo }}</h3>
      <p class="year">{{ movie.ano }}</p>
      <div class="genres">
        <span v-for="genero in movie.generos" :key="genero" class="genre-tag">
          {{ genero }}
        </span>
      </div>
      
      <!-- Always show truncated synopsis -->
      <p class="sinopse">{{ movie.sinopse }}</p>
      
      <button 
        @click.stop="toggleFavorite"
        :class="['favorite-btn', { 'is-favorite': isFavorite }]"
      >
        {{ isFavorite ? '❤️' : '🤍' }}
      </button>
    </div>
  </div>

  <!-- Popup Modal -->
  <div v-if="isPopupOpen" class="popup-overlay" @click="closePopup">
    <div class="popup-content" @click.stop>
      <button class="popup-close" @click="closePopup">×</button>
      
      <div class="popup-header">
        <img :src="movie.imagemUrl" :alt="movie.titulo" class="popup-image" />
        <div class="popup-info">
          <h2>{{ movie.titulo }}</h2>
          <p class="year">{{ movie.ano }}</p>
          <div class="genres">
            <span v-for="genero in movie.generos" :key="genero" class="genre-tag">
              {{ genero }}
            </span>
          </div>
          <p class="full-sinopse">{{ movie.sinopse }}</p>
        </div>
      </div>
      
      <!-- Average rating -->
      <div class="rating-section">
        <div class="stars-center">
          <span class="stars">
            <span v-for="i in 5" :key="i" class="star" :class="{ empty: i > Math.round(averageRating) }">
              {{ i <= Math.round(averageRating) ? '★' : '☆' }}
            </span>
          </span>
        </div>
        <div class="rating-text">
          {{ averageRating.toFixed(1) }} ({{ reviews.length }} avaliações)
        </div>
      </div>
      
      <!-- Reviews list -->
      <div class="reviews-section">
        <h4>Avaliações</h4>
        <div v-if="loadingReviews" class="loading">Carregando avaliações...</div>
        <div v-else-if="reviewError" class="error">{{ reviewError }}</div>
        <div v-else-if="!reviews.length" class="no-reviews">
          Nenhuma avaliação ainda.
        </div>
        <div v-else class="reviews-list">
          <div v-for="review in reviews" :key="review.id" class="review-item">
            <div class="review-header">
              <span class="review-author">por <b>{{ review.autor }}</b></span>
              <span class="review-stars">
                <span v-for="i in 5" :key="i" class="star" :class="{ empty: i > review.nota }">
                  {{ i <= review.nota ? '★' : '☆' }}
                </span>
              </span>
            </div>
            <p class="review-comment">{{ review.comentario }}</p>
          </div>
        </div>
      </div>
      
      <!-- Review form for logged-in users -->
      <div v-if="isAuthenticated" class="review-form">
        <h4>Deixe sua avaliação</h4>
        <div class="rating-input">
          <span>Nota:</span>
          <div class="stars-center">
            <span class="stars">
              <span 
                v-for="i in 5" 
                :key="i" 
                class="star clickable"
                :class="{ selected: i <= userRating, empty: i > userRating }"
                @click="handleStarClick(i)"
              >
                {{ i <= userRating ? '★' : '☆' }}
              </span>
            </span>
          </div>
        </div>
        <textarea 
          v-model="userComment"
          placeholder="Escreva seu comentário..."
          class="comment-input"
          rows="3"
        ></textarea>
        <div v-if="submitError" class="error">{{ submitError }}</div>
        <button 
          @click="submitReview"
          :disabled="submitting || (!userRating && !userComment.trim())"
          class="submit-btn"
        >
          {{ submitting ? 'Enviando...' : 'Enviar Avaliação' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import type { Movie, MovieReview } from '@/types/movie';
import { useMovieStore } from '@/stores/movieStore';
import { useAuthStore } from '@/stores/authStore';

const props = defineProps<{
  movie: Movie;
}>();

const movieStore = useMovieStore();
const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);
const router = useRouter();

const isFavorite = computed(() => {
  const result = movieStore.favorites.includes(props.movie.id);
  console.log('MovieCard:', props.movie.titulo, 'movieStore.favorites:', movieStore.favorites, 'isFavorite:', result);
  return result;
});

// Popup logic
const isPopupOpen = ref(false);
const reviews = ref<MovieReview[]>([]);
const loadingReviews = ref(false);
const reviewError = ref('');

const averageRating = computed(() => {
  if (!reviews.value.length) return 0;
  return (
    reviews.value.reduce((sum: number, r: MovieReview) => sum + r.nota, 0) / reviews.value.length
  );
});

const fetchReviews = async () => {
  loadingReviews.value = true;
  reviewError.value = '';
  try {
    await movieStore.fetchMovieReviews(props.movie.id);
    reviews.value = [...movieStore.reviews];
  } catch (err: any) {
    // Handle 404 as "no reviews" rather than an error
    if (err?.response?.status === 404) {
      reviews.value = [];
      reviewError.value = '';
    } else {
      reviewError.value = 'Erro ao carregar avaliações';
      console.error('Error fetching reviews:', err);
    }
  } finally {
    loadingReviews.value = false;
  }
};

const openPopup = async () => {
  isPopupOpen.value = true;
  if (!reviews.value.length) {
    await fetchReviews();
  }
};

const closePopup = () => {
  isPopupOpen.value = false;
};

// Review form logic
const userRating = ref(0);
const userComment = ref('');
const submitting = ref(false);
const submitError = ref('');

const submitReview = async () => {
  if (!userRating.value || !userComment.value.trim()) {
    submitError.value = 'Dê uma nota e escreva um comentário.';
    return;
  }
  submitting.value = true;
  submitError.value = '';
  try {
    await movieStore.addReview(props.movie.id, {
      nota: userRating.value,
      comentario: userComment.value.trim(),
    });
    await fetchReviews();
    userRating.value = 0;
    userComment.value = '';
  } catch (err) {
    submitError.value = 'Erro ao enviar avaliação.';
  } finally {
    submitting.value = false;
  }
};

const toggleFavorite = () => {
  if (!isAuthenticated.value) {
    router.push('/login');
    return;
  }
  movieStore.toggleFavorite(props.movie.id);
};

// Add this function for the review form star click logic
function handleStarClick(i: number) {
  if (i === 1 && userRating.value === 1) {
    userRating.value = 0;
  } else {
    userRating.value = i;
  }
}
</script>

<style scoped>
.movie-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;
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
  position: relative;
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
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.favorite-btn:hover {
  transform: scale(1.1);
}

.favorite-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Popup Styles */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.popup-content {
  background: white;
  border-radius: 12px;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  width: 100%;
}

.popup-close {
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
  z-index: 10;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s;
}

.popup-close:hover {
  background: rgba(0, 0, 0, 0.1);
}

.popup-header {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 20px;
  padding: 30px;
  border-bottom: 1px solid #eee;
}

.popup-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
}

.popup-info h2 {
  margin: 0 0 10px;
  font-size: 1.8rem;
  color: #333;
}

.popup-info .year {
  color: #666;
  font-size: 1rem;
  margin: 0 0 10px;
}

.popup-info .genres {
  margin-bottom: 15px;
}

.popup-info .full-sinopse {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.rating-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 30px;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.stars-center {
  text-align: center;
  width: 100%;
}

.stars {
  display: inline-flex;
  gap: 4px;
}

.star {
  font-size: 1.4rem;
  color: #FFD700;
}

.star.empty {
  color: #000;
}

.rating-text {
  font-size: 1.1rem;
  color: #666;
  white-space: nowrap;
  margin-top: 10px;
}

.reviews-section {
  margin: 20px 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.reviews-section h4 {
  margin: 0 0 15px;
  font-size: 1.2rem;
  color: #333;
}

.reviews-list {
  max-height: 300px;
  overflow-y: auto;
}

.review-item {
  border-bottom: 1px solid #eee;
  padding: 15px 0;
}

.review-item:last-child {
  border-bottom: none;
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

.review-stars {
  display: flex;
  gap: 1px;
}

.review-stars .star {
  font-size: 1.2rem;
}

.review-comment {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
  line-height: 1.5;
}

.review-form {
  padding: 20px 30px 30px;
}

.review-form h4 {
  margin: 0 0 15px;
  font-size: 1.2rem;
  color: #333;
}

.rating-input {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  justify-content: center;
}

.star.clickable {
  cursor: pointer;
  transition: transform 0.1s;
}

.star.clickable:hover {
  transform: scale(1.1);
}

.comment-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  resize: vertical;
  margin-bottom: 15px;
  font-family: inherit;
  min-height: 80px;
}

.submit-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  display: block;
  margin: 0 auto;
  transition: background 0.2s;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.submit-btn:hover:not(:disabled) {
  background: #45a049;
}

.loading, .error, .no-reviews {
  text-align: center;
  padding: 20px;
  color: #666;
  font-style: italic;
}

.error {
  color: #ff4d4d;
}

/* Responsive design for popup */
@media (max-width: 768px) {
  .popup-overlay {
    padding: 10px;
  }
  
  .popup-content {
    max-height: 95vh;
  }
  
  .popup-header {
    grid-template-columns: 1fr;
    gap: 15px;
    padding: 20px;
  }
  
  .popup-image {
    height: 200px;
    max-width: 300px;
    margin: 0 auto;
  }
  
  .rating-section,
  .reviews-section,
  .review-form {
    margin-left: 20px;
    margin-right: 20px;
  }
}
</style> 