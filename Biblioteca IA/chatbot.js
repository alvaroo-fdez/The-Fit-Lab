function sendMessage() {
    // Obtenemos el mensaje del usuario desde el input
    var userMessageInput = document.getElementById('user-message-input');
    var userMessage = userMessageInput.value;

    if (userMessage.trim() !== "") {
        // Añade el mensaje del usuario al contenedor de chat
        appendMessage('send-chat', userMessage);

        // Llama a la función para generar la respuesta usando la API de OpenAI
        generarRespuestaChatgpt(userMessage);

        // Vacía el input después de enviar el mensaje
        userMessageInput.value = "";
    }
}

// Función para formatear el texto de respuesta
function formatearRespuesta(response) {
    // Reemplazar los saltos de línea específicos de OpenAI con etiquetas <br>
    response = response.replace(/\n/g, '<br>');
    return response;
}

function appendMessage(className, message) {
    // Crea un nuevo elemento de mensaje
    var messageElement = document.createElement('div');
    messageElement.className = 'row m-b-20 ' + className;

    // Formatea el mensaje antes de insertarlo
    var formattedMessage = formatearRespuesta(message);

    messageElement.innerHTML = `
        <div class="col">
            <div class="msg">
                <p class="m-b-0">${formattedMessage}</p>
            </div>
            <p class="text-muted m-b-0"><i class="fa fa-clock-o m-r-10"></i>${horaActual()}</p>
        </div>
    `;

    // Añade el nuevo elemento al contenedor de chat
    document.getElementById('chat-container').appendChild(messageElement);
}

function generarRespuestaChatgpt(userMessage) {
    obtenerApiKey().then(() => {
        // Mostrar el indicador de carga dentro del área del chat
        document.getElementById('loading-indicator').style.display = 'block';

        // Lógica para llamar a la API de OpenAI y manejar la respuesta
        var apiUrl = 'https://api.openai.com/v1/chat/completions';
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        };

        var data = {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'Eres un entrenador personal llamado TheFitLab, con el propósito de ayudar a la gente para alcanzar sus resultados deportivos. Responderás a todo tipo de preguntas e incógnitas que tenga una persona, como la rutina que debe seguir en función de su peso y altura, lo que tiene que comer y buenos hábitos para ayudarle de todas las formas posibles. Enfócate en tratar a la persona como un entrenador personal.' },
                { role: 'user', content: userMessage }
            ]
        };

        fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                var assistantResponse = result.choices[0].message.content;
                // Añade la respuesta del asistente al contenedor de chat
                appendMessage('received-chat', assistantResponse);
            })
            .catch(error => console.error('Error:', error))
            .finally(() => {
                // Ocultar el indicador de carga dentro del área del chat después de completar la solicitud
                document.getElementById('loading-indicator').style.display = 'none';
            });
    });
}

function horaActual() {
    // Obtiene la hora actual en el formato hh:mm
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

function presionarEnter(event) {
    // Si la tecla presionada es Enter, llama a la función sendMessage
    if (event.key === "Enter") {
        sendMessage();
    }
}