<?php
require_once('../back/Conexion.php');
$data = json_decode(file_get_contents("php://input"));
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtenemos el ID de la rutina desde la solicitud
    $rutinaId = $_POST['rutinaId'];

    // Crear una instancia de la clase Conexion
    $conexion = new Conexion();

    // Realizar la eliminación en la base de datos
    $query = "DELETE FROM rutinas WHERE id = :rutinaId";
    $stmt = $conexion->prepare($query);
    $stmt->bindParam(':rutinaId', $rutinaId, PDO::PARAM_INT);
    
    // Mandamos la respuesta de la base de datos en formato json para manejarlo con js
    if ($stmt->execute()) {
        echo json_encode(['mensaje' => 'Rutina eliminada con éxito']);
    } else {
        echo json_encode(['error' => 'Error al eliminar la rutina' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Método de solicitud no permitido']);
}
?>