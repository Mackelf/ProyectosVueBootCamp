<template>
  <div class="hijo-card">
    <div class="hijo-header">
      <span class="badge">Hijo.vue</span>
    </div>

    <div class="mensaje-recibido">
      <p class="label">📩 Prop recibida del padre:</p>
      <p class="mensaje-texto">{{ mensaje }}</p>
    </div>

    <button class="btn-responder" @click="responder">
      💬 Responder al Padre
    </button>
  </div>
</template>

<script>
export default {
  name: 'Hijo',

  // Recibe la prop "mensaje" enviada desde Padre.vue
  props: {
    mensaje: {
      type: String,
      required: true
    }
  },

  // Define el evento que puede emitir este componente
  emits: ['respuestaHijo'],

  methods: {
    responder() {
      // Emite el evento "respuestaHijo" con un mensaje de respuesta
      this.$emit('respuestaHijo', '¡Hola Padre! Mensaje recibido desde el componente Hijo 👋')
    }
  }
}
</script>

<style scoped>
.hijo-card {
  background: linear-gradient(135deg, #e0f7fa, #b2ebf2);
  border: 2px solid #00acc1;
  border-radius: 12px;
  padding: 20px 24px;
  max-width: 400px;
  font-family: 'Segoe UI', sans-serif;
}

.hijo-header {
  margin-bottom: 16px;
}

.badge {
  background-color: #00acc1;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.mensaje-recibido {
  background: white;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
}

.label {
  font-size: 0.8rem;
  color: #607d8b;
  margin: 0 0 6px 0;
}

.mensaje-texto {
  font-size: 1rem;
  color: #263238;
  font-weight: 500;
  margin: 0;
}

.btn-responder {
  background-color: #00acc1;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}

.btn-responder:hover {
  background-color: #00838f;
  transform: translateY(-1px);
}

.btn-responder:active {
  transform: translateY(0);
}
</style>