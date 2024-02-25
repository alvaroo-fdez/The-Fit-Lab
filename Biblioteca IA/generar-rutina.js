function generarRutina(event) {
    event.preventDefault();

    obtenerApiKey()
        .then(() => {
            deshabilitarBotonGenerarRutina();

            var datosUsuario = obtenerDatosUsuario();
            var formato = construirFormatoHTML(datosUsuario.dias_semana);

            var apiUrl = 'https://api.openai.com/v1/chat/completions';
            var headers = construirHeaders();
            var data = construirData(datosUsuario, formato);

            realizarPeticionApi(apiUrl, headers, data)
                .then(result => {
                    var respuestaGenerada = result.choices[0].message.content;
                    mostrarRutinaEnModal(respuestaGenerada);

                    habilitarBotonGenerarRutina();
                })
                .catch(error => {
                    console.error('Error:', error);
                    habilitarBotonGenerarRutina();
                });
        });
}

function deshabilitarBotonGenerarRutina() {
    var btnGenerarRutina = document.getElementById('btnGenerarRutina');
    btnGenerarRutina.disabled = true;
    btnGenerarRutina.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Generando...';
}

function habilitarBotonGenerarRutina() {
    var btnGenerarRutina = document.getElementById('btnGenerarRutina');
    btnGenerarRutina.disabled = false;
    btnGenerarRutina.innerHTML = 'Generar Rutina';
}

function obtenerDatosUsuario() {
    return {
        nivel: document.getElementById("nivel").value,
        altura: document.getElementById("altura").value,
        peso: document.getElementById("peso").value,
        peso_deseado: document.getElementById("peso_deseado").value,
        dias_semana: parseInt(document.getElementById("dias_semana").value),
        entorno: document.getElementById("entorno").value,
        objetivo: document.getElementById("objetivo").value,
        sexo: document.getElementById("sexo").value
    };
}

function construirFormatoHTML(dias_semana) {
    let formato = "<table>\
        <tbody>\
            <tr>\
                <td></td>";

    // Agregar días a la primera fila
    for (var i = 0; i < parseInt(dias_semana); i++) {
        formato += "<td>Día " + (i + 1) + "</td>";
    }

    formato += "</tr>";

    // Agregar filas para cada ejercicio
    for (var i = 1; i <= 5; i++) {
        formato += "<tr>\
        <td>Ejercicio " + i + "</td>";

        // Agregar celdas para cada día
        for (var j = 0; j < parseInt(dias_semana); j++) {
            formato += "<td>(Día " + (j + 1) + " Ejercicio " + i + ")</td>";
        }

        formato += "</tr>";
    }

    formato += "</tbody></table>";
    return formato;
}

function construirHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
    };
}

function construirData(datosUsuario, formato) {
    return {
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: 'Eres un bot que responde en función a una serie de cualidades con una rutina idónea, siempre tus respuestas tienen el siguiente formato, ningún otro: ' + formato },
            { role: 'user', content: 'Genera una rutina de entrenamiento para un usuario de sexo: ' + datosUsuario.sexo + ', nivel: ' + datosUsuario.nivel + ' altura: ' + datosUsuario.altura + ' cm, peso: ' + datosUsuario.peso + ' kg, peso deseado: ' + datosUsuario.peso_deseado + ' kg, entrenando ' + datosUsuario.dias_semana + ' días a la semana, en entorno de ' + datosUsuario.entorno + ' y con objetivo ' + datosUsuario.objetivo + '.  Incluye ejercicios para los principales grupos musculares (por ejemplo, pecho, espalda, piernas, etc.) y especifica el número de series y repeticiones para cada ejercicio.' },
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

function mostrarRutinaEnModal(respuestaGenerada) {
    var rutinaModalBody = document.getElementById('rutinaModalBody');
    rutinaModalBody.innerHTML = respuestaGenerada;

    $('#rutinaModal').modal('show');
}

function guardarRutina() {
    var datosUsuario = obtenerDatosUsuario();
    var tituloRutinaInput = document.getElementById('tituloRutina');
    var tituloRutina = tituloRutinaInput.value;

    if (validarTituloRutina(tituloRutina)) {
        var data = construirDatosEnvioServer(datosUsuario, tituloRutina);

        enviarRutinaAlServidor(data);
    }
}

function validarTituloRutina(tituloRutina) {
    var tituloRutinaInput = document.getElementById('tituloRutina');
    if (tituloRutina.trim() === "") {
        document.getElementById('errorTitulo').textContent = 'Por favor, ingresa un título para la rutina.';
        tituloRutinaInput.style.borderColor = 'red';
        return false;
    } else {
        document.getElementById('errorTitulo').textContent = '';
        tituloRutinaInput.style.borderColor = '';
        return true;
    }
}

function construirDatosEnvioServer(datosUsuario, tituloRutina) {
    return {
        nivel: datosUsuario.nivel,
        altura: datosUsuario.altura,
        peso: datosUsuario.peso,
        peso_deseado: datosUsuario.peso_deseado,
        dias_semana: datosUsuario.dias_semana,
        sexo: datosUsuario.sexo,
        entorno: datosUsuario.entorno,
        objetivo: datosUsuario.objetivo,
        titulo: tituloRutina,
        rutina: document.getElementById('rutinaModalBody').innerHTML
    };
}

function enviarRutinaAlServidor(data) {
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
            mostrarMensajeExito(data.titulo);
            limpiarCampos();
            $('#rutinaModal').modal('hide');
        })
        .catch(error => {
            console.error('Error:', error);
            mostrarMensajeError();
        });
}

function mostrarMensajeExito(titulo) {
    Swal.fire({
        icon: 'success',
        title: 'Rutina guardada con éxito',
        text: 'Título: ' + titulo,
    });
}

function mostrarMensajeError() {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al guardar la rutina. Por favor, inténtalo de nuevo.',
    });
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