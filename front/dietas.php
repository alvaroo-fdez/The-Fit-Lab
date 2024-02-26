<?php
require_once('nav.php');
require_once('../back/Conexion.php');

// Obtener el usuario_id desde la cookie
$usuario_id = $_COOKIE['id'];

// Crear una instancia de la clase Conexion
$conexion = new Conexion();

// Realizar la consulta para obtener las dietas del usuario actual
$query = "SELECT * FROM dietas WHERE usuario_id = :usuario_id";
$stmt = $conexion->prepare($query);
$stmt->bindParam(':usuario_id', $usuario_id, PDO::PARAM_INT);
$stmt->execute();

// Obtener los resultados de la consulta
$dietas = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!-- [ Main Content ] start -->
<div class="pcoded-main-container">
    <div class="pcoded-wrapper">
        <div class="pcoded-content">
            <!-- Resto de tu código ... -->

            <!-- Content Section -->
            <div class="row">
                <div class="col-md-12">
                    <!-- Listado de dietas en tarjetas -->
                    <div class="card">
                        <div class="card-header">
                            <h5>Dietas Guardadas</h5>
                        </div>
                        <div class="card-body">
                            <!-- Iterar sobre los resultados de la consulta -->
                            <?php foreach ($dietas as $dieta) { ?>
                                <div class="card col-md-12 mb-3">
                                    <div class="card-body">
                                        <h5 class="card-title"><?php echo $dieta['titulo']; ?></h5>
                                        <p class="card-text">
                                            Peso inicial: <?php echo $dieta['peso']; ?> kg,
                                            Peso deseado: <?php echo $dieta['peso_deseado']; ?> kg,
                                            Objetivo: <?php echo $dieta['objetivo']; ?>
                                        </p>
                                        <h6 class="card-subtitle mb-2 text-muted">Detalles de la Dieta:</h6>
                                        <?php echo $dieta['dieta']; ?>
                                    </div>
                                </div>
                            <?php } ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php require_once('footer.php') ?>
