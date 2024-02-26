
// Función para mostrar el modal de confirmación de eliminar la dieta
function confirmarEliminarDieta(dietaId) {
    $('#confirmacionEliminarDieta' + dietaId).modal('show');
}

// Función que elimina una dieta en función de su ID
function eliminarDieta(dietaId) {
    // Solicitud fetch para eliminar la dieta con el script eliminar_dieta.php
    fetch('../back/eliminar_dieta.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'dietaId=' + dietaId,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);
        if (data.mensaje) {
            // Eliminamos la tarjeta correspondiente de la vista
            $('#dietaCard' + dietaId).remove();
            // Mostramos un sweetalert con mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: 'Dieta eliminada',
                text: data.mensaje,
            });

        } else if (data.error) {
            // Mostramos un sweetalert con mensaje de error
            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar la dieta',
                text: data.error,
            });
        }
    })
    .catch(error => {
        console.error('Error al eliminar la dieta:', error);
    })
    .finally(() => {
        // Después de eliminar la dieta, cerramos el modal de confirmación
        $('#confirmacionEliminarDieta' + dietaId).modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove()
    });
}

