<?php
require_once('nav.php');
require_once('../back/Conexion.php');

// Obtenemos el usuario_id desde la cookie
$usuario_id = $_COOKIE['id'];

// Creamos una instancia de la clase Conexion
$conexion = new Conexion();

// Realizamos la consulta para obtener las rutinas del usuario actual
$query = "SELECT * FROM rutinas WHERE usuario_id = :usuario_id ORDER BY id DESC";
$stmt = $conexion->prepare($query);
$stmt->bindParam(':usuario_id', $usuario_id, PDO::PARAM_INT);
$stmt->execute();

// Obtenemos los resultados de la consulta
$rutinas = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<div class="pcoded-main-container">
    <div class="pcoded-wrapper">
        <div class="pcoded-content">
            <div class="row">
                <div class="col-md-12">
                    <!-- Listado de rutinas en tarjetas -->
                    <div class="card">
                        <div class="card-header">
                            <h5>Rutinas Guardadas</h5>
                        </div>
                        <div class="card-body">
                            <?php if (empty($rutinas)) { ?>
                            <!-- Mensaje si no hay rutinas -->
                            <p>Aquí aparecerán tus rutinas guardadas.</p>
                            <?php } else { ?>
                            <!-- Iteramos sobre los resultados de la consulta -->
                            <?php foreach ($rutinas as $rutina) { ?>
                            <div class="card col-md-12 mb-3" id="rutinaCard<?php echo $rutina['id']; ?>">
                                <div class="card-body">
                                    <!-- Botón para eliminar rutina -->
                                    <button class="btn btn-danger float-right mt-2"
                                        onclick="confirmarEliminarRutina(<?php echo $rutina['id']; ?>)"><i
                                            class="fas fa-trash"></i></button>
                                    <h5 class="card-title"><?php echo $rutina['titulo']; ?></h5>
                                    <p class="card-text">
                                        Peso inicial: <?php echo $rutina['peso']; ?> kg,
                                        Peso deseado: <?php echo $rutina['peso_deseado']; ?> kg,
                                        Objetivo: <?php echo $rutina['objetivo']; ?>
                                    </p>
                                    <h6 class="card-subtitle mb-2 text-muted">Detalles de la Rutina:</h6>
                                    <?php echo $rutina['rutina']; ?>

                                    <!-- Modal de confirmación -->
                                    <div class="modal" id="confirmacionEliminarRutina<?php echo $rutina['id']; ?>"
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
                                                    <p>¿Estás seguro de que deseas eliminar esta rutina?</p>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary"
                                                        data-dismiss="modal">Cancelar</button>
                                                    <button type="button" class="btn btn-danger"
                                                        onclick="eliminarRutina(<?php echo $rutina['id']; ?>)">Eliminar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <?php } ?>
                            <?php } ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="../js/eliminar_rutina.js"></script>
<?php require_once('footer.php') ?>