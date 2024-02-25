function cerrarSesion() {
    // Realiza una solicitud Fetch para cerrar la sesión
    fetch('../back/cerrar_sesion.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cerrar sesión');
        }
        // Redirige a la página de inicio después de cerrar sesión exitosamente
        window.location.href = '../index.php';
    })
    .catch(error => {
        console.error('Error:', error);
        // Maneja el error según sea necesario
    });
}