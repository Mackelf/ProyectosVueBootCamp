<template>
  <div class="container">
    <h1>Usuarios desde API</h1>

    <p v-if="loading">Cargando usuarios...</p>
    <p v-else-if="error">{{ error }}</p>

    <ul v-else>
      <li v-for="user in users" :key="user.id" class="user-item">
        <img
          :src="'https://images.weserv.nl/?url=' + user.avatar"
          :alt="`Avatar de ${user.first_name} ${user.last_name}`"
          width="60"
          height="60"
        />
        <span>{{ user.first_name }} {{ user.last_name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ApiExample",
  data() {
    return {
      users: [],
      loading: true,
      error: null,
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        const response = await axios.get(
          " https://reqres.in/api/users?page=2",
          {
            headers: {
              "x-api-key": "reqres_637d8a32f8c14bb1950ee7ef752e2fe1",
            },
          }
        );

        this.users = response.data.data;
      } catch (error) {
        this.error = "No se pudieron cargar los usuarios";
        console.error("Error detallado:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 40px auto;
  padding: 24px;
  font-family: Arial, sans-serif;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

img {
  border-radius: 50%;
  border: 2px solid #4f96c0;
  background: #eee;
}
</style>
