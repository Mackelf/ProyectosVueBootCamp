<template>
  <section class="dashboard">
    <header class="dashboard-header">
      <div>
        <h1>Hola, {{ username }}</h1>
        <p>Bienvenido al panel</p>
      </div>

      <button @click="handleLogout">Salir</button>
    </header>

    <main class="dashboard-content">
      <p v-if="loading">Cargando frameworks...</p>
      <p v-else-if="error" class="error">{{ error }}</p>

      <ul v-else class="framework-list">
        <li v-for="item in items" :key="item.id">
          <strong>{{ item.name }}</strong>
          <span>{{ item.description }}</span>
        </li>
      </ul>
    </main>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UserDashboard',

  computed: {
    ...mapState('auth', ['username']),
    ...mapState('frameworks', ['items', 'loading', 'error']),
  },

  mounted() {
    this.$store.dispatch('frameworks/cargar')
  },

  methods: {
    handleLogout() {
      this.$store.dispatch('auth/doLogout')
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  padding: 2rem;
  background: #f8fafc;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.dashboard-header button {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  background: #ef4444;
  color: white;
  cursor: pointer;
}

.framework-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 1rem;
}

.framework-list li {
  padding: 1rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.framework-list span {
  display: block;
  margin-top: 0.35rem;
  color: #555;
}

.error {
  color: #d33;
}
</style>