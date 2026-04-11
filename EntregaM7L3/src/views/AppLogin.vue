<template>
  <section class="login-view">
    <div class="login-card">
      <h1>Iniciar sesión</h1>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Usuario</label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            placeholder="Ingresa tu usuario"
          />
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Ingresando...' : 'Entrar' }}
        </button>

        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppLogin',

  data() {
    return {
      form: {
        username: '',
        password: '',
      },
    }
  },

  computed: {
    ...mapState('auth', ['loading', 'error']),
  },

  methods: {
    async handleSubmit() {
      const ok = await this.$store.dispatch('auth/doLogin', {
        username: this.form.username,
        password: this.form.password,
      })

      if (ok) {
        this.$router.push('/dashboard')
      }
    },
  },
}
</script>

<style scoped>
.login-view {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #f5f5f5;
}

.login-card {
  width: 100%;
  max-width: 380px;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  width: 100%;
  padding: 0.85rem;
  border: none;
  border-radius: 8px;
  background: #42b883;
  color: white;
  font-weight: 700;
  cursor: pointer;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error {
  margin-top: 1rem;
  color: #d33;
}
</style>