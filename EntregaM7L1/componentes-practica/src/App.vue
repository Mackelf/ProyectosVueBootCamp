<template>
  <div class="app-wrapper">
    <header class="app-header">
      <h1>🧩 Práctica: Componentes Vue</h1>
      <p class="subtitulo">Jerarquía: <code>App.vue</code> ➝ <code>Padre.vue</code> ➝ <code>Hijo.vue</code></p>
    </header>

    <main class="app-main">
      <!-- App.vue renderiza Padre.vue, que a su vez renderiza Hijo.vue -->
      <Padre />
    </main>
  </div>
</template>

<script>
import Padre from './components/Padre.vue'

export default {
  name: 'App',
  components: { Padre }
}
</script>

<style>
/* ── Reset básico ── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: #f0f4f8;
  min-height: 100vh;
}

/* ── Layout de la app ── */
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  font-family: 'Segoe UI', sans-serif;
}

.app-header {
  text-align: center;
  margin-bottom: 36px;
}

.app-header h1 {
  font-size: 1.8rem;
  color: #1a1a2e;
  font-weight: 700;
  margin-bottom: 8px;
}

.subtitulo {
  font-size: 0.95rem;
  color: #607d8b;
}

.subtitulo code {
  background: #e3f2fd;
  color: #1565c0;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

.app-main {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>