export default {
    namespaced: true,

    state: () => ({
        autenticado: false,
        usuario: null,
        error: ''
    }),
    mutations: {
        setAutenticado(state, valor) {
            state.autenticado = valor
        },
        setUsuario(state, valor) {
            state.usuario = valor
        },
        setError(state, valor) {
            state.error = valor
        },
        logout(state) {
            state.autenticado = false
            state.usuario = null
            state.error = ''
        }
    },
    actions: {
        login({ commit }, datos) {
            const emailCorrecto = 'admin@admin.cl'
            const passwordCorrecto = '123'

            if (datos.email === emailCorrecto && datos.password === passwordCorrecto) {
                commit('setAutenticado', true)
                commit('setUsuario', { email: datos.email })
                commit('setError', '')

                return true
            }
            else {
                commit('setAutenticado', false)
                commit('setUsuario', null)
                commit('setError', 'Datos incorrectos')

                return false
            }
        },
        cerrarSesion({ commit }) {
            commit('logout')
        }
    },
    getters: {
        estaAutenticado(state) {
            return state.autenticado
        },
        usuarioActivo(state) {
            return state.usuario
        },
        mensajeError(state) {
            return state.error
        }
    }
}