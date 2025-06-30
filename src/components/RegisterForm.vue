<template>
  <div class="register-form">
    <h2>Registro</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Nome:</label>
        <input
          type="text"
          id="name"
          v-model="name"
          required
          placeholder="Seu nome"
        />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          placeholder="Seu email"
        />
      </div>

      <div class="form-group">
        <label for="password">Senha:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="Sua senha"
        />
      </div>

      <div v-if="store.error" class="error">
        {{ store.error }}
      </div>

      <button type="submit" :disabled="store.loading">
        {{ store.loading ? 'Registrando...' : 'Registrar' }}
      </button>

      <p class="login-link">
        Já tem uma conta?
        <router-link to="/login">Faça login</router-link>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const store = useAuthStore();

const name = ref('');
const email = ref('');
const password = ref('');

async function handleSubmit() {
  try {
    await store.register({
      nome: name.value,
      email: email.value,
      senha: password.value
    });
    router.push('/');
  } catch (err) {
    // Error is handled by the store
  }
}
</script>

<style scoped>
.register-form {
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 24px;
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #666;
}

input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: var(--primary-color);
}

button {
  width: 100%;
  padding: 12px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover:not(:disabled) {
  background: #45a049;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.error {
  color: #ff4d4d;
  margin-bottom: 16px;
  text-align: center;
}

.login-link {
  margin-top: 16px;
  text-align: center;
  color: #666;
}

.login-link a {
  color: var(--primary-color);
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
  margin: 0;
}
</style> 