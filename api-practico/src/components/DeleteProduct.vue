
<template>
    <div class="card">
        <h2>DELETE /products/{id}</h2>

        <div class="form-group">
            <label>ID del producto</label>
            <input v-model.number="productId" type="number" min="1" />
        </div>

        <button @click="deleteProduct" :disabled="loading">
            {{ loading ? 'Eliminando...' : 'Eliminar producto' }}
        </button>

        <p v-if="error" class="error">{{ error }}</p>

        <div v-if="responseData">
            <h3>Respuesta</h3>
            <div class="response-box">
                <pre>{{ formattedResponse }}</pre>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const productId = ref(1)
const loading = ref(false)
const error = ref('')
const responseData = ref(null)

const deleteProduct = async () => {
    loading.value = true
    error.value = ''
    responseData.value = null

    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId.value}`, {
            method: 'DELETE'
        })

        if (!response.ok) throw new Error('No se pudo eliminar el producto')
        responseData.value = await response.json()
    } catch (err) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}

const formattedResponse = computed(() => JSON.stringify(responseData.value, null, 2))
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
    background: #c0392b;
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
}

.error {
    color: #c62828;
}
</style>