<template>
  <div class="container mt-4">
    <h1 class="mb-4">📋 Lista de Asistencia</h1>




    <ListaAsistencia
      :alumnos="alumnos"
      @toggle-asistencia="actualizarAsistencia"
    />

    
  </div>
</template>

<script>
import ListaAsistencia from '../../2componentes/src/components/Formulario.vue'
import Lista from '../../2componentes/src/components/Lista.vue';

export default {
  name: 'App',
  components: { Lista },
  data() {
    return {
      
      Lista: [
        { id: 1, nombre: 'Andrés',  },
        { id: 2, nombre: 'Bruno',  },
        { id: 3, nombre: 'Carlos', },
        { id: 4, nombre: 'Diego',  },
      ],
    }
  }
 };
</script>