<template>
    <div class="padre-card">
        <div>
            <span class="badge">Padre.Vue</span>
        </div>

        <p>Enviando prop a Hijo: <strong>"{{  mensajeAlHijo  }}"</strong>
        </p>

        <Hijo
            :mensaje="mensajeAlHijo"
            @respuestaHijo="recibirRespuesta"
        />

        <div v-if="respuestaDelHijo">
            <p class="label"> Respuesta recibida del Hijo:</p>
            <p>{{ respuestaDelHijo }}</p>
        </div>    
    </div>
</template>

<script>
import Hijo from './Hijo.vue'

export default {
    name: 'Padre',

    components: {
        Hijo
    },


data() {
    return {
        mensajeAlHijo: 'Hola desde el componente padre',
        respuestaDelHijo: ''
    }
},

methods: {
    recibirRespuesta(mensaje) {
        this.respuestaDelHijo = mensaje
    }
},

mounted() {
    console.log('[Padre] mounted – el componente fue insertado en el DOM.')
},

updated() {
    console.log('[Padre] updated – el DOM fue actualizado (datos reactivos cambiaron).')
},

beforeMount() {
    console.log('[Padre] beforeMount – el componente se va a montar en el DOM.')
}


}

</script>
<style scoped>
.padre-card {
    background: linear-gradient(135deg, #fce4ec, #f8bbd0);
    border: 2px solid #e91e63;
    max-width: 480px;
    display:flex;
    font-family: 'Segoe UI', sans-serif;
    flex-direction: column;
    gap: 16px;
    border-radius: 14px;
    padding: 4px 10px;
}
.badge {
  background-color: #e91e63;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
</style>