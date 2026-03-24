<template>
  <div>
    <!-- Tabla con datos -->
     <span class="text-muted small">Tabla generada por componente Lista.vue</span>
    <div v-if="nombres.length > 0" class="table-responsive rounded-3 overflow-hidden border" style="border-color:#e2e8f0!important;">
      <table class="table table-hover align-middle mb-0">
        <thead style="background:#f8fafc;">
          <tr>
            <th class="ps-3 text-muted fw-semibold" style="font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;width:50px;">#</th>
            <th class="text-muted fw-semibold" style="font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;">Nombre</th>
            <th class="text-muted fw-semibold text-end pe-3" style="font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(nombre, index) in nombres" :key="index">
            <td class="ps-3 text-muted fw-semibold" style="font-size:.85rem;">{{ index + 1 }}</td>
            <td>
              <div class="d-flex align-items-center gap-2">
                <div class="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white"
                  :style="`width:34px;height:34px;font-size:.8rem;background:${colores[index % colores.length]};flex-shrink:0;`">
                  {{ nombre.charAt(0).toUpperCase() }}
                </div>
                <span class="fw-medium" style="color:#1e293b;">{{ nombre }}</span>
              </div>
            </td>
            <td class="text-end pe-3">
              <button
                class="btn btn-sm px-3"
                style="background:#fff1f2;color:#e11d48;border:1px solid #fecdd3;font-size:.8rem;font-weight:600;"
                @click="$emit('eliminar-nombre', index)"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Estado vacío -->
    <div v-else class="text-center py-5 text-muted">
      <div style="font-size:2.5rem;">🎒</div>
      <p class="mt-2 mb-0">No hay alumnos en la lista.<br>
        <small>Agrega uno usando el formulario.</small>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Lista',
  props: {
    nombres: {
      type: Array,
      required: true,
    },
  },
  emits: ['eliminar-nombre'],
  data() {
    return {
      colores: ['#1a56db', '#7c3aed', '#0891b2', '#059669', '#d97706', '#dc2626'],
    }
  },
}
</script>