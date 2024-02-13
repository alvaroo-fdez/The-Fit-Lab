function generarRutina(event) {
    event.preventDefault();

    obtenerApiKey().then(() => {
        // Una vez que se haya obtenido la API key, podemos usarla
        //console.log(apiKey);

        // Aquí puedes continuar con el resto de tu código que depende de la API key.
        // Deshabilita el botón y muestra un indicador de carga
        var btnGenerarRutina = document.getElementById('btnGenerarRutina');
        btnGenerarRutina.disabled = true;
        btnGenerarRutina.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Generando...';
        // Recoge los valores de los campos del formulario
        var nivel = document.getElementById("nivel").value;
        var altura = document.getElementById("altura").value;
        var peso = document.getElementById("peso").value;
        var peso_deseado = document.getElementById("peso_deseado").value;
        var dias_semana = document.getElementById("dias_semana").value;
        var entorno = document.getElementById("entorno").value;
        var objetivo = document.getElementById("objetivo").value;

        formato = 'Peso inicial: (peso), peso deseado: (peso deseado), con el objetivo: (objetivo) y entrenando desde: (entorno de entrenamiento). <br> Día (número de día correspondiente) (todos los ejercicios variados que deba realizar el usuario con el siguiente formato): (numero de repeticiones) x (número de series) <br> (incluyendo también los <br>)'

        var apiUrl = 'https://api.openai.com/v1/chat/completions';
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        };

        var data = {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'Eres un bot que responde en función a una serie de cualidades con una rutina adecuada, siempre tus respuestas tienen el siguiente formato, ningún otro: ' + formato },
                { role: 'user', content: 'Genera una rutina de entrenamiento para un usuario con nivel: ' + nivel + ', altura: ' + altura + ' cm, peso: ' + peso + ' kg, peso deseado: ' + peso_deseado + ' kg, entrenando ' + dias_semana + ' días a la semana, en entorno de ' + entorno + ' y con objetivo ' + objetivo + '.' },
            ]
        };

        fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                var respuestaGenerada = result.choices[0].message.content;
                console.log(respuestaGenerada);

                // Reemplaza las líneas nuevas con un solo <br>
                respuestaGenerada = respuestaGenerada.replace(/\n+/g, '<br>');

                // Agrega títulos para los días
                respuestaGenerada = respuestaGenerada.replace(/Día (\d+):/g, '<br><strong>Día $1:</strong>');

                // Elimina <br> al principio y al final de la cadena si los hay
                respuestaGenerada = respuestaGenerada.replace(/^<br>/, '').replace(/<br>$/, '');

                // Actualiza el contenido del modal
                var rutinaModalBody = document.getElementById('rutinaModalBody');
                rutinaModalBody.innerHTML = respuestaGenerada;

                // Muestra el modal
                $('#rutinaModal').modal('show');

                // Habilita nuevamente el botón después de recibir la respuesta
                btnGenerarRutina.disabled = false;
                btnGenerarRutina.innerHTML = 'Generar Rutina';
            })
            .catch(error => console.error('Error:', error));
    });

}

function guardarRutina() {
    var nivel = document.getElementById("nivel").value;
    var altura = document.getElementById("altura").value;
    var peso = document.getElementById("peso").value;
    var peso_deseado = document.getElementById("peso_deseado").value;
    var dias_semana = document.getElementById("dias_semana").value;
    var entorno = document.getElementById("entorno").value;
    var objetivo = document.getElementById("objetivo").value;

    // Obtén la rutina del modal
    var rutina = document.getElementById('rutinaModalBody').textContent;
    var tituloRutinaInput = document.getElementById('tituloRutina');
    var tituloRutina = tituloRutinaInput.value;

    // Verifica si el título está vacío
    if (tituloRutina.trim() === "") {
        // Muestra el mensaje de error y resalta el borde del input
        document.getElementById('errorTitulo').textContent = 'Por favor, ingresa un título para la rutina.';
        tituloRutinaInput.style.borderColor = 'red';
        return;
    } else {
        // Limpia el mensaje de error y restablece el borde del input
        document.getElementById('errorTitulo').textContent = '';
        tituloRutinaInput.style.borderColor = ''; // Dejar que el navegador maneje el estilo del borde
    }

    // Construye un objeto con los datos a enviar
    var data = {
        nivel: nivel,
        altura: altura,
        peso: peso,
        peso_deseado: peso_deseado,
        dias_semana: dias_semana,
        entorno: entorno,
        objetivo: objetivo,
        titulo: tituloRutina,
        rutina: rutina
    };

    // Envía la rutina y los datos al servidor PHP para su inserción
    fetch('../back/guardar_rutina.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Rutina guardada:', data);

            // Muestra un mensaje de éxito con SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Rutina guardada con éxito',
                text: 'Título: ' + data.titulo,
            });

            // Cierra el modal después de guardar
            $('#rutinaModal').modal('hide');
        })
        .catch(error => {
            console.error('Error:', error);
            // Muestra un mensaje de error con SweetAlert si hay un problema
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al guardar la rutina. Por favor, inténtalo de nuevo.',
            });
        });

    // Cierra el modal después de guardar
    $('#rutinaModal').modal('hide');
}
