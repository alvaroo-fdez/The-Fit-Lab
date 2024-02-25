var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

recognition.onresult = function (event) {
    input = document.getElementById('user-message-input')

    var current = event.resultIndex;

    var transcript = event.results[current][0].transcript;

    input.value = transcript;
}

botonmic = document.getElementById('boton-mic');

botonmic.onclick = function (event) {
    recognition.start();
    console.log('start');
}