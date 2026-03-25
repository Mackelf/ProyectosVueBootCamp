Smartphones.vue

<template>
    <div>
        <h2>Smartphones</h2>

        <ul>
            <li v-for="p in productos" :key="p.id">
                {{ p.title }} - {{ p.price }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const productos = ref([])

onMounted(async () => {
    const res = await axios.get('https://dummyjson.com/products/category/smartphones')

    productos.value = res.data.products
})
</script>