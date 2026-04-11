import { createStore } from 'vuex'

export default createStore({
  state: {
    mesas: [
      { id: 1, cliente: '', estado: 'Libre' },
      { id: 2, cliente: '', estado: 'Libre' },
      { id: 3, cliente: 'Familia López', estado: 'Ocupada' },
      { id: 4, cliente: 'Juan Pérez', estado: 'Atendida' },
    ]
  },

  getters: {
    libres:   s => s.mesas.filter(m => m.estado === 'Libre').length,
    ocupadas: s => s.mesas.filter(m => m.estado === 'Ocupada').length,
    atendidas:s => s.mesas.filter(m => m.estado === 'Atendida').length,
  },

  mutations: {
    CAMBIAR_ESTADO(state, { id, nuevoEstado, cliente }) {
      const mesa = state.mesas.find(m => m.id === id)
      if (!mesa) return
      mesa.estado = nuevoEstado
      if (cliente !== undefined) mesa.cliente = cliente
    }
  },

  actions: {
    cambiarEstado({ commit }, payload) {
      commit('CAMBIAR_ESTADO', payload)
    }
  }
})