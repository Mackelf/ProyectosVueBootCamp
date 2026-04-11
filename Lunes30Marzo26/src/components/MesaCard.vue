<template>
  <div class="card" :class="mesa.estado.toLowerCase()">
    <div class="dot"></div>
    <div class="mesa-n">Mesa {{ mesa.id }}</div>

    <div class="cliente" :class="{ vacio: !mesa.cliente }">
      {{ mesa.cliente || 'Sin cliente' }}
    </div>

    <div class="rule"></div>
    <div class="estado-lbl">{{ mesa.estado }}</div>

    <div class="actions">
      <!-- Libre → Ocupada -->
      <template v-if="mesa.estado === 'Libre'">
        <div class="row">
          <input
            v-model="nombre"
            placeholder="Nombre del cliente"
            @keyup.enter="ocupar"
          />
          <button class="btn-add" @click="ocupar">+</button>
        </div>
      </template>

      <!-- Ocupada → Atendida -->
      <template v-else-if="mesa.estado === 'Ocupada'">
        <button class="btn-action" @click="atender">Pedido atendido</button>
      </template>

      <!-- Atendida → Libre -->
      <template v-else>
        <button class="btn-action" @click="liberar">Liberar mesa</button>
      </template>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  props: { mesa: Object },
  emits: ['cambiar'],
  setup(props, { emit }) {
    const nombre = ref('')

    const ocupar  = () => {
      if (!nombre.value.trim()) return
      emit('cambiar', { id: props.mesa.id, nuevoEstado: 'Ocupada', cliente: nombre.value.trim() })
      nombre.value = ''
    }
    const atender = () => emit('cambiar', { id: props.mesa.id, nuevoEstado: 'Atendida' })
    const liberar = () => emit('cambiar', { id: props.mesa.id, nuevoEstado: 'Libre', cliente: '' })

    return { nombre, ocupar, atender, liberar }
  }
}
</script>