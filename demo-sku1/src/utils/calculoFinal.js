export function calculoFinal(precioBase, obtenerDescuento = () => 0, registrarOperacion) {
  if (precioBase <= 0) return 0

  const descuento = obtenerDescuento()
  const precioFinal = precioBase - (precioBase * descuento / 100)

  if (registrarOperacion) {
    registrarOperacion('PRECIO_CALCULADO', {
      precioBase,
      descuento,
      precioFinal
    })
  }

  return precioFinal
}