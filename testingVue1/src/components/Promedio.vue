<template>
  <div>
    <h2>Calculadora de Promedio</h2>

    <input type="number" v-model="numero1" placeholder="Número 1" />
    <input type="number" v-model="numero2" placeholder="Número 2" />
    <input type="number" v-model="numero3" placeholder="Número 3" />

    <button @click="calcular">Calcular</button>

    <div v-if="mostrar" class="resultado">
      <p><strong>Promedio: </strong>{{ promedio }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const numero1 = ref(null)
const numero2 = ref(null)
const numero3 = ref(null)
const mostrar = ref(false)
const promedio = ref(0)

const calcular = () => {
  if (numero1.value !== null && numero2.value !== null && numero3.value !== null) {
    const n1 = parseFloat(numero1.value)
    const n2 = parseFloat(numero2.value)
    const n3 = parseFloat(numero3.value)
    promedio.value = ((n1 + n2 + n3) / 3).toFixed(2)
    mostrar.value = true
  } else {
    mostrar.value = false
  }
}
</script>