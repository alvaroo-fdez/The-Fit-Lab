function generarDieta(event) {
    event.preventDefault();

    obtenerApiKey().then(() => {
        deshabilitarBotonGenerarDieta();

        var datosUsuario = obtenerDatosUsuario();
        var formato = construirFormatoDieta();

        var apiUrl = 'https://api.openai.com/v1/chat/completions';
        var headers = construirHeaders();
        var data = construirDataDieta(datosUsuario, formato);

        realizarPeticionApi(apiUrl, headers, data)
            .then(result => {
                var respuestaGenerada = result.choices[0].message.content;
                mostrarDietaEnModal(respuestaGenerada);
                habilitarBotonGenerarDieta();
            })
            .catch(error => {
                console.error('Error:', error);
                habilitarBotonGenerarDieta();
            });
    });
}

function deshabilitarBotonGenerarDieta() {
    var btnGenerarDieta = document.getElementById('btnGenerarDieta');
    btnGenerarDieta.disabled = true;
    btnGenerarDieta.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Generando...';
}

function habilitarBotonGenerarDieta() {
    var btnGenerarDieta = document.getElementById('btnGenerarDieta');
    btnGenerarDieta.disabled = false;
    btnGenerarDieta.innerHTML = 'Generar Dieta';
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

function construirHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
    };
}

function construirDataDieta(datosUsuario, formato) {
    return {
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: 'Eres un bot que responde en función a una serie de cualidades con una dieta adecuada, siempre tus respuestas tienen el siguiente formato, ningún otro: ' + formato },
            { role: 'user', content: 'Genera una dieta para un usuario de sexo ' + datosUsuario.sexo + ', con nivel: ' + datosUsuario.nivel + ', altura: ' + datosUsuario.altura + ' cm, peso: ' + datosUsuario.peso + ' kg, peso deseado: ' + datosUsuario.peso_deseado + ', con: ' + datosUsuario.edad + ' años, con el objetivo ' + datosUsuario.objetivo + ' y con los siguientes requisitos personales (si los hay): ' + datosUsuario.requisitos + '.' },
        ]
    };
}

async function realizarPeticionApi(apiUrl, headers, data) {
    return fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
        .then(response => response.json());
}

function mostrarDietaEnModal(respuestaGenerada) {
    var rutinaModalBody = document.getElementById('rutinaModalBody');
    rutinaModalBody.innerHTML = respuestaGenerada;

    $('#rutinaModal').modal('show');
}

// Función para guardar la dieta generada
function guardarDieta() {
    var data;
    var datosUsuario = obtenerDatosUsuario();
    var tituloRutinaInput = document.getElementById('tituloRutina');
    var tituloRutina = tituloRutinaInput.value;
    var respuestamodal = document.getElementById('rutinaModalBody').innerHTML

    if (respuestamodal.includes('<table>')) {
        // Extraer el contenido de la tabla
        var inicioTabla = respuestamodal.indexOf('<table>');
        var finTabla = respuestamodal.indexOf('</table>') + '</table>'.length;
        var contenidoTabla = respuestamodal.substring(inicioTabla, finTabla);

        // Construir los datos para enviar al servidor
        if (validarTituloRutina(tituloRutina)) {
            data = construirDatosEnvioServerDieta(datosUsuario, tituloRutina, contenidoTabla);

            enviarDietaAlServidor(data);
        }

    } else {
        // Si no hay una etiqueta <table>, puedes deshabilitar el botón o manejarlo de otra manera
        return;
    }
}

function validarTituloRutina(tituloRutina) {
    var tituloRutinaInput = document.getElementById('tituloRutina');
    if (tituloRutina.trim() === "") {
        document.getElementById('errorTitulo').textContent = 'Por favor, ingresa un título para la dieta.';
        tituloRutinaInput.style.borderColor = 'red';
        return false;
    } else {
        document.getElementById('errorTitulo').textContent = '';
        tituloRutinaInput.style.borderColor = '';
        return true;
    }
}

function construirDatosEnvioServerDieta(datosUsuario, tituloRutina, contenidoTabla) {
    return {
        nivel: datosUsuario.nivel,
        altura: datosUsuario.altura,
        peso: datosUsuario.peso,
        peso_deseado: datosUsuario.peso_deseado,
        edad: datosUsuario.edad,
        sexo: datosUsuario.sexo,
        objetivo: datosUsuario.objetivo,
        titulo: tituloRutina,
        requisitos: datosUsuario.requisitos,
        dieta: contenidoTabla
    };
}

function enviarDietaAlServidor(data) {
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
            mostrarMensajeExito();
            limpiarCampos();
            $('#rutinaModal').modal('hide');
        })
        .catch(error => {
            console.error('Error:', error);
            mostrarMensajeError();
        });
}

function mostrarMensajeExito() {
    Swal.fire({
        icon: 'success',
        title: 'Dieta guardada con éxito',
        text: 'Título: ' + document.getElementById('tituloRutina').value,
    });
    var tituloRutinaInput = document.getElementById('tituloRutina');
    tituloRutinaInput.value = '';
}

function mostrarMensajeError() {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al guardar la dieta. Por favor, inténtalo de nuevo.',
    });
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
    var elementos = ['nivel', 'altura', 'peso', 'peso_deseado', 'edad', 'sexo', 'objetivo', 'requisitos'];

    elementos.forEach(function (elementoId) {
        var elemento = document.getElementById(elementoId);
        if (elemento) {
            elemento.value = '';
        }
    });
}