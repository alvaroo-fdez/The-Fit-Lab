const tablas = document.querySelectorAll('table');

function manejarClicCelda(nombreEjercicio) {
    return function() {
        init(nombreEjercicio);
    };
}

// Recorrer todas las tablas
tablas.forEach(tabla => {
    // Recorrer todas las filas de la tabla
    const filas = tabla.querySelectorAll('tr');
    filas.forEach(fila => {
        // Recorrer todas las celdas de la fila
        const celdas = fila.querySelectorAll('td');
        celdas.forEach(celda => {
            // Verificar si el contenido de la celda coincide con alguno de los ejercicios
            for (const grupoMuscular in ejercicios) {
                for (const ejercicio in ejercicios[grupoMuscular]) {
                    const nombreEjercicio = ejercicios[grupoMuscular][ejercicio];
                    if (celda.textContent.includes(nombreEjercicio)) {
                        celda.addEventListener('click', manejarClicCelda(nombreEjercicio));
                    }
                }
            }
        });
    });
});