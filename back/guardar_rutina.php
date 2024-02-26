<?php
require_once 'Conexion.php';
// Recibe los datos enviados por la solicitud AJAX
$data = json_decode(file_get_contents("php://input"));

try {
    // Creamos una nueva conexión PDO
    $conn = new Conexion();
    
    // Establecemos el modo de error PDO a excepción
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Preparamos la consulta SQL para la inserción de la rutina
    $stmt = $conn->prepare("INSERT INTO rutinas (usuario_id, titulo, nivel, altura, peso, peso_deseado, dias_semana, sexo, entorno_entrenamiento, objetivo, rutina) 
                            VALUES (:usuario_id, :titulo, :nivel, :altura, :peso, :peso_deseado, :dias_semana, :sexo, :entorno_entrenamiento, :objetivo, :rutina)");

    // Bind de los parámetros
    $stmt->bindParam(':usuario_id', $_COOKIE['id']);
    $stmt->bindParam(':titulo', $data->titulo);
    $stmt->bindParam(':nivel', $data->nivel);
    $stmt->bindParam(':altura', $data->altura);
    $stmt->bindParam(':peso', $data->peso);
    $stmt->bindParam(':peso_deseado', $data->peso_deseado);
    $stmt->bindParam(':dias_semana', $data->dias_semana);
    $stmt->bindParam(':sexo', $data->sexo);
    $stmt->bindParam(':entorno_entrenamiento', $data->entorno);
    $stmt->bindParam(':objetivo', $data->objetivo);
    $stmt->bindParam(':rutina', $data->rutina);

    // Ejecutamos la consulta
    $stmt->execute();

    // Obtenemos el ID de la nueva rutina insertada
    $rutina_id = $conn->lastInsertId();

    // Construimos una respuesta exitosa
    $response = array('titulo' => $data->titulo, 'mensaje' => 'Rutina guardada con éxito.', 'rutina_id' => $rutina_id);

    // Enviamos la respuesta al cliente
    header('Content-Type: application/json');
    echo json_encode($response);
}catch(PDOException $e) {
    // Manejo errores de la conexión o de la consulta
    $response = array('error' => 'Error al guardar la rutina: ' . $e->getMessage());

    // Enviamos la respuesta de error al cliente
    header('Content-Type: application/json', true, 500);
    echo json_encode($response);
}

// Cierre de conexión
$conn = null;
?>