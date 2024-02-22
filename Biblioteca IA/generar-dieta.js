// Función para generar una dieta al hacer clic en el botón correspondiente
function generarDieta(event) {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario

    // Obtiene la clave de la API antes de continuar
    obtenerApiKey().then(() => {
        // Deshabilita el botón y muestra un indicador de carga
        var btnGenerarDieta = document.getElementById('btnGenerarDieta');
        btnGenerarDieta.disabled = true;
        btnGenerarDieta.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Generando...';

        // Obtiene los datos del usuario desde el formulario
        var datosUsuario = obtenerDatosUsuario();

        // Construye el formato de la dieta para incluirlo en la solicitud a la API
        let formato = construirFormatoDieta();

        // URL y encabezados para la solicitud a la API de OpenAI
        var apiUrl = 'https://api.openai.com/v1/chat/completions';
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        };

        // Datos para la solicitud a la API
        var data = {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'Eres un bot que responde en función a una serie de cualidades con una dieta adecuada, siempre tus respuestas tienen el siguiente formato, ningún otro: ' + formato },
                { role: 'user', content: 'Genera una dieta para un usuario de sexo ' + datosUsuario.sexo + ', con nivel: ' + datosUsuario.nivel + ', altura: ' + datosUsuario.altura + ' cm, peso: ' + datosUsuario.peso + ' kg, peso deseado: ' + datosUsuario.peso_deseado + ', con: ' + datosUsuario.edad + ' años, con el objetivo ' + datosUsuario.objetivo + ' y con los siguientes requisitos personales (si los hay): ' + datosUsuario.requisitos + '.' },
            ]
        };

        // Realiza la solicitud a la API utilizando fetch
        fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                // Obtiene la respuesta generada por el modelo
                var respuestaGenerada = result.choices[0].message.content;
                console.log(respuestaGenerada);

                // Actualiza el contenido del modal con la respuesta generada
                var rutinaModalBody = document.getElementById('rutinaModalBody');
                rutinaModalBody.innerHTML = respuestaGenerada;

                // Muestra el modal con la respuesta generada
                $('#rutinaModal').modal('show');

                // Habilita nuevamente el botón después de recibir la respuesta
                btnGenerarDieta.disabled = false;
                btnGenerarDieta.innerHTML = 'Generar Dieta';
            })
            .catch(error => console.error('Error:', error));
    });
}

// Función para guardar la dieta generada
function guardarDieta() {
    // Obtiene los datos del usuario desde el formulario
    var datosUsuario = obtenerDatosUsuario();

    // Obtiene la dieta generada del modal
    var dieta = document.getElementById('rutinaModalBody').innerHTML;
    var tituloRutinaInput = document.getElementById('tituloRutina');
    var tituloRutina = tituloRutinaInput.value;

    // Verifica si el título está vacío
    if (tituloRutina.trim() === "") {
        // Muestra el mensaje de error y resalta el borde del input
        document.getElementById('errorTitulo').textContent = 'Por favor, ingresa un título para la dieta.';
        tituloRutinaInput.style.borderColor = 'red';
        return;
    } else {
        // Limpia el mensaje de error y restablece el borde del input
        document.getElementById('errorTitulo').textContent = '';
        tituloRutinaInput.style.borderColor = ''; // Dejar que el navegador maneje el estilo del borde
    }

    // Construye un objeto con los datos a enviar al servidor
    var data = {
        nivel: datosUsuario.nivel,
        altura: datosUsuario.altura,
        peso: datosUsuario.peso,
        peso_deseado: datosUsuario.peso_deseado,
        edad: datosUsuario.edad,
        sexo: datosUsuario.sexo,
        objetivo: datosUsuario.objetivo,
        titulo: tituloRutina,
        requisitos: datosUsuario.requisitos,
        dieta: dieta
    };

    // Envía la dieta y los datos al servidor PHP para su inserción
    fetch('../back/guardar_dieta.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Dieta guardada:', data);

            // Muestra un mensaje de éxito con SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Dieta guardada con éxito',
                text: 'Título: ' + tituloRutina,
            });

            // Limpia los campos del formulario
            limpiarCampos();

            // Cierra el modal después de guardar
            $('#rutinaModal').modal('hide');
        })
        .catch(error => {
            console.error('Error:', error);
            // Muestra un mensaje de error con SweetAlert si hay un problema
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al guardar la dieta. Por favor, inténtalo de nuevo.',
            });
        });

    // Cierra el modal después de guardar
    $('#rutinaModal').modal('hide');
}

