<template>
  <div class="min-vh-100" style="background: #f0f4f8;">
    <div class="container py-5" style="max-width: 680px;">

      <!-- Header -->
      <div class="text-center mb-5">
        <div class="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
          style="width:64px;height:64px;background:#1a56db;">
          <span style="font-size:1.8rem;">📋</span>
        </div>
        <h1 class="fw-bold mb-1" style="color:#1e293b;letter-spacing:-0.5px;">Lista de Asistencia</h1>
        <p class="text-muted mb-0">Gestiona los alumnos de tu clase</p>
      </div>

      <!-- Card principal -->
      <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div class="card-body p-4">
          <Formulario @agregar-nombre="agregarNombre" />
          <Lista :nombres="nombres" @eliminar-nombre="eliminarNombre" />
        </div>
      </div>

      <!-- Footer contador -->
      <p class="text-center text-muted mt-3" style="font-size:.85rem;">
        {{ nombres.length }} alumno{{ nombres.length !== 1 ? 's' : '' }} en lista
      </p>

    </div>
  </div>
</template>

<script>
import Formulario from './components/Formulario.vue'
import Lista from './components/Lista.vue'

export default {
  name: 'App',
  components: { Formulario, Lista },
  data() {
    return {
      nombres: ['Andrés', 'Bruno', 'Carlos', 'Diego'],
    }
  },
  methods: {
    agregarNombre(nombre) {
      this.nombres.push(nombre)
    },
    eliminarNombre(index) {
      this.nombres.splice(index, 1)
    },
  },
}
</script>