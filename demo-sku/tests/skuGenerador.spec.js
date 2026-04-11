
import { describe, it, expect, vi } from 'vitest'
import { generarSKU } from '../src/utils/skuGenerador'

describe('generarSKU', () => {
    it('genera un SKU usando un stub para la secuencia', () => {
        function secuenciaStub() {
            return '1234'
        }

        const sku = generarSKU('Teclado', 'Periférico', 'Chancho', secuenciaStub)

        expect(sku).toBe('PER-TEC-CHA-1234')
    })
    it('usa un mock para verificar que se registró el evento', () => {
        function secuenciaStub() {
            return '5678'
        }

        const registrarEventoMock = vi.fn()

        const sku = generarSKU(
            'Mouse',
            'Accesorios',
            'Algo',
            secuenciaStub,
            registrarEventoMock
        )

        expect(sku).toBe('ACC-MOU-ALG-5678')
        expect(registrarEventoMock).toHaveBeenCalledTimes(1)
        expect(registrarEventoMock).toHaveBeenCalledWith('SKU_GENERADO', {
            producto: 'Mouse',
            categoria: 'Accesorios',
            marca: 'Algo',
            sku: 'ACC-MOU-ALG-5678'
        })
    })
    it('retorna cadena vacía si falta un dato', () => {
        function secuenciaStub() {
            return '0000'
        }

        const registrarEventoMock = vi.fn()

        const sku = generarSKU('Mouse', '', 'Algo', secuenciaStub, registrarEventoMock)

        expect(sku).toBe('')
        expect(registrarEventoMock).not.toHaveBeenCalled()
    })
})