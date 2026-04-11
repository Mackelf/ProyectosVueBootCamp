import { onMounted } from 'vue'
import { createStore } from 'vuex'



export default createStore({
  state() {
    return {
      contador: 0,
      nombre:'',
      login: false,
     luces: [
  { color: 'rojo',     mensaje: 'Detenido', marcha: 'No'  },
  { color: 'amarillo', mensaje: 'Cuidado', marcha: 'Sí'  },
  { color: 'verde',    mensaje: 'En marcha', marcha: 'Sí' },
],
luzActual: 2, 
    }
  },
  getters: {
    semaforo(state) {
      return state.luces[state.luzActual]
    }
  },


  
  mutations: {
    incrementar(state) {
      state.contador++
    },
    decrementar(state) {
      state.contador--
    },
    guardarNombre(state, nombre) {
      state.nombre = nombre
      state.login = true
    },
    logout(state) {
      state.nombre = ''
      state.login = false
    },
 
  cambiarEstado(state) {
  // Sube: verde(2) → amarillo(1) → rojo(0) → verde(2) → ...
  state.luzActual = (state.luzActual - 1 + state.luces.length) % state.luces.length;
}
    
  }
})

