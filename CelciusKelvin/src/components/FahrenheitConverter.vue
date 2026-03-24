<template>
  <div class="converter">
    <h2>Conversión a Fahrenheit</h2>
    <p class="resultado">
      {{ celsius }}°C = <strong>{{ fahrenheit }} K</strong>
    </p>
    <p class="formula">Fórmula: K = °C * (9/5) + 32</p>
     <label for="newton"><small>Congelacion del agua son 32ºF y su ebullición a los 212ªF</small></label>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  celsius: {
    type: Number,
    default: 0
  }
})

const fahrenheit = computed(() => ((props.celsius * (9/5)) + 32).toFixed(2))
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