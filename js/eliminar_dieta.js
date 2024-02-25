
function confirmarEliminarDieta(dietaId) {
    // Mostrar modal de confirmación
    $('#confirmacionEliminarDieta' + dietaId).modal('show');
}

function eliminarDieta(dietaId) {
    // Aquí debes enviar la solicitud al servidor para eliminar la dieta con el ID dietaId
    // Puedes usar AJAX o Fetch para realizar la solicitud

    // Ejemplo de solicitud Fetch (puedes adaptarlo a tu backend):
    fetch('../back/eliminar_dieta.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Cambiado a este tipo de contenido
        },
        body: 'dietaId=' + dietaId, // Enviar datos directamente en el cuerpo
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);
        if (data.mensaje) {
            // Eliminar la tarjeta correspondiente de la vista
            $('#dietaCard' + dietaId).remove();
            // Mostrar SweetAlert con mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: 'Dieta eliminada',
                text: data.mensaje,
            });

        } else if (data.error) {
            // Mostrar SweetAlert con mensaje de error
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
        // Después de eliminar la dieta, cierra el modal de confirmación
        $('#confirmacionEliminarDieta' + dietaId).modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove()
    });
}

