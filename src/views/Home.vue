<template>
  <div class="home">
    <div v-if="!isAuthenticated" class="welcome-section">
      <h1>Bem-vindo ao Catálogo de Filmes</h1>
      <p>Descubra, avalie e favorite seus filmes preferidos.</p>
      <div class="auth-buttons">
        <router-link to="/auth" class="auth-button login">Login</router-link>
        <router-link to="/auth" class="auth-button register">Criar Conta</router-link>
      </div>
    </div>
    <div v-else>
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
      </div>
      <div v-else-if="error" class="error">
        {{ error }}
      </div>
      <div v-else>
        <h1 class="titulo">Gêneros</h1>
        <div class="filmes-grid">
          <div v-for="genero in generos" :key="genero.id" class="filme-card">
            <router-link :to="{ name: 'genero', params: { genero: genero.nome }}">
              <div class="genero-info">
                <h3>{{ genero.nome }}</h3>
                <div class="filme-meta">
                  <span>{{ genero.quantidade }} filmes</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { filmesService } from '../services/filmes.service'
import type { Genero } from '../services/filmes.service'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)

const generos = ref<Genero[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  if (isAuthenticated.value) {
    try {
      generos.value = await filmesService.listarGeneros()
    } catch (err) {
      error.value = 'Erro ao carregar gêneros'
      console.error(err)
    } finally {
      loading.value = false
    }
  } else {
    loading.value = false
  }
})
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.welcome-section {
  text-align: center;
  padding: 4rem 1rem;
}

.welcome-section h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.welcome-section p {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.auth-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.auth-button {
  padding: 0.75rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
}

.auth-button.login {
  background-color: var(--primary-color, #007bff);
  color: white;
}

.auth-button.register {
  border: 2px solid var(--primary-color, #007bff);
  color: var(--primary-color, #007bff);
}

.auth-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.filme-card:hover {
  transform: translateY(-4px);
}

.filme-card a {
  text-decoration: none;
  color: inherit;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.genero-info {
  padding: 1rem;
  text-align: center;
}

.genero-info h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  color: var(--text-color);
  text-transform: capitalize;
}

.filme-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  justify-content: center;
}

@media (max-width: 768px) {
  .filmes-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
}
</style>
