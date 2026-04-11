<template>
  <div class="container">
    <h2>Calculadora de Encomienda</h2>

    <div class="campo">
      <label>Destinatario</label>
      <input type="text" v-model="nombre" placeholder="Nombre Destinatario" />
    </div>

    <div class="campo">
      <label>Peso</label>
      <div class="peso-row">
        <input type="number" v-model="peso" placeholder="0" min="1" />
        <span>KG</span>
      </div>
    </div>

    <div class="campo">
      <label>Tipo de envío</label>
      <select v-model="servicio">
        <option value="">Seleccione tipo de envío</option>
        <option value="normal">Normal</option>
        <option value="express">Express</option>
      </select>
    </div>

    <p v-if="error" class="error">Llene todos los campos</p>

    <button @click="calcular">Calcular</button>

    <div v-if="mostrar" class="resultado">
      <p><strong>Destinatario: </strong>{{ nombre }}</p>
      <p><strong>Tipo de envío: </strong>{{ servicio }}</p>
      <p><strong>Costo total: </strong>${{ costo }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const nombre = ref('')
const peso = ref(null)
const servicio = ref('')
const mostrar = ref(false)
const costo = ref(0)
const error = ref(false)

const calcular = () => {
  if (nombre.value.trim() !== '' && peso.value !== null && peso.value !== '' && servicio.value !== '') {
    const p = parseFloat(peso.value)
    const tarifa = servicio.value === 'express' ? 1500 : 1000
    let total = p * tarifa
    if (p > 10) total += 2000
    costo.value = total
    mostrar.value = true
    error.value = false
  } else {
    mostrar.value = false
    error.value = true
  }
}
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-family: sans-serif;
}

h2 {
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.campo {
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;
}

.campo label {
  font-size: 13px;
  color: #555;
  margin-bottom: 4px;
}

input, select {
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
}

input:focus, select:focus {
  border-color: #4a90e2;
}

.peso-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.peso-row input {
  flex: 1;
}

.peso-row span {
  font-size: 13px;
  color: #666;
}

.error {
  color: #e03c3c;
  font-size: 13px;
  margin-bottom: 8px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
}

button:hover {
  background-color: #357abd;
}

.resultado {
  margin-top: 20px;
  padding: 14px;
  background-color: #f0f7ff;
  border-left: 4px solid #4a90e2;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
}

.resultado p {
  margin: 4px 0;
}
</style>