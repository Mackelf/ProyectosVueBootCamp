
<template>
    <div class="card">
        <h2>GET /products/{id}</h2>

        <div class="form-group">
            <label>ID del producto:</label>
            <input v-model="productId" type="number" min="1" />
        </div>

        <button @click="loadProduct" :disabled="loading">
            {{ loading ? 'Consultando...' : 'Obtener producto' }}
        </button>

        <p v-if="error" class="error">{{ error }}</p>

        <div v-if="product">
            <div class="response-box">
                <pre>{{ formattedProduct }}</pre>
            </div>

            <p><strong>Title:</strong> {{ product.title }}</p>
            <p><strong>Price:</strong> {{ product.price }}</p>
            <p><strong>Description:</strong> {{ product.description }}</p>
            <p><strong>Category:</strong> {{ product.category }}</p>
            <p><strong>Image:</strong> {{ product.image }}</p>
            <img :src="product.image" alt="Producto" class="product-image" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const productId = ref(1)
const product = ref(null)
const loading = ref(false)
const error = ref('')

const loadProduct = async () => {
    loading.value = true
    error.value = ''
    product.value = null

    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId.value}`)
        if (!response.ok) throw new Error('No se pudo obtener el producto')
        product.value = await response.json()
    } catch (err) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}

const formattedProduct = computed(() => JSON.stringify(product.value, null, 2))
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

input {
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

.product-image {
    max-width: 120px;
    margin-top: 10px;
}

.error {
    color: #c62828;
}
</style>