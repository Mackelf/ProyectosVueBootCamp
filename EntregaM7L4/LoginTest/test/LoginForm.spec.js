import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginForm from '../src/components/LoginForm.vue'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function factory(props = {}) {
  return mount(LoginForm, { props })
}

// ---------------------------------------------------------------------------
// Suite
// ---------------------------------------------------------------------------
describe('LoginForm.vue', () => {
  // ── 1. Estructura básica ─────────────────────────────────────────────────
  describe('estructura', () => {
    it('renderiza el campo email', () => {
      const wrapper = factory()
      expect(wrapper.find('[data-testid="email"]').exists()).toBe(true)
    })

    it('renderiza el campo password', () => {
      const wrapper = factory()
      expect(wrapper.find('[data-testid="password"]').exists()).toBe(true)
    })

    it('renderiza el botón "Ingresar"', () => {
      const wrapper = factory()
      expect(wrapper.find('[data-testid="submit-btn"]').exists()).toBe(true)
    })

    it('el botón está deshabilitado por defecto (campos vacíos)', () => {
      const wrapper = factory()
      const btn = wrapper.find('[data-testid="submit-btn"]')
      expect(btn.attributes('disabled')).toBeDefined()
    })
  })

  // ── 2. Validación de email ───────────────────────────────────────────────
  describe('validación de email', () => {
    it('muestra error si el email es inválido y el campo fue tocado', async () => {
      const wrapper = factory()
      const emailInput = wrapper.find('[data-testid="email"]')

      await emailInput.setValue('no-es-un-email')
      await emailInput.trigger('blur')

      expect(wrapper.find('[data-testid="error"]').exists()).toBe(true)
    })

    it('no muestra error si el email es válido', async () => {
      const wrapper = factory()
      const emailInput = wrapper.find('[data-testid="email"]')

      await emailInput.setValue('mario@example.com')
      await emailInput.trigger('blur')

      expect(wrapper.find('[data-testid="error"]').exists()).toBe(false)
    })

    it('no muestra error antes de que el campo sea tocado', async () => {
      const wrapper = factory()
      await wrapper.find('[data-testid="email"]').setValue('mal')
      // Sin blur → no debe mostrar error todavía
      expect(wrapper.find('[data-testid="error"]').exists()).toBe(false)
    })
  })

  // ── 3. Habilitación del botón ────────────────────────────────────────────
  describe('habilitación del botón', () => {
    it('permanece deshabilitado con email inválido aunque haya password', async () => {
      const wrapper = factory()
      await wrapper.find('[data-testid="email"]').setValue('malo')
      await wrapper.find('[data-testid="password"]').setValue('secret')

      const btn = wrapper.find('[data-testid="submit-btn"]')
      expect(btn.attributes('disabled')).toBeDefined()
    })

    it('permanece deshabilitado con email válido pero password vacío', async () => {
      const wrapper = factory()
      await wrapper.find('[data-testid="email"]').setValue('mario@example.com')
      await wrapper.find('[data-testid="password"]').setValue('')

      const btn = wrapper.find('[data-testid="submit-btn"]')
      expect(btn.attributes('disabled')).toBeDefined()
    })

    it('se habilita con email válido y password no vacío', async () => {
      const wrapper = factory()
      await wrapper.find('[data-testid="email"]').setValue('mario@example.com')
      await wrapper.find('[data-testid="password"]').setValue('secret')

      const btn = wrapper.find('[data-testid="submit-btn"]')
      expect(btn.attributes('disabled')).toBeUndefined()
    })
  })

  // ── 4. Evento submit ─────────────────────────────────────────────────────
  describe('emit submit', () => {
    it('emite submit con el payload correcto al enviar', async () => {
      const wrapper = factory()

      await wrapper.find('[data-testid="email"]').setValue('  mario@example.com  ')
      await wrapper.find('[data-testid="password"]').setValue('mypassword')
      await wrapper.find('[data-testid="submit-btn"]').trigger('click')

      const events = wrapper.emitted('submit')

      expect(events).toBeTruthy()
      expect(events.length).toBe(1)
      expect(events[0][0]).toEqual({
        email: 'mario@example.com', // trim aplicado
        password: 'mypassword',
      })
    })

    it('no emite submit si el formulario es inválido', async () => {
      const wrapper = factory()

      await wrapper.find('[data-testid="email"]').setValue('invalido')
      await wrapper.find('[data-testid="password"]').setValue('')

      await wrapper.find('[data-testid="submit-btn"]').trigger('click')

      expect(wrapper.emitted('submit')).toBeUndefined()
    })

    it('limpia el password tras emitir', async () => {
      const wrapper = factory()
      await wrapper.find('[data-testid="email"]').setValue('mario@example.com')
      await wrapper.find('[data-testid="password"]').setValue('mypassword')
      await wrapper.find('[data-testid="submit-btn"]').trigger('click')

      expect(wrapper.find('[data-testid="password"]').element.value).toBe('')
    })

    it('mantiene el email tras emitir', async () => {
      const wrapper = factory()
      await wrapper.find('[data-testid="email"]').setValue('mario@example.com')
      await wrapper.find('[data-testid="password"]').setValue('mypassword')
      await wrapper.find('[data-testid="submit-btn"]').trigger('click')

      expect(wrapper.find('[data-testid="email"]').element.value).toBe('mario@example.com')
    })
  })

  // ── 5. Accesibilidad básica ──────────────────────────────────────────────
  describe('accesibilidad', () => {
    it('el mensaje de error tiene role="alert" o aria-live', async () => {
      const wrapper = factory()
      await wrapper.find('[data-testid="email"]').setValue('mal')
      await wrapper.find('[data-testid="email"]').trigger('blur')

      const errorEl = wrapper.find('[data-testid="error"]')
      const hasRole = errorEl.attributes('role') === 'alert'
      const hasAriaLive = errorEl.attributes('aria-live') !== undefined
      expect(hasRole || hasAriaLive).toBe(true)
    })
  })
})