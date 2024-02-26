<?php
require_once 'Conexion.php';
// Recibimos los datos enviados por la solicitud AJAX
$data = json_decode(file_get_contents("php://input"));

try {
    // Instancia de una nueva conexión
    $conn = new Conexion();
    
    // Establecemos el modo de error PDO
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Prepararamos la consulta SQL para la inserción de la dieta
    $stmt = $conn->prepare("INSERT INTO dietas (usuario_id, titulo, nivel, altura, peso, peso_deseado, edad, sexo, objetivo, requisitos, dieta) 
                            VALUES (:usuario_id,:titulo, :nivel, :altura, :peso, :peso_deseado, :edad, :sexo, :objetivo, :requisitos, :dieta)");
    
    // Bind de los parámetros
    $stmt->bindParam(':usuario_id', $_COOKIE['id']);
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
    
    // Ejecutamos la consulta
    $stmt->execute();

    // Obtenemos el ID de la nueva dieta insertada
    $dieta_id = $conn->lastInsertId();

    // Construimos una respuesta extiosa
    $response = array('mensaje' => 'Dieta generada con éxito.', 'dieta_id' => $dieta_id);

    // Enviamos la respuesta al cliente
    header('Content-Type: application/json');
    echo json_encode($response);
} catch(PDOException $e) {
    // Manejo de errores de la conexión o de la consulta
    $response = array('error' => 'Error al generar la dieta: ' . $e->getMessage());

    // Enviamos la respuesta de error al cliente
    header('Content-Type: application/json', true, 500);
    echo json_encode($response);
}

// Cierre de conexión
$conn = null;
?>
