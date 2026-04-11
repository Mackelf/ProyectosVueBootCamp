export function obtenerSecuencia() {
    const numero = Math.floor(Math.random() * 90000) + 10000; // Genera un número aleatorio de 5 dígitos
    return String(numero);
}