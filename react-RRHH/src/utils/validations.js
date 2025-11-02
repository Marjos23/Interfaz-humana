// Validación de cédula ecuatoriana
export const validarCedulaEcuatoriana = (cedula) => {
  // Verificar que tenga 10 dígitos
  if (!cedula || cedula.length !== 10) {
    return { valido: false, mensaje: "La cédula debe tener 10 dígitos" };
  }

  // Verificar que solo contenga números
  if (!/^\d+$/.test(cedula)) {
    return { valido: false, mensaje: "La cédula solo debe contener números" };
  }

  // Verificar que los dos primeros dígitos correspondan a una provincia válida (01-24)
  const provincia = parseInt(cedula.substring(0, 2));
  if (provincia < 1 || provincia > 24) {
    return { valido: false, mensaje: "Los dos primeros dígitos deben estar entre 01 y 24" };
  }

  // Verificar el tercer dígito (debe ser menor a 6 para personas naturales)
  const tercerDigito = parseInt(cedula.charAt(2));
  if (tercerDigito > 5) {
    return { valido: false, mensaje: "El tercer dígito debe ser menor a 6" };
  }

  // Algoritmo de validación del dígito verificador
  const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  const digitoVerificador = parseInt(cedula.charAt(9));
  let suma = 0;

  for (let i = 0; i < 9; i++) {
    let valor = parseInt(cedula.charAt(i)) * coeficientes[i];
    if (valor >= 10) {
      valor -= 9;
    }
    suma += valor;
  }

  const resultado = suma % 10;
  const verificador = resultado === 0 ? 0 : 10 - resultado;

  if (verificador !== digitoVerificador) {
    return { valido: false, mensaje: "Cédula inválida. Verifica los números." };
  }

  return { valido: true, mensaje: "Cédula válida" };
};

// Validación de email
export const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validación de teléfono ecuatoriano
export const validarTelefono = (telefono) => {
  // Formato: 09XXXXXXXX (celular) o 0XXXXXXXX (convencional)
  const regex = /^0[2-9]\d{8}$/;
  return regex.test(telefono);
};

// Formatear cédula mientras se escribe
export const formatearCedula = (value) => {
  // Eliminar todo lo que no sea número
  const numeros = value.replace(/\D/g, '');
  // Limitar a 10 dígitos
  return numeros.slice(0, 10);
};

// Formatear teléfono mientras se escribe
export const formatearTelefono = (value) => {
  const numeros = value.replace(/\D/g, '');
  return numeros.slice(0, 10);
};
