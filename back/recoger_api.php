<?php
// Cargar las variables de entorno desde el archivo .env (ajusta la ruta según tu estructura)
$dotenvPath = __DIR__ . '/../.env';
if (file_exists($dotenvPath)) {
    $dotenv = parse_ini_file($dotenvPath);
    foreach ($dotenv as $key => $value) {
        putenv("$key=$value");
    }
}

header('Content-Type: application/json');

$api_key = getenv('API_KEY');

// Verifica si la API key es válida y no es false
if ($api_key !== false) {
    echo json_encode(['api_key' => $api_key]);
} else {
    echo json_encode(['api_key' => null]);
}
?>
