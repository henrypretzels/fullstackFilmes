<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h2>{{ isLogin ? 'Login' : 'Registro' }}</h2>
        <button class="toggle-auth" @click="toggleAuthMode">
          {{ isLogin ? 'Criar uma conta' : 'Já tenho uma conta' }}
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="auth-form">
        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div class="form-group" v-if="!isLogin">
          <label for="nome">Nome</label>
          <input
            type="text"
            id="nome"
            v-model="form.nome"
            required
            placeholder="Seu nome"
            :disabled="loading"
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            required
            placeholder="Seu email"
            :disabled="loading"
          />
        </div>

        <div class="form-group">
          <label for="password">Senha</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            required
            placeholder="Sua senha"
            :disabled="loading"
          />
        </div>

        <button type="submit" class="submit-button" :disabled="loading">
          {{ loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Registrar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { authService, type LoginRequest, type RegisterRequest } from '@/services/auth.service'

interface AuthForm {
  nome: string
  email: string
  password: string
}

const router = useRouter()
const isLogin = ref(true)
const error = ref<string>('')
const loading = ref(false)

const form = reactive<AuthForm>({
  nome: '',
  email: '',
  password: '',
})

const toggleAuthMode = () => {
  isLogin.value = !isLogin.value
  form.nome = ''
  form.email = ''
  form.password = ''
  error.value = ''
}

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = ''

    if (isLogin.value) {
      const { token, user } = await authService.login({
        email: form.email,
        password: form.password,
      })
      console.log('User logged in:', user)
    } else {
      const { token, user } = await authService.register({
        nome: form.nome,
        email: form.email,
        password: form.password,
      })
      console.log('User registered:', user)
    }

    router.push('/')
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Erro na autenticação. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.auth-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-header h2 {
  color: #333;
  margin-bottom: 1rem;
}

.toggle-auth {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 0.9rem;
  text-decoration: underline;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #555;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.submit-button {
  background-color: #007bff;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: #0056b3;
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
  margin-bottom: 1rem;
  text-align: center;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 1.5rem;
  }
}
</style>
