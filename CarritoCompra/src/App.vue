<template>
  <div class="container mt-4">
    <h1 class="mb-4">🛒 Carrito de Compras</h1>

    <ListaProductos
      :productos="productos"
      @agregar-al-carrito="actualizarTotal"
      @restar-producto="eliminarProducto"
    />

    <!-- Resumen del carrito -->
    <div class="mt-4">
      <h4>Resumen del carrito</h4>
      <ul class="list-group">
        <li
          v-for="producto in productosEnCarrito"
          :key="producto.id"
          class="list-group-item d-flex justify-content-between"
        >
          <span>{{ producto.nombre }} x{{ producto.cantidad }}</span>
          <span>${{ producto.precio * producto.cantidad }}</span>
        </li>
      </ul>
      <h5 class="mt-3 text-end">
        Total: <span class="text-success">${{ total }}</span>
      </h5>
    </div>
  </div>
</template>

<script>
import ListaProductos from './components/ListaProductos.vue'

export default {
  name: 'App',
  components: { ListaProductos },
  data() {
    return {
      total: 0,
      productos: [
        { id: 1, nombre: 'Teclado', precio: 5000 },
        { id: 2, nombre: 'Mouse', precio: 5000 },
        { id: 3, nombre: 'Monitor', precio: 80000 },
        { id: 4, nombre: 'Audífonos', precio: 30000 },
      ],
      carrito: [], // [{ id, nombre, precio, cantidad }]
    }
  },
  computed: {
    productosEnCarrito() {
      return this.carrito.filter((p) => p.cantidad > 0)
    },
  },
  methods: {
    actualizarTotal(precio, id) {
      this.total += precio

      const enCarrito = this.carrito.find((p) => p.id === id)
      if (enCarrito) {
        enCarrito.cantidad++
      } else {
        const producto = this.productos.find((p) => p.id === id)
        this.carrito.push({ ...producto, cantidad: 1 })
      }
    },
    eliminarProducto(precio, id) {
      if (this.total - precio >= 0) {
        this.total -= precio
      }

      const enCarrito = this.carrito.find((p) => p.id === id)
      if (enCarrito && enCarrito.cantidad > 0) {
        enCarrito.cantidad--
      }
    },
  },
}
</script>
