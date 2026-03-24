<template>
  <div class="card shadow-sm mb-4" style="max-width: 360px">
    <div class="card-img-top text-center pt-4 bg-light d-flex align-items-center justify-content-center"
       style="height: 140px;">
      <!-- Si hay imagen personalizada, la muestra; si no, usa el slot -->
      <template v-if="imagenLocal">
        <img
          :src="imagenLocal"
          class="rounded-circle border border-3 border-secondary mb-3"
          style="width: 150px; height: 150px; object-fit: cover;"
          alt="Foto de perfil"
        />
      </template>
      <template v-else>
        <slot name="imagen" />
      </template>
    </div>

    <div class="card-body">
      <div class="mb-3">
        <slot name="info" />
      </div>

      <!-- Botón para subir imagen + input oculto -->
      <div class="text-center mb-2">
        <button class="btn btn-outline-secondary btn-sm" @click="abrirSelector">
          📷 Cambiar foto
        </button>
        <input
          ref="inputArchivo"
          type="file"
          accept="image/*"
          class="d-none"
          @change="cargarImagen"
        />
      </div>

      <div class="card-footer bg-transparent border-top-0">
        <div class="d-flex gap-2 justify-content-center w-100">
          <slot name="acciones" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const imagenLocal = ref(null)
const inputArchivo = ref(null)

function abrirSelector() {
  inputArchivo.value.click()
}

function cargarImagen(evento) {
  const archivo = evento.target.files[0]
  if (!archivo) return

  const lector = new FileReader()
  lector.onload = (e) => {
    imagenLocal.value = e.target.result // base64 de la imagen
  }
  lector.readAsDataURL(archivo)
}
</script>