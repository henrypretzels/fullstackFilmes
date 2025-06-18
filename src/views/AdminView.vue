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
          <label for="imagem">URL da Imagem:</label>
          <input
            type="url"
            id="imagem"
            v-model="form.imagem"
            required
            placeholder="URL do poster do filme"
          />
        </div>

        <div class="form-group">
          <label for="descricao">Descrição:</label>
          <textarea
            id="descricao"
            v-model="form.descricao"
            required
            placeholder="Sinopse do filme"
            rows="4"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="anoLancamento">Ano de Lançamento:</label>
          <input
            type="number"
            id="anoLancamento"
            v-model="form.anoLancamento"
            required
            min="1900"
            max="2024"
          />
        </div>

        <div class="form-group">
          <label for="genero">Gênero:</label>
          <input
            type="text"
            id="genero"
            v-model="form.genero"
            required
            placeholder="Gênero do filme"
          />
        </div>

        <div class="form-group">
          <label for="diretor">Diretor:</label>
          <input
            type="text"
            id="diretor"
            v-model="form.diretor"
            required
            placeholder="Nome do diretor"
          />
        </div>

        <div class="form-group">
          <label for="atores">Atores (separados por vírgula):</label>
          <input
            type="text"
            id="atores"
            v-model="form.atores"
            required
            placeholder="Nome dos atores"
          />
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
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)
const error = ref<string>('')

interface MovieForm {
  titulo: string
  imagem: string
  descricao: string
  anoLancamento: number
  genero: string
  diretor: string
  atores: string
}

const form = reactive<MovieForm>({
  titulo: '',
  imagem: '',
  descricao: '',
  anoLancamento: new Date().getFullYear(),
  genero: '',
  diretor: '',
  atores: ''
})

async function handleSubmit() {
  try {
    loading.value = true
    error.value = ''

    const movieData = {
      ...form,
      atores: form.atores.split(',').map((ator: string) => ator.trim()),
      notaMedia: 0
    }

    // TODO: Implement movie creation API call
    console.log('Movie data:', movieData)
    
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

@media (max-width: 480px) {
  .admin-container {
    margin-top: 60px;
  }

  .admin-section {
    padding: 1.5rem;
  }
}
</style> 