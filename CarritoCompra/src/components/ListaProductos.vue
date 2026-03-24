<template>
  <div>
    <h2 class="mb-3">Productos disponibles</h2>

    <table class="table table-striped table-bordered table-hover">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productos" :key="producto.id">
          <td>{{ producto.id }}</td>
          <td>{{ producto.nombre }}</td>
          <td>${{ producto.precio }}</td>
          <td>
            <button
              class="btn btn-sm btn-success"
              @click="$emit('agregar-al-carrito', producto.precio, producto.id)"
            >
              Agregar
            </button>
            <button
              class="btn btn-sm btn-danger"
              @click="$emit('restar-producto', producto.precio, producto.id)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ListaProductos',
  props: {
    productos: Array,
  },
  emits: ['agregar-al-carrito', 'restar-producto'],
}
</script>
