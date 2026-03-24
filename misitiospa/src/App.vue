<template>
  <div class="container mt-4">
    <h1 class="mb-4">{{ titulo }}</h1>

    <p class="text-muted">Total personas: {{ personas.length }}</p>

    <TablaPersonas :personas="personas" @cambioTitulo="actualizarTitulo">
      <template #imagen>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1wzm84nfjaGTJHddxE24A0ISxcwrsMXR5vg&s">
      </template>
    </TablaPersonas>

    <hr class="mt-4">

    <component :is="componenteActual" :msg="mensaje" />

    <button class="btn btn-primary mt-4" @click="cambiarPagina">Cambiar página</button>


  </div>
</template>

<script>
import TablaPersonas from './components/TablaPersonas.vue'
import Test from './components/Test.vue'
import Test2 from './components/Test1.vue'

export default {
  name: 'App',
  components: {
    TablaPersonas,
    Test,
    Test2
  },
  data() {
    return {
      titulo: 'Componentización en Vue',
      mensaje: 'Este es un mensaje para Test',
      componenteActual: 'Test',
      personas: [
        { id: 1, nombre: 'Blanca', apellido: 'Nieves' },
        { id: 2, nombre: 'Diego', apellido: 'Pino' },
        { id: 3, nombre: 'Andrea', apellido: 'Bouffanais' }
      ]
    }
  },
  methods: {
    actualizarTitulo(nuevoTitulo) {
      this.titulo = nuevoTitulo
    },
    cambiarPagina() {
      if (this.componenteActual === 'Test') {
        this.componenteActual = 'Test2'
        this.mensaje = 'Este es un mensaje para Test2'
      } else {
        this.componenteActual = 'Test'
        this.mensaje = 'Este es un mensaje para Test'
      }
    }
  }
}
</script>