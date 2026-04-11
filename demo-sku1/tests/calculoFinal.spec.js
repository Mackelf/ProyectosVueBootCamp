import { describe, it, expect, vi } from 'vitest'
import { calculoFinal } from '../src/utils/calculoFinal'

describe('calculoFinal', () => {
  it('calcula el precio final usando un stub para controlar el descuento', () => {
    function descuentoStub() {
      return 20
    }

    const resultado = calculoFinal(1000, descuentoStub)

    expect(resultado).toBe(800)
  })

  it('usa un mock para verificar que se registra la operación', () => {
    function descuentoStub() {
      return 10
    }

    const registrarOperacionMock = vi.fn()

    const resultado = calculoFinal(
      2000,
      descuentoStub,
      registrarOperacionMock
    )

    expect(resultado).toBe(1800)
    expect(registrarOperacionMock).toHaveBeenCalledTimes(1)
    expect(registrarOperacionMock).toHaveBeenCalledWith('PRECIO_CALCULADO', {
      precioBase: 2000,
      descuento: 10,
      precioFinal: 1800
    })
  })

  it('retorna 0 si el precio base es inválido', () => {
    function descuentoStub() {
      return 15
    }

    const registrarOperacionMock = vi.fn()

    const resultado = calculoFinal(0, descuentoStub, registrarOperacionMock)

    expect(resultado).toBe(0)
    expect(registrarOperacionMock).not.toHaveBeenCalled()
  })
})