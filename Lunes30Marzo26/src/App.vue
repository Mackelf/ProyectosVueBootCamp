<template>
  <div id="app">
    <header>
      <div class="brand">
        <h1>Salón <em>principal</em></h1>
        <p>Turno del mediodía</p>
      </div>
      <div class="stats">
        <div class="stat s-libre">
          <span class="num">{{ libres }}</span>
          <span class="lbl">Libre</span>
        </div>
        <div class="stat s-ocup">
          <span class="num">{{ ocupadas }}</span>
          <span class="lbl">Ocup.</span>
        </div>
        <div class="stat s-aten">
          <span class="num">{{ atendidas }}</span>
          <span class="lbl">Aten.</span>
        </div>
      </div>
    </header>

    <div class="grid">
      <MesaCard
        v-for="mesa in mesas"
        :key="mesa.id"
        :mesa="mesa"
        @cambiar="cambiar"
      />
    </div>

    <footer>{{ mesas.length }} mesas · actualizado en tiempo real</footer>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import MesaCard from './components/MesaCard.vue'

export default {
  components: { MesaCard },
  setup() {
    const store = useStore()

    const mesas     = computed(() => store.state.mesas)
    const libres    = computed(() => store.getters.libres)
    const ocupadas  = computed(() => store.getters.ocupadas)
    const atendidas = computed(() => store.getters.atendidas)

    const cambiar = payload => store.dispatch('cambiarEstado', payload)

    return { mesas, libres, ocupadas, atendidas, cambiar }
  }
}
</script>
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
:root {
  --bg:      #f5f2ec;
  --surface: #ffffff;
  --border:  #e2ddd5;
  --text:    #1a1916;
  --muted:   #9c9891;
  --sans:    'DM Sans', sans-serif;
  --serif:   'Fraunces', Georgia, serif;
 
  --libre:   #2e7d52;
  --ocup:    #b34a32;
  --aten:    #2c5f8a;
}
 
body {
  background: var(--bg);
  font-family: var(--sans);
  color: var(--text);
  min-height: 100vh;
}
 
#app {
  max-width: 720px;
  margin: 0 auto;
  padding: 52px 24px 72px;
}
 
/* ── Header ── */
header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 40px;
  gap: 16px;
}
 
.brand h1 {
  font-family: var(--serif);
  font-weight: 300;
  font-size: 32px;
  letter-spacing: -0.5px;
  line-height: 1;
}
.brand h1 em {
  font-style: italic;
  color: var(--muted);
}
.brand p {
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  margin-top: 7px;
}
 
/* ── Stats ── */
.stats {
  display: flex;
  gap: 2px;
}
.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  border-radius: 8px;
  min-width: 58px;
}
.stat .num {
  font-family: var(--serif);
  font-size: 20px;
  font-weight: 300;
  line-height: 1;
}
.stat .lbl {
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-top: 3px;
  color: var(--muted);
}
.stat.s-libre  .num { color: var(--libre); }
.stat.s-ocup   .num { color: var(--ocup); }
.stat.s-aten   .num { color: var(--aten); }
 
/* ── Grid ── */
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
 
/* ── Card ── */
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 26px 26px 22px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: box-shadow .2s;
}
.card:hover {
  box-shadow: 0 4px 20px rgba(0,0,0,0.07);
}
 
/* dot indicator top-right */
.dot {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  transition: background .3s;
}
.libre   .dot { background: var(--libre); }
.ocupada .dot { background: var(--ocup); box-shadow: 0 0 0 3px rgba(179,74,50,.12); }
.atendida .dot{ background: var(--aten); }
 
/* mesa number */
.mesa-n {
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 12px;
}
 
/* client name */
.cliente {
  font-family: var(--serif);
  font-size: 21px;
  font-weight: 300;
  line-height: 1.2;
  color: var(--text);
  min-height: 26px;
  margin-bottom: 20px;
}
.cliente.vacio {
  font-style: italic;
  color: #ccc9c2;
}
 
/* rule */
.rule {
  height: 1px;
  background: var(--border);
  margin-bottom: 16px;
}
 
/* estado label */
.estado-lbl {
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 12px;
}
.libre   .estado-lbl { color: var(--libre); }
.ocupada .estado-lbl { color: var(--ocup); }
.atendida .estado-lbl{ color: var(--aten); }
 
/* actions */
.actions { display: flex; flex-direction: column; gap: 8px; }
 
.row { display: flex; gap: 6px; }
 
input {
  flex: 1;
  min-width: 0;
  border: 1px solid var(--border);
  border-radius: 7px;
  background: var(--bg);
  padding: 8px 12px;
  font-family: var(--sans);
  font-size: 13px;
  color: var(--text);
  outline: none;
  transition: border-color .15s;
}
input::placeholder { color: #c5c2ba; }
input:focus { border-color: #b8b3aa; }
 
button {
  font-family: var(--sans);
  font-size: 11px;
  letter-spacing: 0.06em;
  font-weight: 500;
  text-transform: uppercase;
  border-radius: 7px;
  border: none;
  padding: 8px 14px;
  cursor: pointer;
  transition: background .15s, opacity .15s;
  white-space: nowrap;
}
button:active { opacity: .75; }
 
.btn-add {
  background: var(--text);
  color: var(--bg);
  padding: 8px 16px;
}
.btn-add:hover { background: #333; }
 
.btn-action {
  background: var(--bg);
  color: var(--muted);
  border: 1px solid var(--border);
  width: 100%;
  text-align: center;
}
.btn-action:hover { background: #ede9e1; color: var(--text); }
 
/* ── Footer ── */
footer {
  margin-top: 40px;
  text-align: center;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #ccc9c2;
}
 
@media (max-width: 480px) {
  .grid { grid-template-columns: 1fr; }
  header { flex-direction: column; align-items: flex-start; }
}</style>