<template>
  <div class="home-layout">
    <!-- Header Section -->
    <header class="site-header">
      <div class="header-container">
        <div class="site-logo">MMFILMESHD</div>
        <nav class="header-nav">
          <a href="#">Assistir Filmes Online</a>
          <a href="#">Séries Online</a>
          <a href="#">Filmes Grátis</a>
        </nav>
        <div class="header-search">
          <input
            type="text"
            placeholder="Faça a busca por filmes em todo o site"
            v-model="searchQuery"
            @keyup.enter="searchMovies"
          />
          <button @click="searchMovies"><i class="fas fa-search"></i></button>
        </div>
      </div>
    </header>

    <!-- Main Content Area - Category Grid -->
    <main class="main-content">
      <h2>Categorias</h2>
      <div class="categories-grid">
        <div class="category-card">
          <img src="https://via.placeholder.com/300x200?text=Lançamentos" alt="Lançamentos">
          <div class="category-info">
            <h3>Lançamentos</h3>
            <p>1030 Filmes</p>
          </div>
        </div>
        <div class="category-card">
           <img src="https://via.placeholder.com/300x200?text=Séries" alt="Séries">
          <div class="category-info">
            <h3>Séries</h3>
            <p>766 Séries</p>
          </div>
        </div>
         <div class="category-card">
           <img src="https://via.placeholder.com/300x200?text=Novos+Filmes" alt="Novos Filmes">
          <div class="category-info">
            <h3>Novos Filmes</h3>
            <p>3767 Filmes</p>
          </div>
        </div>
         <div class="category-card">
           <img src="https://via.placeholder.com/300x200?text=Ação" alt="Ação">
          <div class="category-info">
            <h3>Ação</h3>
            <p>1046 Filmes</p>
          </div>
        </div>
         <div class="category-card">
           <img src="https://via.placeholder.com/300x200?text=Animação" alt="Animação">
          <div class="category-info">
            <h3>Animação</h3>
            <p>359 Filmes</p>
          </div>
        </div>
         <div class="category-card">
           <img src="https://via.placeholder.com/300x200?text=Animes" alt="Animes">
          <div class="category-info">
            <h3>Animes</h3>
            <p>31 Animes</p>
          </div>
        </div>
         <div class="category-card">
           <img src="https://via.placeholder.com/300x200?text=Aventura" alt="Aventura">
          <div class="category-info">
            <h3>Aventura</h3>
            <p>662 Filmes</p>
          </div>
        </div>
         <div class="category-card">
           <img src="https://via.placeholder.com/300x200?text=Comédia" alt="Comédia">
          <div class="category-info">
            <h3>Comédia</h3>
            <p>1147 Filmes</p>
          </div>
        </div>
         <div class="category-card">
           <img src="https://via.placeholder.com/300x200?text=Doramas" alt="Doramas">
          <div class="category-info">
            <h3>Doramas</h3>
            <p>29 Séries</p>
          </div>
        </div>
         <div class="category-card">
           <img src="https://via.placeholder.com/300x200?text=Drama" alt="Drama">
          <div class="category-info">
            <h3>Drama</h3>
            <p>1897 Filmes</p>
          </div>
        </div>
         <div class="category-card">
           <img src="https://via.placeholder.com/300x200?text=Fantasia" alt="Fantasia">
          <div class="category-info">
            <h3>Fantasia</h3>
            <p>520 Filmes</p>
          </div>
        </div>
         <div class="category-card">
           <img src="https://via.placeholder.com/300x200?text=F.+Científica" alt="F. Científica">
          <div class="category-info">
            <h3>F. Científica</h3>
            <p>494 Filmes</p>
          </div>
        </div>
        <div class="category-card">
           <img src="https://via.placeholder.com/300x200?text=Guerra" alt="Guerra">
          <div class="category-info">
            <h3>Guerra</h3>
            <p>89 Filmes</p>
          </div>
        </div>
        <div class="category-card">
           <img src="https://via.placeholder.com/300x200?text=Policial" alt="Policial">
          <div class="category-info">
            <h3>Policial</h3>
            <p>128 Filmes</p>
          </div>
        </div>
        <div class="category-card">
           <img src="https://via.placeholder.com/300x200?text=Romance" alt="Romance">
          <div class="category-info">
            <h3>Romance</h3>
            <p>484 Filmes</p>
          </div>
        </div>
        <div class="category-card">
           <img src="https://via.placeholder.com/300x200?text=Suspense" alt="Suspense">
          <div class="category-info">
            <h3>Suspense</h3>
            <p>1070 Filmes</p>
          </div>
        </div>
        <div class="category-card">
           <img src="https://via.placeholder.com/300x200?text=Terror" alt="Terror">
          <div class="category-info">
            <h3>Terror</h3>
            <p>634 Filmes</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Movie Search Results Section -->
    <section v-if="searchResults.length > 0" class="search-results-section">
        <h2>Resultados da Busca</h2>
        <div class="search-results">
          <div v-for="movie in searchResults" :key="movie.id" class="movie-card">
            <div class="movie-poster-container">
              <img :src="movie.poster" :alt="movie.title" class="movie-poster">
              <button
                class="favorite-button"
                :class="{ 'is-favorite': isFavorite(movie.id) }"
                @click="toggleFavorite(movie)"
              >
                <i class="fas" :class="isFavorite(movie.id) ? 'fa-heart' : 'fa-heart'"></i>
              </button>
            </div>
            <div class="movie-info">
              <h3>{{ movie.title }}</h3>
              <p>{{ movie.year }}</p>
            </div>
          </div>
        </div>
      </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { defineOptions } from 'unplugin-vue-define-options/macros'

