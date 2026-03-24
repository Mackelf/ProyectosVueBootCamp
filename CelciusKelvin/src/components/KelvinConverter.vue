<template>
  <div class="converter">
    <h2>Conversión a Kelvin</h2>
    <p class="resultado">
      {{ celsius }}°C = <strong>{{ kelvin }} K</strong>
    </p>
    <p class="formula">Fórmula: K = °C + 273.15</p>
    <label for="kelvin"><small>Escala basada en Cº, donde 0 es el cero absoluto ( -273.15 ºC)</small></label>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  celsius: {
    type: Number,
    default: 0,
  },
})

const kelvin = computed(() => (props.celsius + 273.15).toFixed(2))
</script>


<style scoped>
.converter {
  margin-top: 1.5rem;
  padding: 1rem 1.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.resultado {
  font-size: 1.4rem;
}

.formula {
  color: #888;
  font-size: 0.9rem;
}
</style>
