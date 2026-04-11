export function obtenerDescuento(tipoCliente) {
  const descuentos = {
    normal: 10,
    vip: 20,
  };

  return descuentos[tipoCliente] ?? 0;
}

export function calcularDescuento(tipoCliente, precio) {
  if (precio < 0) {
    throw new Error("El precio no puede ser negativo");
  }

  const descuento = obtenerDescuento(tipoCliente);

  return precio * (1 - descuento / 100);
}