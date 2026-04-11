<template>
  <div class="contenedor">

    <header class="header">
      <div class="logo">Trans<span>Andes</span></div>
      <p class="tagline">Agencia de Viajes en Bus</p>
    </header>

    <div class="card">
      <form @submit.prevent="registrar">

        <p class="section-title">Datos del pasajero</p>
        <div class="grupo">
          <label>Nombre completo</label>
          <input
            type="text"
            :value="pasajero"
            placeholder="Ej: Juan Pérez"
            @input="setPasajero($event.target.value)"
          />
        </div>

        <hr class="divider" />

        <p class="section-title">Detalles del viaje</p>
        <div class="grid-2">
          <div class="grupo">
            <label>Destino</label>
            <input
              type="text"
              :value="destino"
              placeholder="Ej: Santiago"
              @input="setDestino($event.target.value)"
            />
          </div>
          <div class="grupo">
            <label>Fecha de viaje</label>
            <input
              type="date"
              :value="fechaViaje"
              :min="today"
              @input="setFechaViaje($event.target.value)"
            />
          </div>
        </div>

        <div class="grid-2">
          <div class="grupo">
            <label>Tipo de asiento</label>
            <select :value="tipoAsiento" @change="setTipoAsiento($event.target.value)">
              <option value="">Seleccione</option>
              <option value="normal">Normal</option>
              <option value="premium">Premium</option>
            </select>
          </div>
          <div class="grupo">
            <label>Cantidad de pasajes</label>
            <input
              type="number"
              :value="cantidadPasajes"
              min="1"
              placeholder="1"
              @input="setCantidadPasajes($event.target.value)"
            />
          </div>
        </div>

        <div class="price-box">
          <div class="price-icon">🎟</div>
          <div>
            <p class="price-label">Tarifas referencia</p>
            <div class="price-vals">
              <span class="price-item">Normal: <strong>$10.000</strong></span>
              <span class="price-item">Premium: <strong>$15.000</strong></span>
            </div>
          </div>
        </div>

        <div class="botones">
          <button type="submit" class="btn-comprar">Comprar pasaje</button>
          <button type="button" class="btn-limpiar" @click="limpiar">Limpiar</button>
        </div>

      </form>

      <p v-if="mensaje" :class="mensajeClase">
        {{ mensajeIcono }} {{ mensaje }}
      </p>

      <div class="resumen">
        <h2 class="resumen-title">Resumen de compra</h2>
        <div class="resumen-row"><span>Pasajero</span><span>{{ pasajero || '—' }}</span></div>
        <div class="resumen-row"><span>Destino</span><span>{{ destino || '—' }}</span></div>
        <div class="resumen-row"><span>Fecha</span><span>{{ fechaViaje || '—' }}</span></div>
        <div class="resumen-row"><span>Tipo de asiento</span><span>{{ tipoAsiento || '—' }}</span></div>
        <div class="resumen-row"><span>Cantidad</span><span>{{ cantidadPasajes || '—' }}</span></div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['pasajero', 'destino', 'fechaViaje', 'tipoAsiento', 'cantidadPasajes', 'mensaje']),
    today() {
      return new Date().toISOString().split('T')[0]
    },
    mensajeClase() {
      return this.mensaje.startsWith('Compra') ? 'mensaje mensaje-ok' : 'mensaje mensaje-error'
    },
    mensajeIcono() {
      return this.mensaje.startsWith('Compra') ? '✓' : '⚠'
    }
  },
  methods: {
    ...mapMutations(['setPasajero', 'setDestino', 'setFechaViaje', 'setTipoAsiento', 'setCantidadPasajes']),
    ...mapActions(['registrarFormulario', 'limpiarTodo']),
    registrar() { this.registrarFormulario() },
    limpiar()   { this.limpiarTodo() },
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@400;500&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'DM Sans', sans-serif;
  background-color: #f0ede6;
  min-height: 100vh;
}

.contenedor {
  width: 560px;
  margin: 40px auto;
  padding-bottom: 40px;
}

/* ── Header ── */
.header { text-align: center; margin-bottom: 1.75rem; }

.logo {
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  font-weight: 600;
  color: #1a3a5c;
  letter-spacing: 0.5px;
}
.logo span { color: #c8902a; }

.tagline {
  font-size: 11px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #999;
  margin-top: 4px;
}

/* ── Card ── */
.card {
  background: #ffffff;
  border-radius: 16px;
  border: 0.5px solid #e2e0d8;
  padding: 2rem;
}

/* ── Secciones ── */
.section-title {
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #c8902a;
  font-weight: 500;
  margin-bottom: 1rem;
}

.divider {
  border: none;
  border-top: 0.5px solid #ece9e1;
  margin: 1.5rem 0;
}

/* ── Grid ── */
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

/* ── Campos ── */
.grupo {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
}
.grupo label {
  font-size: 12px;
  color: #777;
  font-weight: 500;
  letter-spacing: 0.3px;
}
input, select {
  width: 100%;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #e0ddd5;
  font-size: 14px;
  background: #faf9f7;
  color: #1a1a1a;
  font-family: 'DM Sans', sans-serif;
  transition: border-color 0.2s, background 0.2s;
  outline: none;
}
input:focus, select:focus {
  border-color: #1a3a5c;
  background: #fff;
}

/* ── Caja de tarifas ── */
.price-box {
  display: flex;
  align-items: center;
  gap: 14px;
  background: #f5f1e8;
  border-radius: 10px;
  padding: 1rem 1.25rem;
  margin: 1.25rem 0;
}
.price-icon {
  width: 38px;
  height: 38px;
  background: #1a3a5c;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}
.price-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #999;
  margin-bottom: 4px;
}
.price-vals { display: flex; gap: 20px; }
.price-item { font-size: 13px; color: #555; }
.price-item strong { color: #c8902a; font-weight: 500; }

/* ── Botones ── */
.botones { display: flex; gap: 10px; margin-top: 1.5rem; }

.btn-comprar {
  flex: 1;
  padding: 12px;
  background: #1a3a5c;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
  letter-spacing: 0.3px;
  transition: background 0.2s;
}
.btn-comprar:hover { background: #0f2840; }

.btn-limpiar {
  padding: 12px 20px;
  background: transparent;
  color: #888;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 14px;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}
.btn-limpiar:hover { border-color: #bbb; color: #555; }

/* ── Mensajes ── */
.mensaje {
  border-radius: 10px;
  padding: 1rem 1.25rem;
  margin-top: 1.25rem;
  font-size: 13.5px;
  line-height: 1.5;
}
.mensaje-ok    { background: #eaf6f0; border: 1px solid #b3ddc8; color: #1a5c3a; }
.mensaje-error { background: #fdf0f0; border: 1px solid #f2c2c2; color: #8b2222; }

/* ── Resumen ── */
.resumen {
  margin-top: 1.5rem;
  background: #f8f6f2;
  border-radius: 12px;
  padding: 1.25rem;
}
.resumen-title {
  font-family: 'Playfair Display', serif;
  font-size: 15px;
  font-weight: 500;
  color: #1a3a5c;
  margin-bottom: 12px;
}
.resumen-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding: 6px 0;
  border-bottom: 0.5px solid #ece9e1;
  color: #666;
}
.resumen-row:last-child { border-bottom: none; }
.resumen-row span:last-child { font-weight: 500; color: #1a1a1a; }
</style>