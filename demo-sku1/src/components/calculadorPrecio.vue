<template>
  <div class="card">
    <h1 class="title">Calculador de Precio</h1>

    <div class="form-group">
      <label for="precioBase">Precio Base</label>
      <input
        type="number"
        id="precioBase"
        min="0"
        v-model.number="precioBase"
        placeholder="Ingresa el precio base"
      />
    </div>

    <div class="form-group">
      <label for="descuento">Descuento (%)</label>
      <input
        type="number"
        id="descuento"
        min="0"
        max="100"

        v-model.number="descuento"
        placeholder="Ingresa el descuento"
      />
    </div>

    <button @click="calcularPrecioFinal">Calcular</button>

    <p class="result">Precio Final: <span>${{ precioFinal }}</span></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { calculoFinal } from '@/utils/calculoFinal'

const precioBase = ref(0)
const descuento = ref(0)
const precioFinal = ref(0)

const calcularPrecioFinal = () => {
  precioFinal.value = calculoFinal(precioBase.value, () => descuento.value)
}
</script>

<style scoped>
.card {
  max-width: 420px;
  margin: 40px auto;
  padding: 24px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
  font-family: Arial, sans-serif;
}

.title {
  margin-bottom: 24px;
  font-size: 1.6rem;
  text-align: center;
  color: #1f2937;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;
}

label {
  margin-bottom: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
}

input {
  padding: 12px 14px;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus {
  border-color: #111827;
  box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.08);
}

button {
  width: 100%;
  margin-top: 8px;
  padding: 12px;
  background-color: #111827;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

button:hover {
  background-color: #1f2937;
}

button:active {
  transform: scale(0.98);
}

.result {
  margin-top: 22px;
  text-align: center;
  font-size: 1.05rem;
  color: #4b5563;
}

.result span {
  font-weight: 700;
  color: #111827;
}
</style>