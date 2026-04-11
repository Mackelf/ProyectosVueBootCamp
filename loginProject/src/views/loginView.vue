<template>
  <div class="contenedor">
    <h1>Login</h1>

    <form @submit.prevent="ingresar">
      <div>
        <label>Email</label>
        <input type="email" v-model="email" />
      </div>

      <div>
        <label>Password</label>
        <input type="password" v-model="password" />
      </div>

      <button type="submit">Ingresar</button>
    </form>

    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return { email: '', password: '' }
  },
  computed: {
    error() {
      return this.$store.getters['auth/mensajeError']
    },
  },
  methods: {
    async ingresar() {
      const ok = await this.$store.dispatch('auth/login', {
        email: this.email,
        password: this.password,
      })

      if (ok) {
        this.$router.push('/home')
      }
    },
  },
}
</script>

<style>
.contenedor {
  max-width: 400px;
  margin: 40px;
}

input {
  width: 100%;
  margin-bottom: 20px;
}

button {
  margin-top: 25px;
}
</style>