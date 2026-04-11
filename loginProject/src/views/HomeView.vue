<template>
  <div class="contenedor">
    <h1>Inicio</h1>

    <p>Sesión Iniciada correctamente</p>

    <p v-if="usuario">Usuario: {{ usuario.email }}</p>

    <button @click="salir">Cerrar Sesión</button>
  </div>
</template>

<script>
export default {
  computed: {
    usuario() {
      return this.$store.getters['auth/usuarioActivo']
    },
  },
  methods: {
    salir() {
      this.$store.dispatch('auth/cerrarSesion')
      this.$router.push('/')
    },
  },
}
</script>

<style>
.contenedor {
  max-width: 400px;
  margin: 40px;
}
</style>