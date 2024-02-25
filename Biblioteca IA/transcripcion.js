// Verificamos si el navegador es compatible con la API de reconocimiento de voz y asignamos la implementación correspondiente
var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
console.log(SpeechRecognition);
if (SpeechRecognition) {
    // Instancia de SpeechRecognition
    var recognition = new SpeechRecognition();

    // Input donde se monstrará la transcripción
    input = document.getElementById('user-message-input')

    // Configuramos el evento onresult que se activa cuando se obtienen resultados del reconocimiento de voz
    recognition.onresult = function (event) {

        // Obtenemos el índice del resultado actual
        var current = event.resultIndex;

        // Obtenemos la transcripción del resultado actual
        var transcript = event.results[current][0].transcript;

        // Asignamos la transcripción al valor del elemento de entrada de texto
        input.value = transcript;
    }

    // Obtenemos la referencia al botón que activará el reconocimiento de voz
    botonmic = document.getElementById('boton-mic');

    // Configuramos el evento onclick del botón para iniciar el reconocimiento de voz
    botonmic.onclick = function (e) {
        // Iniciamos el reconocimiento de voz
        recognition.start();
    }
}

