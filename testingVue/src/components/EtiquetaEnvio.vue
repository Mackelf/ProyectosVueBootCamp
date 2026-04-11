<template>
    <div>
        <h2>Formulario Envio</h2>
        <input v-model="nombre" placeholder="Nombre">
        <input v-model="direccion" placeholder="Direccion">
        <input v-model="ciudad" placeholder="Ciudad">

        <button @click="generar">Generar Etiqueta</button>

        <div v-if="mostrar" class="etiqueta">
            <h3>Etiqueta de Envío</h3>
            <p><strong>Nombre: </strong>{{ nombre }}</p>
            <p><strong>Direccion: </strong>{{ direccion }}</p>
            <p><strong>Ciudad: </strong>{{ ciudad }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const nombre = ref('')
const direccion = ref('')
const ciudad = ref('')
const mostrar = ref(false)

const generar = () => {
    if (nombre.value && direccion.value && ciudad.value) {
        mostrar.value = true
    } else {
        alert('Por favor, complete todos los campos')
    }
}
</script>