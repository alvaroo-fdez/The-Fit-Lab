<?php
require_once('nav.php');
require_once('../back/Conexion.php');

// Obtener el usuario_id desde la cookie
$usuario_id = $_COOKIE['id'];

// Crear una instancia de la clase Conexion
$conexion = new Conexion();

// Realizar la consulta para obtener las dietas del usuario actual
$query = "SELECT * FROM dietas WHERE usuario_id = :usuario_id ORDER BY id DESC";
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
                            <div class="card col-md-12 mb-3" id="dietaCard<?php echo $dieta['id']; ?>">
                                <div class="card-body">
                                    <!-- Botón para eliminar dieta -->
                                    <button class="btn btn-danger float-right mt-2"
                                        onclick="confirmarEliminarDieta(<?php echo $dieta['id']; ?>)"><i
                                    class="fas fa-trash"></i></button>
                                    <h5 class="card-title"><?php echo $dieta['titulo']; ?></h5>
                                    <p class="card-text">
                                        Peso inicial: <?php echo $dieta['peso']; ?> kg,
                                        Peso deseado: <?php echo $dieta['peso_deseado']; ?> kg,
                                        Objetivo: <?php echo $dieta['objetivo']; ?>
                                    </p>
                                    <h6 class="card-subtitle mb-2 text-muted">Detalles de la Dieta:</h6>
                                    <?php echo $dieta['dieta']; ?>

                                    <!-- Modal de confirmación -->
                                    <div class="modal" id="confirmacionEliminarDieta<?php echo $dieta['id']; ?>"
                                        tabindex="-1" role="dialog">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title">Confirmar Eliminación</h5>
                                                    <button type="button" class="close" data-dismiss="modal"
                                                        aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <p>¿Estás seguro de que deseas eliminar esta dieta?</p>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary"
                                                        data-dismiss="modal">Cancelar</button>
                                                    <button type="button" class="btn btn-danger"
                                                        onclick="eliminarDieta(<?php echo $dieta['id']; ?>)">Eliminar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="../js/eliminar_dieta.js"></script>
<?php require_once('footer.php') ?>