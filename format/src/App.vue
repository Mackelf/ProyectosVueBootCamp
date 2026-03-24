<template>
  <div class="container">
    <h1>Cartelera de Eventos</h1>
    
    <div class="grid">
      <EventoCard 
        v-for="evento in listaEventos" 
        :key="evento.id" 
        :nombre="evento.titulo"
        :estado="evento.estado" 
      />
    </div>

    <button @click="finalizarTodos">Finalizar todos los eventos</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import EventoCard from './components/EventoCard.vue';

// Datos reactivos: si este array cambia, la UI se actualiza sola
const listaEventos = ref([
  { id: 1, titulo: "Concierto Rock", estado: "destacado" },
  { id: 2, titulo: "Taller de Vue", estado: "proximo" },
  { id: 3, titulo: "Charla AI", estado: "finalizado" }
]);

const finalizarTodos = () => {
  listaEventos.value.forEach(e => e.estado = 'finalizado');
};
</script>