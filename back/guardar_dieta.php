<?php
// guardar_dieta.php

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
    
    // Preparar la consulta SQL para la inserción de la dieta
    $stmt = $conn->prepare("INSERT INTO dietas (usuario_id, titulo, nivel, altura, peso, peso_deseado, edad, sexo, objetivo, requisitos, dieta) 
                            VALUES (:usuario_id,:titulo, :nivel, :altura, :peso, :peso_deseado, :edad, :sexo, :objetivo, :requisitos, :dieta)");
    
    // Bind de los parámetros
    $stmt->bindParam(':usuario_id', $data->usuario_id);
    $stmt->bindParam(':titulo', $data->titulo);
    $stmt->bindParam(':nivel', $data->nivel);
    $stmt->bindParam(':altura', $data->altura);
    $stmt->bindParam(':peso', $data->peso);
    $stmt->bindParam(':peso_deseado', $data->peso_deseado);
    $stmt->bindParam(':edad', $data->edad);
    $stmt->bindParam(':sexo', $data->sexo);
    $stmt->bindParam(':objetivo', $data->objetivo);
    $stmt->bindParam(':requisitos', $data->requisitos);
    $stmt->bindParam(':dieta', $data->dieta);
    
    // Ejecutar la consulta
    $stmt->execute();

    // Obtener el ID de la nueva dieta insertada
    $dieta_id = $conn->lastInsertId();

    // Construir una respuesta de éxito
    $response = array('mensaje' => 'Dieta generada con éxito.', 'dieta_id' => $dieta_id);

    // Enviar la respuesta al cliente
    header('Content-Type: application/json');
    echo json_encode($response);
} catch(PDOException $e) {
    // Manejar errores de la conexión o de la consulta
    $response = array('error' => 'Error al generar la dieta: ' . $e->getMessage());

    // Enviar la respuesta de error al cliente
    header('Content-Type: application/json', true, 500);
    echo json_encode($response);
}

// Cerrar la conexión
$conn = null;
?>
