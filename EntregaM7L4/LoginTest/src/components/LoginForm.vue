<template>
  <div class="d-flex justify-content-center align-items-center py-5">
    <div class="card border shadow-sm" style="width: 360px;">
      <div class="card-body px-4 py-4">
        <p class="fw-medium mb-4" style="font-size: 1rem; letter-spacing: -0.01em;">
          Iniciar sesión
        </p>

        <!-- Email -->
        <div class="mb-3">
          <label for="login-email" class="form-label text-secondary text-uppercase"
            style="font-size: 0.7rem; letter-spacing: 0.05em;">Email</label>
          <input
            id="login-email"
            v-model="email"
            type="email"
            class="form-control form-control-sm bg-light"
            :class="{ 'is-invalid': showEmailError }"
            placeholder="usuario@dominio.com"
            autocomplete="email"
            data-testid="email"
            @blur="emailTouched = true"
          />
          <div
            v-if="showEmailError"
            class="invalid-feedback d-block"
            role="alert"
            data-testid="error"
            style="font-size: 0.75rem;"
          >
            Ingresa un email válido.
          </div>
        </div>

        <!-- Password -->
        <div class="mb-3">
          <label for="login-password" class="form-label text-secondary text-uppercase"
            style="font-size: 0.7rem; letter-spacing: 0.05em;">Contraseña</label>
          <input
            id="login-password"
            v-model="password"
            type="password"
            class="form-control form-control-sm bg-light"
            placeholder="••••••••"
            autocomplete="current-password"
            data-testid="password"
          />
        </div>

        <!-- Submit -->
        <button
          type="button"
          class="btn btn-outline-secondary w-100 mt-3"
          style="font-size: 0.875rem;"
          :disabled="!isFormValid"
          data-testid="submit-btn"
          @click="handleSubmit"
        >
          Ingresar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// ── Estado ──────────────────────────────────────────────────────────────────
const email = ref('')
const password = ref('')
const emailTouched = ref(false)

// ── Validación ───────────────────────────────────────────────────────────────
/**
 * Regex RFC-simplificado: valida que haya caracteres, @, y un dominio con punto.
 * Suficiente para el scope del componente según el enunciado.
 */
const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()))

const isPasswordValid = computed(() => password.value.length > 0)

const isFormValid = computed(() => isEmailValid.value && isPasswordValid.value)

// El error de email solo se muestra tras haber tocado el campo (UX)
const showEmailError = computed(() => emailTouched.value && !isEmailValid.value)

// ── Eventos ──────────────────────────────────────────────────────────────────
const emit = defineEmits(['submit'])

function handleSubmit() {
  if (!isFormValid.value) return

  const payload = {
    email: email.value.trim(),
    password: password.value,
  }

  // 1) Log de evidencia en consola
  console.log('[LoginForm] submit payload:', payload)

  // 2) Emitir evento al padre
  emit('submit', payload)

  // 3) Post-submit: limpiar password, conservar email
  password.value = ''
}
</script>
