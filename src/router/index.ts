import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/Home.vue'
import AuthView from '../views/AuthView.vue'
import GeneroView from '../views/GeneroView.vue'
import FilmeDetalhe from '../components/FilmeDetalhe.vue'
import MovieList from '@/components/MovieList.vue'
import MovieDetail from '@/components/MovieDetail.vue'
import FavoritesView from '@/views/FavoritesView.vue'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import { useAuthStore } from '@/stores/authStore'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: MovieList
  },
  {
    path: '/login',
    name: 'login',
    component: LoginForm,
    meta: { guest: true }
  },
  {
    path: '/genero/:genero',
    name: 'genero',
    component: GeneroView
  },
  {
    path: '/filme/:id',
    name: 'movie-detail',
    component: MovieDetail
  },
  {
    path: '/favoritos',
    name: 'favorites',
    component: FavoritesView,
    meta: { requiresAuth: true }
  },
  {
    path: '/registro',
    name: 'register',
    component: RegisterForm,
    meta: { guest: true }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/AdminView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = !!authStore.user
  const isAdmin = authStore.isAdmin

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else if (to.meta.requiresAdmin && !isAdmin) {
    next({ name: 'home' })
  } else if (to.meta.guest && isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
