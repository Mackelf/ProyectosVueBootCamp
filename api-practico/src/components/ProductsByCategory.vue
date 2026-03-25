
<template>
    <div class="card">
        <h2>GET /products/category/{category}</h2>

        <div class="form-group">
            <label>Categoría:</label>
            <select v-model="category">
                <option value="electronics">electronics</option>
                <option value="jewelery">jewelery</option>
                <option value="men's clothing">men's clothing</option>
                <option value="women's clothing">women's clothing</option>
            </select>
        </div>

        <button @click="loadByCategory" :disabled="loading">
            {{ loading ? 'Consultando...' : 'Filtrar productos' }}
        </button>

        <p v-if="error" class="error">{{ error }}</p>

        <div v-if="products.length">
            <p><strong>Resultados:</strong> {{ products.length }}</p>

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

const category = ref('electronics')
const products = ref([])
const loading = ref(false)
const error = ref('')

const loadByCategory = async () => {
    loading.value = true
    error.value = ''
    products.value = []

    try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category.value)}`)
        if (!response.ok) throw new Error('No se pudo filtrar por categoría')
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

.form-group {
    margin-bottom: 12px;
}

select {
    width: 100%;
    padding: 8px;
    margin-top: 6px;
    box-sizing: border-box;
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
