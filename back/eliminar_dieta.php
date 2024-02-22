<?php
if (isset($_GET['id'])) {
    $dietaId = $_GET['id'];

    // Realizar la eliminación en la base de datos usando el ID de la dieta
    $query = "DELETE FROM dietas WHERE id = :dieta_id";
    $stmt = $conexion->prepare($query);
    $stmt->bindParam(':dieta_id', $dietaId, PDO::PARAM_INT);
    $stmt->execute();

    // Redirige a la página principal después de la eliminación
    header('Location: principal.php');
    exit();
}
?>