// Definir o nome do componente
defineOptions({
  name: 'HomeView'
})

interface Movie {
  id: number
  title: string
  year: string
  poster: string
}

const searchQuery = ref('')
const searchResults = ref<Movie[]>([])
const favoriteMovies = ref<Movie[]>([])

// Carregar filmes favoritos do localStorage ao iniciar
onMounted(() => {
  const savedFavorites = localStorage.getItem('favoriteMovies')
  if (savedFavorites) {
    favoriteMovies.value = JSON.parse(savedFavorites)
  }
})

const searchMovies = async () => {
  if (!searchQuery.value.trim()) return

  try {
    // Aqui você pode implementar a chamada à API de filmes
    // Por enquanto, vamos simular alguns resultados
    searchResults.value = [
      {
        id: 1,
        title: 'Exemplo de Filme 1',
        year: '2024',
        poster: 'https://via.placeholder.com/150x225'
      },
      {
        id: 2,
        title: 'Exemplo de Filme 2',
        year: '2023',
        poster: 'https://via.placeholder.com/150x225'
      }
    ]
  } catch (error) {
    console.error('Erro ao buscar filmes:', error)
  }
}

const isFavorite = (movieId: number): boolean => {
  return favoriteMovies.value.some((movie: Movie) => movie.id === movieId)
}

const toggleFavorite = (movie: Movie) => {
  const index = favoriteMovies.value.findIndex((m: Movie) => m.id === movie.id)

  if (index === -1) {
    // Adicionar aos favoritos
    favoriteMovies.value.push(movie)
  } else {
    // Remover dos favoritos
    favoriteMovies.value.splice(index, 1)
  }

  // Salvar no localStorage
  localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies.value))
}
</script>

<style scoped>
.home-layout {
  font-family: sans-serif;
  background-color: #1a1a1a;
  color: #fff;
}

.site-header {
  background-color: #c0392b;
  padding: 10px 20px;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 20px;
}

.site-logo {
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
}

.header-nav a {
  color: white;
  text-decoration: none;
  margin-right: 15px;
  font-size: 1rem;
}

.header-nav a:hover {
  text-decoration: underline;
}

.header-search {
  display: flex;
  flex-grow: 1;
  max-width: 400px;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
}

.header-search input {
  border: none;
  padding: 10px 15px;
  flex-grow: 1;
  font-size: 1rem;
  outline: none;
}

.header-search button {
  background-color: #f39c12;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  color: white;
  font-size: 1rem;
}

.header-search button:hover {
  background-color: #e67e22;
}

.main-content {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.main-content h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: white;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 15px;
}

.category-card {
  background-color: #333;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
}

.category-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
}

.category-info {
  padding: 10px;
  text-align: center;
}

.category-info h3 {
  margin: 0 0 5px 0;
  font-size: 1.1rem;
  color: white;
}

.category-info p {
  margin: 0;
  font-size: 0.9rem;
  color: #bbb;
}

.search-results-section {
  padding: 20px;
  max-width: 1200px;
  margin: 20px auto;
}

.search-results-section h2 {
   font-size: 1.8rem;
  margin-bottom: 20px;
  color: white;
}

.search-results {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.movie-card {
   background-color: #333;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease;
}

.movie-card:hover {
   transform: translateY(-5px);
}

.movie-poster-container {
  position: relative;
}

.movie-poster {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
}

.favorite-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
}

.favorite-button i {
  font-size: 1rem;
  color: #ccc;
  transition: all 0.3s ease;
}

.favorite-button:hover i {
  color: white;
}

.favorite-button.is-favorite i {
  color: #ff4d4d;
}

.movie-info {
  padding: 10px;
}

.movie-info h3 {
  margin: 0 0 5px 0;
  font-size: 1.1rem;
  color: white;
}

.movie-info p {
  margin: 0;
  font-size: 0.9rem;
  color: #bbb;
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    gap: 10px;
  }

  .header-nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  .header-nav a {
    margin-right: 0;
  }

  .header-search {
    width: 100%;
    max-width: none;
  }

  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .search-results {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
