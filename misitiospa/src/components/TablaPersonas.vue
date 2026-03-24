<template>
  <div>
    <h2 class="mb-3">Tabla de Personas</h2>

    <div>
      <slot name="imagen"></slot>
    </div>

    <table class="table table-stripped table-bordered table-hover">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="persona in personas" :key="persona.id">
          <td>{{ persona.id }}</td>
          <td>{{ persona.nombre }}</td>
          <td>{{ persona.apellido }}</td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-primary mt-3" @click="cambioDeTitulo">Cambiar Titulo</button>
  </div>
</template>

<script>
export default {
  name: 'TablaPersonas',
  props: {
    personas: Array,
  },
  methods: {
    cambioDeTitulo() {
      this.$emit('CambioTitulo', 'Lista de Personas')
    },
  },
}
</script>
