<template>
  <div class="container py-5">
    <div class="card shadow-sm border-0 mx-auto" style="max-width: 480px">
      <div class="card-body p-4">
        <h1 class="h4 text-center mb-4">Solicitud de evaluación financiera</h1>

        <!-- Nombre -->
        <div class="mb-3">
          <label for="nombre" class="form-label">Nombre completo</label>
          <input
            type="text"
            id="nombre"
            v-model="nombre"
            class="form-control"
            :class="{ 'is-invalid': errores.nombre }"
            placeholder="Ingresa tu nombre completo"
          />
          <div class="invalid-feedback">{{ errores.nombre }}</div>
        </div>

        <!-- Correo -->
        <div class="mb-3">
          <label for="correo" class="form-label">Correo electrónico</label>
          <input
            type="email"
            id="correo"
            v-model="correo"
            class="form-control"
            :class="{ 'is-invalid': errores.correo }"
            placeholder="Ingresa tu correo electrónico"
          />
          <div class="invalid-feedback">{{ errores.correo }}</div>
        </div>

        <!-- Teléfono -->
        <div class="mb-3">
          <label for="telefono" class="form-label">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            v-model="telefono"
            class="form-control"
            :class="{ 'is-invalid': errores.telefono }"
            placeholder="Ingresa tu número de teléfono"
          />
          <div class="invalid-feedback">{{ errores.telefono }}</div>
        </div>

        <!-- Ingresos -->
        <div class="mb-3">
          <label for="ingresos" class="form-label">Ingresos mensuales</label>
          <input
            type="number"
            id="ingresos"
            v-model.number="ingresos"
            class="form-control"
            :class="{ 'is-invalid': errores.ingresos }"
            placeholder="Ingresa tus ingresos mensuales"
            min="0"
          />
          <div class="invalid-feedback">{{ errores.ingresos }}</div>
        </div>

        <!-- Monto -->
        <div class="mb-3">
          <label for="monto" class="form-label">Monto que desea solicitar</label>
          <input
            type="number"
            id="monto"
            v-model.number="monto"
            class="form-control"
            :class="{ 'is-invalid': errores.monto }"
            placeholder="Ingresa el monto que deseas solicitar"
            min="0"
            step="10000"
          />
          <div class="invalid-feedback">{{ errores.monto }}</div>
        </div>

        <!-- Tipo de trabajador -->
        <div class="mb-3">
          <label for="trabajador" class="form-label">Tipo de trabajador</label>
          <select
            id="trabajador"
            v-model="tipoTrabajador"
            class="form-select"
            :class="{ 'is-invalid': errores.tipoTrabajador }"
          >
            <option value="">Selecciona una opción</option>
            <option value="dependiente">Dependiente</option>
            <option value="independiente">Independiente</option>
          </select>
          <div class="invalid-feedback">{{ errores.tipoTrabajador }}</div>
        </div>

        <button @click="procesarSolicitud" class="btn btn-dark w-100">
          Enviar solicitud
        </button>

        <!-- Previsualización -->
        <div
          v-if="mostrarPrevisualizacion"
          class="alert alert-light border mt-4 mb-0"
        >
          <h5 class="text-center mb-3">Previsualización de la solicitud</h5>
          <p><strong>Nombre:</strong> {{ nombre }}</p>
          <p><strong>Correo:</strong> {{ correo }}</p>
          <p><strong>Teléfono:</strong> {{ telefono }}</p>
          <p><strong>Ingresos mensuales:</strong> ${{ ingresos.toLocaleString() }}</p>
          <p><strong>Monto solicitado:</strong> ${{ monto.toLocaleString() }}</p>
          <p><strong>Tipo de trabajador:</strong> {{ tipoTrabajador }}</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const nombre = ref("");
const correo = ref("");
const telefono = ref("");
const ingresos = ref(0);
const monto = ref(0);
const tipoTrabajador = ref("");
const mostrarPrevisualizacion = ref(false);

const errores = reactive({
  nombre: "",
  correo: "",
  telefono: "",
  ingresos: "",
  monto: "",
  tipoTrabajador: "",
});

const validar = () => {
  let valido = true;

  errores.nombre = "";
  errores.correo = "";
  errores.telefono = "";
  errores.ingresos = "";
  errores.monto = "";
  errores.tipoTrabajador = "";

  if (!nombre.value.trim()) {
    errores.nombre = "El nombre es obligatorio";
    valido = false;
  }

  if (!correo.value.trim()) {
    errores.correo = "El correo es obligatorio";
    valido = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value)) {
    errores.correo = "El correo no es válido";
    valido = false;
  }

  if (!telefono.value.trim()) {
    errores.telefono = "El teléfono es obligatorio";
    valido = false;
  }

  if (!ingresos.value || ingresos.value <= 0) {
    errores.ingresos = "Los ingresos deben ser mayores a 0";
    valido = false;
  }

  if (!monto.value || monto.value <= 0) {
    errores.monto = "El monto debe ser mayor a 0";
    valido = false;
  }

  if (!tipoTrabajador.value) {
    errores.tipoTrabajador = "Selecciona el tipo de trabajador";
    valido = false;
  }

  return valido;
};

const procesarSolicitud = () => {
  mostrarPrevisualizacion.value = false;

  if (validar()) {
    mostrarPrevisualizacion.value = true;
  }
};
</script>