// Función para construir el formato de la dieta en HTML
function construirFormatoDieta() {
    let formatoDieta = "<table>\
    <tr>\
    <td></td>\
      <td>Lunes</td>\
      <td>Martes</td>\
      <td>Miércoles</td>\
      <td>Jueves</td>\
      <td>Viernes</td>\
      <td>Sábado</td>\
      <td>Domingo</td>\
    </tr>\
    <tr>\
      <td>Desayuno</td>\
      <td>(Desayuno Lunes)(cantidad de comida)</td>\
      <td>(Desayuno Martes)(cantidad de comida)</td>\
      <td>(Desayuno Miércoles)(cantidad de comida)</td>\
      <td>(Desayuno Jueves)(cantidad de comida)</td>\
      <td>(Desayuno Viernes)(cantidad de comida)</td>\
      <td>(Desayuno Sábado)(cantidad de comida)</td>\
      <td>(Desayuno Domingo)(cantidad de comida)</td>\
    </tr>\
    <tr>\
      <td>Comida</td>\
      <td>(Comida Lunes)(cantidad de comida)</td>\
      <td>(Comida Martes)(cantidad de comida)</td>\
      <td>(Comida Miércoles)(cantidad de comida)</td>\
      <td>(Comida Jueves)(cantidad de comida)</td>\
      <td>(Comida Viernes)(cantidad de comida)</td>\
      <td>(Comida Sábado)(cantidad de comida)</td>\
      <td>(Comida Domingo)(cantidad de comida)</td>\
    </tr>\
    <tr>\
      <td>Merienda</td>\
      <td>(Merienda Lunes)(cantidad de comida)</td>\
      <td>(Merienda Martes)(cantidad de comida)</td>\
      <td>(Merienda Miércoles)(cantidad de comida)</td>\
      <td>(Merienda Jueves)(cantidad de comida)</td>\
      <td>(Merienda Viernes)(cantidad de comida)</td>\
      <td>(Merienda Sábado)(cantidad de comida)</td>\
      <td>(Merienda Domingo)(cantidad de comida)</td>\
    </tr>\
    <tr>\
      <td>Cena</td>\
      <td>(Cena Lunes)(cantidad de comida)</td>\
      <td>(Cena Martes)(cantidad de comida)</td>\
      <td>(Cena Miércoles)(cantidad de comida)</td>\
      <td>(Cena Jueves)(cantidad de comida)</td>\
      <td>(Cena Viernes)(cantidad de comida)</td>\
      <td>(Cena Sábado)(cantidad de comida)</td>\
      <td>(Cena Domingo)(cantidad de comida)</td>\
    </tr>\
  </table>";
    return formatoDieta;
}

// Función para obtener los datos del usuario desde el formulario
function obtenerDatosUsuario() {
    return {
        nivel: document.getElementById("nivel").value,
        altura: document.getElementById("altura").value,
        peso: document.getElementById("peso").value,
        peso_deseado: document.getElementById("peso_deseado").value,
        edad: document.getElementById("edad").value,
        sexo: document.getElementById("sexo").value,
        objetivo: document.getElementById("objetivo").value,
        requisitos: document.getElementById("requisitos").value,
    };
}

// Función para limpiar los campos del formulario
function limpiarCampos() {
    document.getElementById('nivel').value = '';
    document.getElementById('altura').value = '';
    document.getElementById('peso').value = '';
    document.getElementById('peso_deseado').value = '';
    document.getElementById('edad').value = '';
    document.getElementById('sexo').value = '';
    document.getElementById('objetivo').value = '';
    document.getElementById('requisitos').value = '';
}
