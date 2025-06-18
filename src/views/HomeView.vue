<script setup lang="ts">
import MovieList from '@/components/MovieList.vue';
</script>

<template>
  <div class="home">
    <div class="header">
      <h1>Catálogo de Filmes</h1>
    </div>
    <MovieList />
  </div>
</template>

<style scoped>
.home {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  margin-bottom: 2rem;
  text-align: center;
}

.header h1 {
  color: #333;
  font-size: 2rem;
  margin: 0;
}

@media (max-width: 768px) {
  .home {
    padding: 1rem;
  }
}
</style>
