<template>
  <div class="container py-5">
    <div class="card shadow-sm border-0 mx-auto" style="max-width: 420px">
      <div class="card-body p-4">
        <h1 class="h4 text-center mb-4">Calculador de descuento</h1>

        <div class="mb-3">
          <label for="cliente" class="form-label">Tipo de cliente</label>
          <select id="cliente" v-model="tipoCliente" class="form-select">
            <option value="normal">Normal</option>
            <option value="vip">VIP</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="precio" class="form-label">Precio del producto</label>
          <input
            type="number"
            id="precio"
            v-model.number="precioProducto"
            class="form-control"
            min="0"
            placeholder="Ingresa el precio"
          />
        </div>

        <button @click="calcularPrecioFinal" class="btn btn-dark w-100">
          Calcular
        </button>

        <div v-if="precioFinal !== null" class="alert alert-light text-center mt-4 mb-0">
          <strong>Precio final:</strong> {{ precioFinal }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { calcularDescuento } from "../utils/DescuentoService.js";

const tipoCliente = ref("normal");
const precioProducto = ref(0);
const precioFinal = ref(null);

const calcularPrecioFinal = () => {
  precioFinal.value = calcularDescuento(tipoCliente.value, precioProducto.value);
};
</script>
<!--
Ejercicio - Parte 1.

Desarrolle una aplicación en Vue 3 que permita registrar una solicitud 
de evaluación financiera a través de un formulario de contacto.

La aplicación debe mostrar un formulario en el que el usuario 
ingrese su información básica y algunos antecedentes necesarios para solicitar una evaluación. 
Como mínimo, el formulario debe incluir los siguientes campos: 
nombre completo, correo electrónico, teléfono, ingresos mensuales, monto que desea solicitar y tipo de trabajador.
 En este último campo, puede considerar opciones como dependiente e independiente.

Además, debe incorporar un botón para enviar o procesar la solicitud. 
Al presionar ese botón, si todos los datos obligatorios han sido completados 
correctamente, el sistema debe mostrar una previsualización de la solicitud ingresada, 
a modo de resumen. Esta previsualización debe incluir al menos el nombre del solicitante, el correo, el monto solicitado, los ingresos mensuales y el tipo de trabajador.

Si faltan datos obligatorios o si los valores numéricos no son válidos, no se debe mostrar la previsualización.

-->