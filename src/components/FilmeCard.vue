<template>
  <div class="filme-card">
    <img :src="filme.imagem" :alt="filme.titulo" class="filme-imagem" />
    <div class="filme-info">
      <h3 class="filme-titulo">{{ filme.titulo }}</h3>
      <div class="filme-nota">
        <span class="nota-valor">{{ filme.notaMedia.toFixed(1) }}</span>
        <span class="nota-maxima">/10</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Filme } from '@/services/filmes.service'

defineProps<{
  filme: Filme
}>()
</script>

<style scoped>
.filme-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.filme-card:hover {
  transform: translateY(-4px);
}

.filme-imagem {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.filme-info {
  padding: 1rem;
}

.filme-titulo {
  margin: 0;
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.filme-nota {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.nota-valor {
  font-size: 1.2rem;
  font-weight: bold;
  color: #007bff;
}

.nota-maxima {
  font-size: 0.9rem;
  color: #666;
}
</style> 