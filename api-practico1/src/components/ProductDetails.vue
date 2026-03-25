<template>
    <div>
        <h2>GET /products/{id}</h2>
            <div>
                <label>ID del producto</label>
                <input v-model="productId" type="number" min="1" />
            </div>
    
            <button @click="loadProduct" :disabled="loading">
                {{ loading ? 'Consultando...' : 'Obtener producto' }}
            </button>
    
            <p v-if="error">{{ error }}</p>

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
const loading = ref(false)
const error = ref(null)
const product = ref(null)

const formattedProduct = computed(() => {
    return JSON.stringify(product.value, null, 2)
})

const loadProduct = async () => {
    loading.value = true
    error.value = null
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

</script>