<template>
  <div class="filme-detalhe">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else-if="filme" class="filme-content">
      <div class="filme-header">
        <h1>{{ filme.titulo }}</h1>
        <div class="filme-meta">
          <span class="ano">{{ filme.ano }}</span>
          <span class="duracao">{{ filme.duracao }} min</span>
          <span class="classificacao">{{ filme.classificacao }}</span>
        </div>
      </div>

      <div class="filme-body">
        <div class="poster">
          <img :src="filme.poster" :alt="filme.titulo">
        </div>
        <div class="info">
          <div class="sinopse">
            <h2>Sinopse</h2>
            <p>{{ filme.sinopse }}</p>
          </div>
          
          <div class="detalhes">
            <div class="detalhe-item">
              <h3>Diretor</h3>
              <p>{{ filme.diretor }}</p>
            </div>
            <div class="detalhe-item">
              <h3>Elenco</h3>
              <p>{{ filme.elenco.join(', ') }}</p>
            </div>
            <div class="detalhe-item">
              <h3>Gêneros</h3>
              <p>{{ filme.generos.join(', ') }}</p>
            </div>
            <div class="detalhe-item">
              <h3>País</h3>
              <p>{{ filme.pais }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getFilme } from '../services/filmeService'
import type { Filme } from '../types/filme'

const route = useRoute()
const filme = ref<Filme | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const id = route.params.id as string
    filme.value = await getFilme(id)
  } catch (err) {
    error.value = 'Erro ao carregar detalhes do filme'
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.filme-detalhe {
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

.filme-header {
  margin-bottom: 2rem;
}

.filme-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.filme-meta {
  display: flex;
  gap: 1rem;
  color: var(--text-secondary);
}

.filme-body {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
}

.poster img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.sinopse h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.sinopse p {
  line-height: 1.6;
  color: var(--text-secondary);
}

.detalhes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.detalhe-item h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.detalhe-item p {
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .filme-body {
    grid-template-columns: 1fr;
  }

  .poster {
    max-width: 300px;
    margin: 0 auto;
  }
}
</style> 