
import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      listaTarea : [],
      tarea:'',
    };
  },


mutations: {
  agregarTarea(state, tarea) {
    state.listaTarea.push(tarea);
  }
},





})//cierre export

/*
export default createStore({
  state() {
    return {
      productos: [
        { id: 1, nombre: "Teclado",   icono: "⌨️" },
        { id: 2, nombre: "Monitor",   icono: "🖥️" },
        { id: 3, nombre: "Mouse",     icono: "🖱️" },
        { id: 4, nombre: "Audífonos", icono: "🎧" },
      ],
      favoritos: [],
    };
  },

  mutations: { 
    agregarFavorito(state, producto) {
      const existe = state.favoritos.find(p => p.id === producto.id);
      if (!existe) {
        state.favoritos.push(producto);
      }
    },
    quitarFavorito(state, productoId) {
      state.favoritos = state.favoritos.filter(p => p.id !== productoId);
    },
  },

  getters: {   
    esFavorito: (state) => (productoId) => {
      return state.favoritos.some(p => p.id === productoId);
    },
  },
});
*/
/** STORE 

export default createStore({
  state() {
    return {
      intensidad: 100,
      colorBase: "Azul",   // ← color seleccionado
    };
  },

  mutations: {
    setIntensidad(state, valor) {
      if (valor < 0) state.intensidad = 0;
      else if (valor > 255) state.intensidad = 255;
      else state.intensidad = valor;
    },
    setColorBase(state, color) {
      state.colorBase = color;
    },
  },
});

***/