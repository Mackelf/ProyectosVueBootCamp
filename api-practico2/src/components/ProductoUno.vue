
ProductoUno.vue

<template>
    <div>
        <h2>Producto 1</h2>

        <p>{{ producto.title }}</p>
        <p>{{ producto.price }}</p>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const producto = ref({})

onMounted(async () => {
    const res = await axios.get('https://dummyjson.com/products/1')

    producto.value = res.data
})
</script>