<template>

  <div>
  
    <h1>Vuex</h1>
    <h2>Parte 1</h2>
    <p>Contador: {{ $store.state.contador }}</p>

    <button @click="$store.commit('incrementar')">Incrementar</button>
    <button @click="$store.commit('decrementar')">Decrementar</button>
  
  </div>
<br>

  <div style="min-height: 420px; display: flex; align-items: center; justify-content: center; padding: 2rem 1rem;" class="bg-light">

    <!-- Formulario de login -->
    <div v-if="!$store.state.login" style="width: 100%; max-width: 380px;">
      <div class="card border-0 shadow-sm p-4">
        <div class="mb-4">
          <p class="text-uppercase text-muted mb-1" style="font-size: 11px; letter-spacing: 0.08em;">Bienvenido</p>
          <h2>Parte 2</h2>
          <h2 class="h5 fw-medium mb-0">Iniciar sesión</h2>
        </div>

        <div class="mb-3">
          <label class="form-label text-secondary" style="font-size: 13px;">Nombre</label>
          <input
            v-model="nombre"
            type="text"
            class="form-control"
            placeholder="Ingresa tu nombre"
            @keydown.enter="login"
          >
          <p v-if="error" class="text-danger mt-1" style="font-size: 12px;">Por favor ingresa tu nombre.</p>
        </div>

        <button @click="login" class="btn btn-dark w-100" style="padding: 10px;">
          Entrar
        </button>
      </div>
    </div>

    <!-- Vista de bienvenida -->
    <div v-else style="width: 100%; max-width: 380px; text-align: center;">
      <div class="card border-0 shadow-sm p-4">
        <div class="rounded-circle bg-light bg-opacity-25 d-flex align-items-center justify-content-center mx-auto mb-3"
             style="width: 56px; height: 56px; font-size: 20px; font-weight: 500;">
          {{ $store.state.nombre.charAt(0).toUpperCase() }}
        </div>
        <p class="text-muted mb-1" style="font-size: 13px;">Sesión iniciada</p>
        <h2 class="h5 fw-medium mb-4">¡Hola, {{ $store.state.nombre }}!</h2>
        <button @click="$store.commit('logout')" class="btn btn-outline-secondary w-100" style="padding: 10px;">
          Cerrar sesión
        </button>
      </div>
    </div>

  </div>
<br>

<h2>Parte 3</h2>
  <div class="traffic-light">
    <div
      v-for="luz in $store.state.luces"
      :key="luz.color"
      class="luz-circle"
      :class="{ activo: luz.color === $store.getters.semaforo.color, [luz.color]: true }"
    ></div>
    <div class="stats">
    <p>Color: {{ $store.getters.semaforo.color }}</p>
    <p>Estado: {{ $store.getters.semaforo.mensaje }}</p>
    <p>Marcha: {{ $store.getters.semaforo.marcha }}</p>
    </div>

    <button class="btn btn-primary" @click="$store.commit('cambiarEstado')">Cambiar estado</button>
    <button class="btn btn-success" @click="iniciarTemporizador">⏱️Iniciar temporizador</button>
    <p style="color: white"class="fw-light">cambia 1 seg por 10 seg</p>
  </div>

</template>
<style scoped>
.stats {
  color: white;
}
.traffic-light {

  display: flex;
  flex-direction: column;   /* ← esto faltaba */
  align-items: center;
  gap: 10px;
  margin: 20px 0;
  background-color: #222;
  padding: 20px;
  border-radius: 16px;
  width: fit-content;
}
.luz-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #333;
  opacity: 0.3;
  transition: opacity 0.3s, background-color 0.3s;
}

.luz-circle.activo   { opacity: 1; }
.luz-circle.rojo     { background-color: red; }
.luz-circle.verde    { background-color: green; }
.luz-circle.amarillo { background-color: yellow; }

</style>
<script>
export default {
  
  name: 'App',
  data() {
    return {
      nombre: '',
      error: false,
    }
  },
  methods: {
     login() {
    if (!this.nombre.trim()) { this.error = true; return; }
    this.error = false;
    this.$store.commit('guardarNombre', this.nombre.trim());
  },

  iniciarTemporizador() {
    const intervalo = setInterval(() => {
      this.$store.commit('cambiarEstado');
    }, 1000); // cambia cada 1 segundo

    setTimeout(() => {
      clearInterval(intervalo); // detiene después de 10 segundos
    }, 10000);
  }
}

}


</script>