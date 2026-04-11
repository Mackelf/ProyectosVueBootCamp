<template>
  <div class="contenedor">
    <h1>Formulario</h1>

    <form @submit.prevent="registrar">
      <div class="grupo">
        <label>Nombre</label>
        <input type="text" :value="nombre" @input="setNombre($event.target.value)" />
      </div>

      <div class="grupo">
        <label>Apellidos</label>
        <input type="text" :value="apellidos" @input="setApellidos($event.target.value)" />
      </div>

      <div class="grupo">
        <label>Email</label>
        <input type="text" :value="email" @input="setEmail($event.target.value)" />
      </div>

      <div class="grupo">
        <label>Password</label>
        <input type="password" :value="password" @input="setPassword($event.target.value)" />
      </div>

      <div class="grupo">
        <label>Medio de Transporte</label>
        <select :value="transporte" @change="setTransporte($event.target.value)">
          <option value="">Seleccione</option>
          <option value="Auto">Auto</option>
          <option value="Bus">Bus</option>
          <option value="Metro">Metro</option>
        </select>
      </div>

      <div class="botones">
        <button type="submit">Registrarse</button>
        <button type="button" @click="limpiar">Limpiar</button>
      </div>
    </form>

    <p class="mensaje">{{ mensaje }}</p>

    <div class="resumen">
      <h2>Datos guardados</h2>
      <p>Nombre: {{ nombre }}</p>
      <p>Apellidos: {{ apellidos }}</p>
      <p>Email: {{ email }}</p>
      <p>Password: {{ password }}</p>
      <p>Medio de transporte: {{ transporte }}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['nombre', 'apellidos', 'email', 'password', 'transporte', 'mensaje']),
  },
  methods: {
    ...mapMutations(['setNombre', 'setApellidos', 'setEmail', 'setPassword', 'setTransporte']),
    ...mapActions(['registrarFormulario', 'limpiarTodo']),
    registrar() {
      this.registrarFormulario()
    },
    limpiar() {
      this.limpiarTodo()
    },
  },
}
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: beige;
}

.contenedor {
  width: 500px;
  margin: 40px auto;
  background-color: white;
  padding: 25px;
  border-radius: 8px;
}

h1,
h2 {
  text-align: center;
}

.grupo {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 6px;
}

input,
select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.botones {
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 14px;
}

.mensaje {
  margin-top: 20px;
  font-weight: bold;
  color: rgb(184, 26, 26);
}

.resumen {
  margin-top: 25px;
  padding: 15px;
  background-color: aliceblue;
  border-radius: 6px;
}
</style>
