
function confirmarEliminarRutina(rutinaId) {
    // Mostrar modal de confirmación
    $('#confirmacionEliminarRutina' + rutinaId).modal('show');
}

function eliminarRutina(rutinaId) {
    // Aquí debes enviar la solicitud al servidor para eliminar la rutina con el ID rutinaId
    // Puedes usar AJAX o Fetch para realizar la solicitud

    // Ejemplo de solicitud Fetch (puedes adaptarlo a tu backend):
    fetch('../back/eliminar_rutina.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Cambiado a este tipo de contenido
        },
        body: 'rutinaId=' + rutinaId, // Enviar datos directamente en el cuerpo
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);
        if (data.mensaje) {
            // Eliminar la tarjeta correspondiente de la vista
            $('#rutinaCard' + rutinaId).remove();
            // Mostrar SweetAlert con mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: 'Rutina eliminada',
                text: data.mensaje,
            });

        } else if (data.error) {
            // Mostrar SweetAlert con mensaje de error
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
        // Después de eliminar la rutina, cierra el modal de confirmación
        $('#confirmacionEliminarRutina' + rutinaId).modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove()
    });
}

