<template>
  <div>
    <h2>GET /products</h2>
    <button @click="loadProducts" :disabled="loading">
      {{ loading ? 'Cargando...' : 'Obtener productos' }}
    </button>

    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="limitedProducts.length">
      <p><strong>Total:</strong> {{ limitedProducts.length }}</p>

      <div class="response-box">
        <pre>{{ formattedProducts }}</pre>
      </div>

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>description</th>
            <th>category</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in limitedProducts" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.title }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const products = ref([])
const limitedProducts = computed(() => products.value.slice(0, 5))
const loading = ref(false)
const error = ref('')

const loadProducts = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await fetch('https://dummyjson.com/products')
    if (!response.ok) throw new Error('No se pudo obtener el listado de productos')
    const data = await response.json()
    products.value = data.products
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const formattedProducts = computed(() => JSON.stringify(limitedProducts.value, null, 2))
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