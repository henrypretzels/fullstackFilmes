<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="app">
    <header class="header">
    <nav class="nav">
        <router-link to="/" class="logo">🎬 Filmes</router-link>
        <div class="nav-links">
          <router-link to="/" class="nav-link">Início</router-link>
          <router-link to="/favoritos" class="nav-link">Favoritos</router-link>
          <template v-if="authStore.user">
            <router-link v-if="authStore.isAdmin" to="/admin" class="nav-link">Admin</router-link>
            <button @click="handleLogout" class="nav-link logout-btn">Sair</button>
          </template>
          <template v-else>
          <router-link to="/login" class="nav-link">Login</router-link>
            <router-link to="/registro" class="nav-link">Registrar</router-link>
          </template>
      </div>
    </nav>
    </header>

    <main class="main">
      <router-view />
    </main>

    <footer class="footer">
      <p>&copy; 2024 Catálogo de Filmes. Todos os direitos reservados.</p>
    </footer>
  </div>
</template>

<style>
:root {
  --primary-color: #4CAF50;
  --text-color: #333;
  --background-color: #f5f5f5;
  --header-height: 64px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: var(--text-color);
  background-color: var(--background-color);
  line-height: 1.6;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 24px;
  align-items: center;
}

.nav-link {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: var(--primary-color);
}

.logout-btn {
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-color);
  cursor: pointer;
  padding: 0;
}

.logout-btn:hover {
  color: var(--primary-color);
}

.main {
  flex: 1;
  margin-top: var(--header-height);
  padding: 20px;
}

.footer {
  background: white;
  padding: 20px;
  text-align: center;
  color: #666;
  margin-top: auto;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav {
    flex-direction: column;
    height: auto;
    padding: 16px 20px;
  }

  .nav-links {
    margin-top: 16px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .main {
    margin-top: calc(var(--header-height) + 40px);
  }
}
</style>
