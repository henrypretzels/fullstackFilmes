<template>
  <div class="genero-view">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else>
      <h1 class="titulo">{{ genero }}</h1>
      <div class="filmes-grid">
        <div v-for="filme in filmes" :key="filme.id" class="filme-card">
          <router-link :to="{ name: 'filme', params: { id: filme.id }}">
            <img :src="filme.poster" :alt="filme.titulo">
            <div class="filme-info">
              <h3>{{ filme.titulo }}</h3>
              <div class="filme-meta">
                <span class="ano">{{ filme.ano }}</span>
                <span class="duracao">{{ filme.duracao }} min</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getFilmesPorGenero } from '../services/filmeService'
import type { Filme } from '../types/filme'

const route = useRoute()
const genero = ref(route.params.genero as string)
const filmes = ref<Filme[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    filmes.value = await getFilmesPorGenero(genero.value)
  } catch (err) {
    error.value = 'Erro ao carregar filmes do gênero'
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.genero-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.error {
  color: var(--error-color);
  text-align: center;
  padding: 2rem;
}

.titulo {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--text-color);
  text-transform: capitalize;
}

.filmes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
}

.filme-card {
  background: var(--surface-color);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filme-card:hover {
  transform: translateY(-4px);
}

.filme-card a {
  text-decoration: none;
  color: inherit;
}

.filme-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.filme-info {
  padding: 1rem;
}

.filme-info h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  color: var(--text-color);
}

.filme-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .filmes-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }

  .filme-card img {
    height: 225px;
  }
}
</style> 