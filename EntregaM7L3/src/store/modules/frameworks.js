import api from '@/api/api'

export default {
  namespaced: true,

  state: () => ({
    items: [],
    loading: false,
    error: null,
  }),

  mutations: {
    setItems(state, items) {
      state.items = items
    },
    setLoading(state, value) {
      state.loading = value
    },
    setError(state, message) {
      state.error = message
    },
  },

  actions: {
    async cargar({ commit }) {
      commit('setLoading', true)
      commit('setError', null)

      try {
        const { data } = await api.get('/frameworks')
        commit('setItems', data)
      } catch (error) {
        commit('setError', error.message || 'No se pudieron cargar los frameworks.')
      } finally {
        commit('setLoading', false)
      }
    },
  },
}