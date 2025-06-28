<template>
  <div class="admin-container">
    <h1>Painel Administrativo</h1>
    
    <div class="admin-section">
      <h2>Adicionar Novo Filme</h2>
      <form @submit.prevent="handleSubmit" class="admin-form">
        <div class="form-group">
          <label for="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            v-model="form.titulo"
            required
            placeholder="Título do filme"
          />
        </div>

        <div class="form-group">
          <label for="imagemUrl">URL da Imagem:</label>
          <input
            type="url"
            id="imagemUrl"
            v-model="form.imagemUrl"
            required
            placeholder="URL do poster do filme"
          />
        </div>

        <div class="form-group">
          <label for="sinopse">Sinopse:</label>
          <textarea
            id="sinopse"
            v-model="form.sinopse"
            required
            placeholder="Sinopse do filme"
            rows="4"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="ano">Ano de Lançamento:</label>
          <input
            type="number"
            id="ano"
            v-model="form.ano"
            required
            min="1900"
            max="2024"
          />
        </div>

        <div class="form-group">
          <label for="generos">Gêneros:</label>
          <div class="multi-select">
            <div class="selected-genres">
              <span v-for="(genre, idx) in form.generos" :key="genre" class="genre-chip">
                {{ genre }}
                <button type="button" @click="removeGenre(idx)">×</button>
              </span>
            </div>
            <input
              type="text"
              v-model="genreInput"
              @keydown.enter.prevent="addGenre"
              @keydown.tab.prevent="addGenre"
              list="genre-list"
              placeholder="Adicionar ou selecionar gênero"
            />
            <datalist id="genre-list">
              <option v-for="genre in availableGenres" :key="genre" :value="genre" />
            </datalist>
            <button type="button" @click="addGenre" class="add-genre-btn">Adicionar</button>
          </div>
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button type="submit" class="submit-button" :disabled="loading">
          {{ loading ? 'Adicionando...' : 'Adicionar Filme' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useMovieStore } from '@/stores/movieStore'
import { movieService, type CreateMovieRequest } from '@/services/api'
import type { Movie } from '@/types/movie'

const router = useRouter()
const authStore = useAuthStore()
const movieStore = useMovieStore()
const loading = ref(false)
const error = ref<string>('')

interface MovieForm {
  titulo: string
  imagemUrl: string
  sinopse: string
  ano: number
  generos: string[]
}

const form = reactive<MovieForm>({
  titulo: '',
  imagemUrl: '',
  sinopse: '',
  ano: new Date().getFullYear(),
  generos: []
})

// Extract available genres from all movies in the store
const availableGenres = computed(() => {
  const genreSet = new Set<string>()
  movieStore.movies.forEach((movie: Movie) => {
    movie.generos.forEach((g: string) => genreSet.add(g))
  })
  return Array.from(genreSet).sort()
})
const genreInput = ref('')

function addGenre() {
  const genre = genreInput.value.trim()
  if (genre && !form.generos.includes(genre)) {
    form.generos.push(genre)
  }
  genreInput.value = ''
}

function removeGenre(idx: number) {
  form.generos.splice(idx, 1)
}

async function handleSubmit() {
  try {
    loading.value = true
    error.value = ''

    const movieData: CreateMovieRequest = {
      titulo: form.titulo,
      imagemUrl: form.imagemUrl,
      ano: form.ano,
      generos: form.generos,
      sinopse: form.sinopse
    }

    await movieService.createMovie(movieData)
    
    // Refresh the movie list to include the new movie
    await movieStore.fetchMovies()
    
    // Reset form
    form.titulo = ''
    form.imagemUrl = ''
    form.sinopse = ''
    form.ano = new Date().getFullYear()
    form.generos = []
    
    router.push('/')
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Erro ao adicionar filme'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.admin-container {
  max-width: 800px;
  margin: 80px auto 40px;
  padding: 0 20px;
}

h1 {
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}

.admin-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #444;
  margin-bottom: 1.5rem;
}

.admin-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 500;
  color: #555;
}

input,
textarea {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.submit-button {
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;
}

.submit-button:hover {
  background-color: #3d8b40;
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  background-color: #fee;
  color: #c00;
  padding: 0.75rem;
  border-radius: 4px;
  margin-top: 1rem;
  text-align: center;
}

.multi-select {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}
.selected-genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.genre-chip {
  background: #e0e0e0;
  border-radius: 12px;
  padding: 0.2rem 0.7rem 0.2rem 0.7rem;
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: #444;
}
.genre-chip button {
  background: none;
  border: none;
  color: #888;
  margin-left: 0.3rem;
  cursor: pointer;
  font-size: 1.1rem;
}
.add-genre-btn {
  padding: 0.3rem 0.8rem;
  border: none;
  background: #1976d2;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
}
.add-genre-btn:hover {
  background: #125ea2;
}

@media (max-width: 480px) {
  .admin-container {
    margin-top: 60px;
  }

  .admin-section {
    padding: 1.5rem;
  }
}
</style> 