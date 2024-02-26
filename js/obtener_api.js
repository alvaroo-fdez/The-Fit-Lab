// Variable para almacenar la API key
let apiKey; 

// Función asincrónica para obtener la API key desde el servidor
async function obtenerApiKey() {
    try {
        // Realizamos una solicitud a la ruta '../back/recoger_api.php' para obtener la API key
        const response = await fetch('../back/recoger_api.php');
        console.log('Response:', response);

        // Parseamos la respuesta como JSON para obtener la API key
        const data = await response.json();
        apiKey = data.api_key; // Almacenamos la API key en la variable global
    } catch (error) {
        console.error('Error al obtener la API key:', error); // Capturar y mostrar errores en la consola
    }
}