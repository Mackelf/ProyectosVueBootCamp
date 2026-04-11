
import { createStore } from 'vuex'

export default createStore({
    state: {
        nombre: '',
        apellidos: '',
        email: '',
        password: '',
        transporte: '',
        mensaje: ''
    },
    mutations: {
        setNombre(state, valor) {
            state.nombre = valor
        },
        setApellidos(state, valor) {
            state.apellidos = valor
        },
        setEmail(state, valor) {
            state.email = valor
        },
        setPassword(state, valor) {
            state.password = valor
        },
        setTransporte(state, valor) {
            state.transporte = valor
        },
        setMensaje(state, valor) {
            state.mensaje = valor
        },
        limpiarFormulario(state) {
            state.nombre = ''
            state.apellidos = ''
            state.email = ''
            state.password = ''
            state.transporte = ''
        }
    },
    actions: {
        registrarFormulario({ state, commit }) {
            if (
                state.nombre.trim() === '' ||
                state.apellidos.trim() === '' ||
                state.email.trim() === '' ||
                state.password.trim() === '' ||
                state.transporte.trim() === ''
            ) {
                commit('setMensaje', 'Debe llenar todos los datos')
                return
            }

            commit('setMensaje', `Registro exitoso: ${state.nombre} ${state.apellidos} - ${state.email} - ${state.transporte}`)
        },
        limpiarTodo({ commit }) {
            commit('limpiarFormulario')
            commit('setMensaje', '')
        }
    },
    getters: {
        datosFormulario(state) {
            return {
                nombre: state.nombre,
                apellidos: state.apellidos,
                email: state.email,
                password: state.password,
                transporte: state.transporte
            }
        }
    }
})
