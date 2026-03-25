
<template>
    <div class="card">
        <h2>POST /products</h2>

        <div class="form-group">
            <label>Title</label>
            <input v-model="form.title" type="text" />
        </div>

        <div class="form-group">
            <label>Price</label>
            <input v-model.number="form.price" type="number" step="0.01" />
        </div>

        <div class="form-group">
            <label>Description</label>
            <textarea v-model="form.description"></textarea>
        </div>

        <div class="form-group">
            <label>Image</label>
            <input v-model="form.image" type="text" />
        </div>

        <div class="form-group">
            <label>Category</label>
            <input v-model="form.category" type="text" />
        </div>

        <button @click="createProduct" :disabled="loading">
            {{ loading ? 'Enviando...' : 'Crear producto' }}
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

const loading = ref(false)
const error = ref('')
const responseData = ref(null)

const form = ref({
    title: 'Producto de prueba Vue',
    price: 99.99,
    description: 'Producto creado desde una app Vue',
    image: 'https://i.pravatar.cc',
    category: 'electronics'
})

const createProduct = async () => {
    loading.value = true
    error.value = ''
    responseData.value = null

    try {
        const response = await fetch('https://fakestoreapi.com/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form.value)
        })

        if (!response.ok) throw new Error('No se pudo crear el producto')
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

input,
textarea {
    width: 100%;
    padding: 8px;
    margin-top: 6px;
    box-sizing: border-box;
}

textarea {
    min-height: 80px;
    resize: vertical;
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
}

.error {
    color: #c62828;
}
</style>
