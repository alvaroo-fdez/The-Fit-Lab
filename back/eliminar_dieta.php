<?php
require_once('../back/Conexion.php');
$data = json_decode(file_get_contents("php://input"));
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
    // Obtener el ID de la dieta desde la solicitud
    $dietaId = $_POST['dietaId'];

    // Crear una instancia de la clase Conexion
    $conexion = new Conexion();

    // Realizar la eliminación en la base de datos
    $query = "DELETE FROM dietas WHERE id = :dietaId";
    $stmt = $conexion->prepare($query);
    $stmt->bindParam(':dietaId', $dietaId, PDO::PARAM_INT);
    
    if ($stmt->execute()) {
        echo json_encode(['mensaje' => 'Dieta eliminada con éxito']);
    } else {
        echo json_encode(['error' => 'Error al eliminar la dieta'. $e->getMessage()]);
    }
} catch (Exception $e) {
    echo json_encode(['error' => 'Error al eliminar la dieta: ' . $e->getMessage()]);
}
} else {
    echo json_encode(['error' => 'Método de solicitud no permitido']);
}
?>