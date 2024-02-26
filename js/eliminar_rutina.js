
// Función para mostrar el modal de confirmación de eliminar la rutina
function confirmarEliminarRutina(rutinaId) {
    $('#confirmacionEliminarRutina' + rutinaId).modal('show');
}

function eliminarRutina(rutinaId) {
    // Solicitud fetch para eliminar la rutina con el script eliminar_rutina.php
    fetch('../back/eliminar_rutina.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'rutinaId=' + rutinaId,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);
        if (data.mensaje) {
            // Eliminamos la tarjeta correspondiente de la vista
            $('#rutinaCard' + rutinaId).remove();
            // Mostramos sweetalert con mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: 'Rutina eliminada',
                text: data.mensaje,
            });

        } else if (data.error) {
            // Mostramos sweetalert con mensaje de error
            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar la rutina',
                text: data.error,
            });
        }
    })
    .catch(error => {
        console.error('Error al eliminar la rutina:', error);
    })
    .finally(() => {
        // Después de eliminar la rutina, cerramos el modal de confirmación
        $('#confirmacionEliminarRutina' + rutinaId).modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove()
    });
}

