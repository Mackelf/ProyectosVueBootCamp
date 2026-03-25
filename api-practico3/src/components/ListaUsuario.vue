<template>
  <div>
    <h2>Lista Usuario</h2>
    <div class="response-box">
    <ul>
      <li v-for="p in users" :key="p.id"> <!-- ✅ "users" en lugar de "users" que no existía -->
        {{ p.id }} - {{ p.firstName }}     <!-- ✅ eliminada la "x" al final -->
      </li>
    </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([]) // ✅ renombrada de "ListaUsuarios" a "users"

onMounted(async () => {
  try {                                            // ✅ manejo de errores agregado
    const res = await axios.get('https://dummyjson.com/users')
    users.value = res.data.users
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
  }
})
</script>
<style scoped>
.response-box {
    background: #f6f6f6;
    padding: 10px;
    border-radius: 8px;
    max-height: 220px;
    overflow: auto;
    margin-bottom: 14px;
}
</style>