<template>
  <div class="container mt-4">
    
    <h1 class="mb-4">🌡️ Conversor de Temperatura</h1>
      <div class="card shadow-sm p-4">
        <div class="mb-3">
       <label class="form-label fw-semibold">  <input v-model.number="celsius" type="number" placeholder="Grados Celsius" /></label>
        
        <button @click="currentComponent = KelvinConverter">🌡️ Kelvin</button>
        <button @click="currentComponent = FahrenheitConverter">🌡️ Fahrenheit</button>
        <button @click="currentComponent = NewtonConverter">Newton</button>

        <component :is="currentComponent" :celsius="celsius"/>
        </div>
</div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import KelvinConverter from './components/KelvinConverter.vue'
import FahrenheitConverter from './components/FahrenheitConverter.vue'
import NewtonConverter from './components/NewtonConverter.vue'

const celsius = ref(0)
const currentComponent = ref(KelvinConverter)

</script>

