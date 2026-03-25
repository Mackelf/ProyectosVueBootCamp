<template>
  <div class="padre-card">
    <div class="padre-header">
      <span class="badge">Padre.vue</span>
    </div>

    <p class="prop-info">
      📤 Enviando prop a Hijo: <strong>"{{ mensajeAlHijo }}"</strong>
    </p>

    <!-- Pasa prop al Hijo y escucha el evento respuestaHijo -->
    <Hijo
      :mensaje="mensajeAlHijo"
      @respuestaHijo="recibirRespuesta"
    />

    <!-- Muestra la respuesta del hijo solo cuando existe (v-if) -->
    <div v-if="respuestaDelHijo" class="respuesta-box">
      <p class="label">📬 Respuesta recibida del Hijo:</p>
      <p class="respuesta-texto">{{ respuestaDelHijo }}</p>
    </div>
  </div>
</template>

<script>
import Hijo from './Hijo.vue'

export default {
  name: 'Padre',

  components: { Hijo },

  data() {
    return {
      mensajeAlHijo: 'Hola desde el componente padre',
      respuestaDelHijo: ''   // vacío hasta que el hijo emita el evento
    }
  },

  methods: {
    // Captura el evento "respuestaHijo" emitido por Hijo.vue
    recibirRespuesta(mensaje) {
      this.respuestaDelHijo = mensaje
    }
  },

  // ─── Hooks del ciclo de vida ───────────────────────────────────────
  mounted() {
    console.log('[Padre] mounted – el componente fue insertado en el DOM.')
  },

  updated() {
    console.log('[Padre] updated – el DOM fue actualizado (datos reactivos cambiaron).')
  },

  beforeUnmount() {
    console.log('[Padre] beforeUnmount – el componente está a punto de ser destruido.')
  }
}
</script>

<style scoped>
.padre-card {
  background: linear-gradient(135deg, #fce4ec, #f8bbd0);
  border: 2px solid #e91e63;
  border-radius: 14px;
  padding: 24px 28px;
  max-width: 480px;
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.padre-header {
  margin-bottom: 4px;
}

.badge {
  background-color: #e91e63;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.prop-info {
  font-size: 0.9rem;
  color: #37474f;
  margin: 0;
}

.respuesta-box {
  background: white;
  border-left: 4px solid #e91e63;
  border-radius: 8px;
  padding: 12px 16px;
  animation: fadeIn 0.4s ease;
}

.label {
  font-size: 0.8rem;
  color: #90a4ae;
  margin: 0 0 6px 0;
}

.respuesta-texto {
  font-size: 1rem;
  color: #1a1a2e;
  font-weight: 500;
  margin: 0;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>