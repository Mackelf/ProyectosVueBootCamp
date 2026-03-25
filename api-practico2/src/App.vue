App.vue

<template>
  <div>
    <h1>Ejemplo con AXIOS</h1>

    <Listado />
    <ProductoUno />
    <Smartphones />

  </div>
</template>

<script>
import Listado from './components/Listado.vue'
import ProductoUno from './components/ProductoUno.vue'
import Smartphones from './components/Smartphones.vue'

export default {
  components: {
    Listado,
    ProductoUno,
    Smartphones
  }
}
</script>

----
