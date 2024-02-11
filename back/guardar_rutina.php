<?php
// guardar_rutina.php

// Recibe los datos enviados por la solicitud AJAX
$data = json_decode(file_get_contents("php://input"));

// Configuración de la conexión a la base de datos (ajusta los valores según tu entorno)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "the fit lab";

try {
    // Crear una nueva conexión PDO
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    
    // Establecer el modo de error PDO a excepción
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Preparar la consulta SQL para la inserción de la rutina
    $stmt = $conn->prepare("INSERT INTO rutinas (usuario_id, titulo, nivel, altura, peso, peso_deseado, dias_semana, entorno_entrenamiento, objetivo) 
                            VALUES (:usuario_id, :titulo, :nivel, :altura, :peso, :peso_deseado, :dias_semana, :entorno_entrenamiento, :objetivo)");
    
    // Bind de los parámetros
    $stmt->bindParam(':usuario_id', $data->usuario_id);
    $stmt->bindParam(':titulo', $data->titulo);
    $stmt->bindParam(':nivel', $data->nivel);
    $stmt->bindParam(':altura', $data->altura);
    $stmt->bindParam(':peso', $data->peso);
    $stmt->bindParam(':peso_deseado', $data->peso_deseado);
    $stmt->bindParam(':dias_semana', $data->dias_semana);
    $stmt->bindParam(':entorno_entrenamiento', $data->entorno);
    $stmt->bindParam(':objetivo', $data->objetivo);
    
    // Ejecutar la consulta
    $stmt->execute();

    // Obtener el ID de la nueva rutina insertada
    $rutina_id = $conn->lastInsertId();

    // Construir una respuesta de éxito
    $response = array('titulo' => $data->titulo, 'mensaje' => 'Rutina guardada con éxito.', 'rutina_id' => $rutina_id);

    // Enviar la respuesta al cliente
    header('Content-Type: application/json');
    echo json_encode($response);
}catch(PDOException $e) {
    // Manejar errores de la conexión o de la consulta
    $response = array('error' => 'Error al guardar la rutina: ' . $e->getMessage());

    // Enviar la respuesta de error al cliente
    header('Content-Type: application/json', true, 500);
    echo json_encode($response);
}

// Cerrar la conexión
$conn = null;
?>
