<template>
  <div>
    <h1>Generador de SKU</h1>

    <input v-model="producto" placeholder="Producto" />
    <input v-model="categoria" placeholder="Categoría" />
    <input v-model="marca" placeholder="Marca" />

    <button @click="procesarSKU">Generar</button>

    <div v-if="sku" class="resultado">
      <h2>SKU generado</h2>
      <p>{{ sku }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { generarSKU } from '../utils/skuGenerador'

const producto = ref('')
const categoria = ref('')
const marca = ref('')
const sku = ref('')

function procesarSKU() {
  sku.value = generarSKU(producto.value, categoria.value, marca.value)
}
</script>
