export const  generarNumeroAleatorio = (digitos: number): number => {
    // Si el número de dígitos es menor que 1, devolver 0
    if (digitos < 1) {
      return 0;
    }
    
    // Calcular el rango basado en la cantidad de dígitos
    const min = Math.pow(10, digitos - 1); // Ejemplo: Si son 3 dígitos, el mínimo es 100
    const max = Math.pow(10, digitos) - 1; // Ejemplo: Si son 3 dígitos, el máximo es 999
    
    // Generar un número aleatorio dentro del rango
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }