<template>
  <div class="converter">
    <h2>Conversión a Newton</h2>
    <p class="resultado">
      {{ celsius }}°C = <strong>{{ newton }} K</strong>
    </p>
    <p class="formula">Fórmula: N = °C * (33/100)</p>
    <label for="newton"><small>0 Fusion con la nieve. 33º corresponde a la ebullicion 100ºC</small></label>
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

const newton = computed(() => (props.celsius * (33 / 100)).toFixed(2))
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
