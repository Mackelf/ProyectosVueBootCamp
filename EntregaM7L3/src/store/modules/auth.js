export default {
  namespaced: true,

  state: () => ({
    auth: false,
    username: '',
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => state.auth,
  },

  mutations: {
    doLogin(state, username) {
      state.auth = true
      state.username = username
      state.error = null
    },
    doLogout(state) {
      state.auth = false
      state.username = ''
      state.error = null
    },
    setLoading(state, value) {
      state.loading = value
    },
    setError(state, message) {
      state.error = message
    },
  },

  actions: {
    async doLogin({ commit }, { username, password }) {
      commit('setLoading', true)
      commit('setError', null)

      try {
        await new Promise((resolve) => setTimeout(resolve, 500))

        if (!username || !password) {
          throw new Error('Debes completar usuario y contraseña')
        }

        commit('doLogin', username)
        return true
      } catch (error) {
        commit('setError', error.message)
        return false
      } finally {
        commit('setLoading', false)
      }
    },

    doLogout({ commit }) {
      commit('doLogout')
    },
  },
}