let apiKey;

async function obtenerApiKey() {
    try {
        const response = await fetch('../back/recoger_api.php');
        console.log('Response:', response);

        const data = await response.json();
        apiKey = data.api_key;
        //console.log('API Key:', apiKey);
    } catch (error) {
        console.error('Error al obtener la API key:', error);
    }
}
