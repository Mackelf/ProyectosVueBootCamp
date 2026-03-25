ProductList.vue

<template>
    <div class="card">
        <h2>GET /products</h2>
        <button @click="loadProducts" :disabled="loading">
            {{ loading ? 'Cargando...' : 'Obtener productos' }}
        </button>

        <p v-if="error" class="error">{{ error }}</p>

        <div v-if="products.length">
            <p><strong>Total:</strong> {{ products.length }}</p>

            <div class="response-box">
                <pre>{{ formattedProducts }}</pre>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                        <th>price</th>
                        <th>category</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products" :key="product.id">
                        <td>{{ product.id }}</td>
                        <td>{{ product.title }}</td>
                        <td>{{ product.price }}</td>
                        <td>{{ product.category }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const products = ref([])
const loading = ref(false)
const error = ref('')

const loadProducts = async () => {
    loading.value = true
    error.value = ''

    try {
        const response = await fetch('https://fakestoreapi.com/products')
        if (!response.ok) throw new Error('No se pudo obtener el listado de productos')
        products.value = await response.json()
    } catch (err) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}

const formattedProducts = computed(() => JSON.stringify(products.value, null, 2))
</script>

<style scoped>
.card {
    border: 1px solid #ddd;
    padding: 18px;
    border-radius: 10px;
    background: #fff;
}

button {
    margin-bottom: 14px;
    padding: 10px 14px;
    border: none;
    background: #2d6cdf;
    color: white;
    border-radius: 6px;
    cursor: pointer;
}

button:disabled {
    background: #888;
    cursor: not-allowed;
}

.response-box {
    background: #f6f6f6;
    padding: 10px;
    border-radius: 8px;
    max-height: 220px;
    overflow: auto;
    margin-bottom: 14px;
}

table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.error {
    color: #c62828;
}
</style>