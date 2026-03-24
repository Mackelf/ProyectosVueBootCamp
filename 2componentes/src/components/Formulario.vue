<template>
  <div class="mb-4">
    <label class="text-muted small">Formulario Generado en componente Formulario.vue</label><br>
    <label class="form-label fw-semibold text-secondary" style="font-size:.8rem;letter-spacing:.06em;text-transform:uppercase;">
      Nuevo alumno
    </label>
    <div class="input-group shadow-sm">
      <span class="input-group-text bg-white border-end-0" style="color:#6b7280;">
        👤
      </span>
      <input
        type="text"
        class="form-control border-start-0 ps-0"
        placeholder="Ingrese un nombre..."
        v-model="nuevoNombre"
        @keyup.enter="emitirNombre"
        style="border-color:#e2e8f0;"
      />
      <button
        class="btn px-4 fw-semibold"
        style="background:#1a56db;color:white;border-color:#1a56db;"
        @click="emitirNombre"
        :disabled="nuevoNombre.trim() === ''"
      >
        + Agregar
      </button>
    </div>
    <div v-if="error" class="text-danger mt-1" style="font-size:.82rem;">⚠ Ingrese un nombre válido.</div>
  </div>
</template>

<script>
export default {
  name: 'Formulario',
  emits: ['agregar-nombre'],
  data() {
    return {
      nuevoNombre: '',
      error: false,
    }
  },
  methods: {
    emitirNombre() {
      if (this.nuevoNombre.trim() === '') {
        this.error = true
        return
      }
      this.error = false
      this.$emit('agregar-nombre', this.nuevoNombre.trim())
      this.nuevoNombre = ''
    },
  },
}
</script>