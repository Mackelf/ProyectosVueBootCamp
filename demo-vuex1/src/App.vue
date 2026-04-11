<template>
  <div class="container">
    <seccion>
    <h2>Ingreso de tareas</h2>
    <jnput type="text"></jnput>
      <button>Agregar</button>

      <seccion>
        <h2>Lista de tareas   
        </h2>
        

      </seccion>

    </seccion>
  </div>
</template>



<!--<template>
<div class="container">
  <section class="seccion">
    <h2>Productos disponibles</h2>
    <div>
        <div v-for="producto in $store.state.productos" :key="producto.id" class="tarjeta">
        <span class="icono">{{ producto.icono }}</span>
        <span class="nombre">{{ producto.nombre }}</span>
        <button 
            @click="$store.commit('agregarFavorito', producto)"
            :disabled="$store.getters.esFavorito(producto.id)"
            :class="$store.getters.esFavorito(producto.id) ? 'btn-agregado' : 'btn-agregar'"
          >
            {{ $store.getters.esFavorito(producto.id) ? "✔ Agregado" : "+ Favorito" }}
          </button>
      </div>
    </div>
  </section>

  <section class seccion favoritos>
    <h2>Productos Favoritos ({{ $store.state.favoritos.length }})</h2>

    <p v-if="$store.state.favoritos.length === 0" class="vacio">
      No hay productos favoritos aún.
    </p>
  
    <div v-else>
        <div 
        v-for="producto in $store.state.favoritos" :key="producto.id" class="tarjeta">
        <span class="icono"> {{ producto.icono }}</span>
        <span class="nombre"> {{ producto.nombre }}</span>
        <button @click="$store.commit('quitarFavorito', producto.id)" class="btn-quitar">X Quitar</button>
      </div>
    </div>

  </section>


</div>

</template>
<script>
  export default {
    name: 'App'
  }
</script>


<style scoped>
.tarjeta {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  gap: 12px;
}
.container {
  max-width: 600px;
  margin: 40px auto;
  font-family: sans-serif;
  padding: 0 16px;
}
.seccion {
  background: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.favoritos {
  background: #fffbea;
  border: 2px solid #fbbf24;
}
.vacio {
  text-align: center;
  color: #9ca3af;
  font-style: italic;
  padding: 12px 0;
}
.icono { font-size: 1.5rem; }

.nombre {
  flex: 1;
  font-size: 1rem;
  font-weight: 500;
  color: #222;
}
button {
  padding: 6px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: opacity 0.2s, transform 0.1s;
}

button:active { transform: scale(0.95); }

.btn-agregar  { background: #3b82f6; color: white; }
.btn-agregado { background: #d1d5db; color: #6b7280; cursor: not-allowed; }
.btn-quitar   { background: #ef4444; color: white; }
</style>
-->

<!--ejercicio 2
Ejercicio:

Desarrolle una aplicación en Vue 3 que permita administrar una lista de productos favoritos utilizando Vuex para manejar el estado global.

La aplicación debe mostrar una lista de productos disponibles, por ejemplo teclado, monitor,
 mouse y audífonos. Cada producto debe tener un botón que permita agregarlo a la lista de favoritos.

Además, la aplicación debe mostrar en otra sección los productos que han sido agregados como favoritos. 
Si un producto ya fue agregado, no debe volver a repetirse en la lista.

También debe existir un botón para quitar un producto de favoritos. Cada cambio realizado debe actualizarse 
en el store y reflejarse inmediatamente en la interfaz.

Toda la información debe ser administrada desde Vuex, utilizando un arreglo para almacenar los productos favoritos.
-->


<!--Ejercicio 1
<template>
  <div :style="{ backgroundColor: colorFinal }" class="container">
    
    <div class="card">
      <h1>Control de Color</h1>

      <p class="valor">Intensidad: <strong>{{ $store.state.intensidad }}</strong></p>
      
      <p class="nivel" :class="nivelClase">{{ nivelMensaje }}</p>

      <!-- Selector de color 
      <div class="color-picker">
        <label>Elige un color base:</label>
        <div class="colores">
          <button 
            v-for="c in colores" 
            :key="c.nombre"
            :style="{ backgroundColor: c.valor }"
            :class="{ activo: $store.state.colorBase === c.nombre }"
            @click="$store.commit('setColorBase', c.nombre)"
          >
            {{ c.nombre }}
          </button>
        </div>
      </div>

      <!-- Slider de intensidad 
      <div class="slider-container">
        <label for="slidecolor1">Deslice para cambiar intensidad</label>
        <input 
          type="range" 
          id="slidecolor1" 
          min="0" 
          max="255"
          :value="$store.state.intensidad"
          @input="cambiarColor"
        />
        <div class="rangos">
          <span>0</span>
          <span>255</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      colores: [
        { nombre: "Rojo",  valor: "rgb(255,0,0)"   },
        { nombre: "Verde", valor: "rgb(0,255,0)"   },
        { nombre: "Azul",  valor: "rgb(0,0,255)"   },
        { nombre: "Morado",valor: "rgb(128,0,128)"  },
      ],
    };
  },

  computed: {
    colorFinal() {
      const i = this.$store.state.intensidad;
      switch (this.$store.state.colorBase) {
        case "Rojo":   return `rgb(${i}, 0, 0)`;
        case "Verde":  return `rgb(0, ${i}, 0)`;
        case "Azul":   return `rgb(0, 0, ${i})`;
        case "Morado": return `rgb(${i}, 0, ${i})`;
        default:       return `rgb(0, 0, ${i})`;
      }
    },

    nivelMensaje() {
      const i = this.$store.state.intensidad;
      if (i < 85)  return "Bajo";
      if (i <= 170) return "Medio";
      return "Alto";
    },

    nivelClase() {
      const i = this.$store.state.intensidad;
      if (i < 85)  return "bajo";
      if (i <= 170) return "medio";
      return "alto";
    },
  },

  methods: {
    cambiarColor(event) {
      this.$store.commit("setIntensidad", Number(event.target.value));
    },
  },
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  color: white;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  min-width: 340px;
}

h1 { margin-bottom: 16px; }

.valor { font-size: 1.2rem; margin-bottom: 8px; }

.nivel {
  font-size: 1.3rem;
  font-weight: bold;
  padding: 4px 18px;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 20px;
}
.bajo  { background: rgba(255, 80,  80,  0.7); }
.medio { background: rgba(255, 180, 0,   0.7); }
.alto  { background: rgba(80,  220, 80,  0.7); }

.color-picker { margin-bottom: 24px; }
.color-picker label { display: block; margin-bottom: 10px; }

.colores {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.colores button {
  padding: 8px 16px;
  border: 3px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  font-weight: bold;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
  transition: transform 0.1s, border 0.2s;
}

.colores button.activo {
  border-color: white;
  transform: scale(1.1);
}

.slider-container label { display: block; margin-bottom: 10px; }

.slider-container input[type="range"] {
  width: 100%;
  cursor: pointer;
}

.rangos {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  margin-top: 4px;
}
</style>
-->