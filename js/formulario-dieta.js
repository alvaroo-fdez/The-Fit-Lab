document.addEventListener("DOMContentLoaded", function () {
    // Asignar un evento al formulario cuando se envía
    document.querySelector('#dietaForm').addEventListener('submit', function (event) {
        event.preventDefault();
        // Validar cada campo antes de enviar el formulario
        var nivel = document.getElementById('nivel').value;
        var altura = document.getElementById('altura').value;
        var peso = document.getElementById('peso').value;
        var pesoDeseado = document.getElementById('peso_deseado').value;
        var edad = document.getElementById('edad').value;
        var sexo = document.getElementById('sexo').value;
        var objetivo = document.getElementById('objetivo').value;
        var requisitos = document.getElementById('requisitos').value;

        var formIsValid = true;

        // Resetear estilos de los campos
        resetFormStyles();

        // Validar cada campo
        if (!nivel) {
            setError('nivel', 'Por favor, selecciona un nivel.');
            formIsValid = false;
        }
        if (!altura) {
            setError('altura', 'Por favor, introduce tu altura.');
            formIsValid = false;
        }
        if (!peso) {
            setError('peso', 'Por favor, introduce tu peso.');
            formIsValid = false;
        }
        if (!pesoDeseado) {
            setError('peso_deseado', 'Por favor, introduce tu peso deseado.');
            formIsValid = false;
        }
        if (!edad) {
            setError('edad', 'Por favor, introduce tu edad.');
            formIsValid = false;
        }
        if (!sexo) {
            setError('sexo', 'Por favor, selecciona un sexo.');
            formIsValid = false;
        }
        if (!objetivo) {
            setError('objetivo', 'Por favor, selecciona un objetivo.');
            formIsValid = false;
        }
        if (!requisitos) {
            setError('requisitos', 'Por favor, indica cosas necesarias a la hora de generar tu dieta.');
            formIsValid = false;
        }


        // Detener el envío del formulario si hay campos vacíos
        if (!formIsValid) {
            event.preventDefault();
        } else {
            // Lógica adicional para procesar la generación de la dieta
            generarDieta(nivel, altura, peso, pesoDeseado, edad, sexo, objetivo, requisitos);
        }
    });
});

// Función para establecer un mensaje de error y cambiar el estilo del campo
function setError(id, message) {
    var input = document.getElementById(id);
    input.style.borderColor = 'red';

    var errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;

    var formGroup = input.closest('.form-group');
    formGroup.appendChild(errorMessage);
}

// Función para resetear los estilos y eliminar los mensajes de error
function resetFormStyles() {
    var inputs = document.querySelectorAll('input, select');
    inputs.forEach(function (input) {
        input.style.borderColor = '';
        var formGroup = input.closest('.form-group');
        var errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            formGroup.removeChild(errorMessage);
        }
    });
}