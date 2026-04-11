
import { obtenerSecuencia } from "../services/sequenceService"

function limpiarTexto(texto) {
    return texto
        .trim()
        .toUpperCase()
        .replace(/\s+/g, '')
        .replace(/[^A-Z0-9]/g, '')
}

function tomarParte(texto, cantidad = 3) {
    return limpiarTexto(texto).slice(0, cantidad).padEnd(cantidad, 'X')
}

export function generarSKU(producto, categoria, marca, secuenciaFn = obtenerSecuencia, registrarEvento = () => { }) {
    if (!producto || !categoria || !marca) {
        return ''
    }

    const parteProducto = tomarParte(producto)
    const parteCategoria = tomarParte(categoria)
    const parteMarca = tomarParte(marca)
    const secuencia = secuenciaFn()

    console.log(parteProducto)
    console.log(parteCategoria)
    console.log(parteMarca)
    console.log(secuencia)

    const sku = `${parteCategoria}-${parteProducto}-${parteMarca}-${secuencia}`

    console.log(sku)

    registrarEvento('SKU_GENERADO', {
        producto,
        categoria,
        marca,
        sku
    })

    return sku
}
