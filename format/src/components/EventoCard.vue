<template>
  <div class="evento-card" :class="estado">
    <div class="contenido">
      <span class="badge">{{ estado }}</span>
      <h3>{{ nombre }}</h3>
      <p>Haz clic para ver más detalles del evento.</p>
    </div>
  </div>
</template>

<script setup>
// Definimos las props que el Padre enviará
const props = defineProps({
  nombre: {
    type: String,
    default: 'Evento sin nombre',
  },
  estado: {
    type: String,
    required: true,
    // Validamos que el estado sea uno de los tres permitidos
    validator: (value) => ['proximo', 'destacado', 'finalizado'].includes(value),
  },
})
</script>

<style scoped>
/* Estilos Base: Comunes a todas las tarjetas */
.evento-card {
  border-radius: 12px;
  padding: 1.5rem;
  background: white;
  border: 1px solid #eee;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
}

.badge {
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
  background: #eee;
}

/* --- LÓGICA DE ESTADOS (Clases Dinámicas) --- */

/* 1. DESTACADO: Mucha sombra, relieve y resalte */
.destacado {
  border-color: #ffcc00;
  box-shadow: 0 15px 30px rgba(255, 204, 0, 0.2);
  transform: translateY(-5px);
}
.destacado .badge {
  background: #ffcc00;
  color: #333;
}

/* 2. PROXIMO: Apariencia estándar, limpia */
.proximo {
  border-color: #007bff;
}
.proximo .badge {
  background: #007bff;
  color: white;
}

/* 3. FINALIZADO: Menor intensidad, opacidad reducida */
.finalizado {
  opacity: 0.6;
  filter: grayscale(0.8);
  background: #fcfcfc;
  pointer-events: none; /* Opcional: desactiva interacción */
}
.finalizado .badge {
  background: #999;
  color: white;
}
</style>
