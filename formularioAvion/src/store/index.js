import {createStore} from 'vuex'

export default createStore({
    state: {
      pasajero: '',
      destino: '',
      fechaViaje: '',
      tipoAsiento: '',
      cantidadPasajes: '',
      mensaje: ''
    },

    mutations: {
        setPasajero(state, valor) {
            state.pasajero = valor
        },
        setDestino(state, valor) {
            state.destino = valor
        },
        setFechaViaje(state, valor) {
            state.fechaViaje = valor
        },
        setTipoAsiento(state, valor) {
            state.tipoAsiento = valor
        },
        setCantidadPasajes(state, valor) {
            state.cantidadPasajes = valor
        },
        setMensaje(state, valor) {
            state.mensaje = valor
        },
        limpiarFormulario(state) {
            state.pasajero = ''
            state.destino = ''
            state.fechaViaje = ''
            state.tipoAsiento = ''
            state.cantidadPasajes = null
        }
     },
     actions: {
        registrarFormulario({ state, commit }) {
            if (
                state.pasajero.trim() === '' ||
                state.destino.trim() === '' ||
                state.fechaViaje.trim() === '' ||
                state.tipoAsiento.trim() === '' ||
                String(state.cantidadPasajes).trim() === ''||
                parseInt(state.cantidadPasajes) <= 0
            ) {
                commit('setMensaje', 'Debe llenar todos los datos')
                return
            }

            const valorBase = 10000
            const recargoPremium = 5000
            let total = valorBase * parseInt(state.cantidadPasajes)

            if (state.tipoAsiento === 'premium') {
                total += recargoPremium * parseInt(state.cantidadPasajes)
            }

            commit('setMensaje', `Compra exitosa: ${state.pasajero} - Destino: ${state.destino} - Cantidad: ${state.cantidadPasajes} - Total a pagar: $${total}`)
        },
        limpiarTodo({ commit }) {
            commit('limpiarFormulario')
            commit('setMensaje', '')
        }
     },
     getters: {
        datosFormulario(state) {
            return {
                pasajero: state.pasajero,
                destino: state.destino,
                fechaViaje: state.fechaViaje,
                tipoAsiento: state.tipoAsiento,
                cantidadPasajes: state.cantidadPasajes
            }
        }
    }

  })

  