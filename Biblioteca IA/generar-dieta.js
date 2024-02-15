function generarDieta(event) {
    event.preventDefault();

    obtenerApiKey().then(() => {
        // Una vez que se haya obtenido la API key, podemos usarla
        //console.log(apiKey);

        // Aquí puedes continuar con el resto de tu código que depende de la API key.
        // Deshabilita el botón y muestra un indicador de carga
        var btnGenerarDieta = document.getElementById('btnGenerarDieta');
        btnGenerarDieta.disabled = true;
        btnGenerarDieta.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Generando...';
        // Recoge los valores de los campos del formulario
        var nivel = document.getElementById("nivel").value;
        var altura = document.getElementById("altura").value;
        var peso = document.getElementById("peso").value;
        var peso_deseado = document.getElementById("peso_deseado").value;
        var edad = document.getElementById("edad").value;
        var sexo = document.getElementById("sexo").value;
        var objetivo = document.getElementById("objetivo").value;
        var requisitos = document.getElementById("requisitos").value;

        var formato = 'Sexo: (sexo), Nivel: (nivel), Altura: (altura) cm, Peso inicial: (peso) kg, peso deseado: (peso deseado) kg, con (edad) años, con el objetivo de: (objetivo) y los siguientes requisitos: (requisitos). Debe comer (número de calorías necesarias para lograr el objetivo con los datos proporcionados) calorías, (gramos de proteína) gramos de proteína, (gramos de carbohidratos) gramos de carbohidratos y (gramos de grasas) gramos de grasas. <br> Día (número de día correspondiente) <br> -(Momento de día como desayuno, almuerzo, etc.) <br> (Comida a realizar) (Proporcióname detalles para todos los días de la semana.)';

        var apiUrl = 'https://api.openai.com/v1/chat/completions';
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        };

        var data = {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'Eres un bot que responde en función a una serie de cualidades con una dieta adecuada, siempre tus respuestas tienen el siguiente formato, ningún otro: ' + formato },
                { role: 'user', content: 'Genera una dieta para un usuario de sexo ' + sexo + ', con nivel: ' + nivel + ', altura: ' + altura + ' cm, peso: ' + peso + ' kg, peso deseado: ' + peso_deseado + ', con: ' + edad + ' años, con el objetivo ' + objetivo + ' y con los siguientes requisitos personales: ' + requisitos + '. Asegúrate de que la dieta incluya un número apropiado de calorías para lograr el objetivo y ajusta las proporciones de proteínas, carbohidratos y grasas según sea necesario.' },
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
                respuestaGenerada = respuestaGenerada.replace(/Día (\d+)/g, '<br><strong>Día $1:</strong>');

                // Elimina <br> al principio y al final de la cadena si los hay
                respuestaGenerada = respuestaGenerada.replace(/^<br>/, '').replace(/<br>$/, '');

                // Elimina <br> entre títulos y detalles de la tabla
                respuestaGenerada = respuestaGenerada.replace(/<\/strong><br><strong>/g, '</strong>');

                // Actualiza el contenido del modal
                var rutinaModalBody = document.getElementById('rutinaModalBody');
                rutinaModalBody.innerHTML = respuestaGenerada;

                // Muestra el modal
                $('#rutinaModal').modal('show');

                // Habilita nuevamente el botón después de recibir la respuesta
                btnGenerarDieta.disabled = false;
                btnGenerarDieta.innerHTML = 'Generar Dieta';
            })
            .catch(error => console.error('Error:', error));
    });

}

function guardarDieta() {
    var nivel = document.getElementById("nivel").value;
    var altura = document.getElementById("altura").value;
    var peso = document.getElementById("peso").value;
    var peso_deseado = document.getElementById("peso_deseado").value;
    var edad = document.getElementById("edad").value;
    var sexo = document.getElementById("sexo").value;
    var objetivo = document.getElementById("objetivo").value;
    var requisitos = document.getElementById("requisitos").value;

    // Obtén la rutina del modal
    var dieta = document.getElementById('rutinaModalBody').textContent;
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

    // Construye un objeto con los datos a enviar
    var data = {
        nivel: nivel,
        altura: altura,
        peso: peso,
        peso_deseado: peso_deseado,
        edad: edad,
        sexo: sexo,
        objetivo: objetivo,
        titulo: tituloRutina,
        requisitos: requisitos,
        dieta: dieta
    };

    // Envía la rutina y los datos al servidor PHP para su inserción
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
