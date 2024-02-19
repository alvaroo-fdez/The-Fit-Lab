<?php 
require_once('nav.php');
require_once('../back/Conexion.php');
// Obtener el usuario_id desde la cookie
$usuario_id = $_COOKIE['id'];

// Crear una instancia de la clase Conexion
$conexion = new Conexion();

// Realizar la consulta para obtener las rutinas del usuario actual
$query = "SELECT * FROM rutinas WHERE usuario_id = :usuario_id";
$stmt = $conexion->prepare($query);
$stmt->bindParam(':usuario_id', $usuario_id, PDO::PARAM_INT);
$stmt->execute();

// Obtener los resultados de la consulta
$rutinas = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!-- [ Main Content ] start -->
<div class="pcoded-main-container">
    <div class="pcoded-wrapper">
        <div class="pcoded-content">
            <!-- Resto de tu código ... -->

            <!-- Content Section -->
            <div class="row">
                <div class="col-md-12">
                    <!-- Listado de rutinas en tarjetas -->
                    <div class="card">
                        <div class="card-header">
                            <h5>Rutinas Disponibles</h5>
                        </div>
                        <div class="card-body">
                            <!-- Iterar sobre los resultados de la consulta -->
                            <?php foreach ($rutinas as $rutina) { ?>
                            <div class="card col-md-12 mb-3">
                                <div class="card-body">
                                    <h5 class="card-title"><?php echo $rutina['titulo']; ?></h5>
                                    <p class="card-text">
                                        Peso inicial: <?php echo $rutina['peso']; ?> kg,
                                        Peso deseado: <?php echo $rutina['peso_deseado']; ?> kg,
                                        Objetivo: <?php echo $rutina['objetivo']; ?>,
                                        Entrenando desde: <?php echo $rutina['entorno_entrenamiento']; ?>
                                    </p>
                                    <h6 class="card-subtitle mb-2 text-muted">Rutina:</h6>
                                    <?php
                                        $rutina_text = $rutina['rutina'];
                                        // Dividir la rutina por días
                                        $dias = explode("Día", $rutina_text);
                                        foreach ($dias as $dia) {
                                            // Ignorar líneas vacías
                                            if (!empty(trim($dia))) {
                                                echo "<p><strong>Día $dia</strong></p>";
                                                // Mostrar ejercicios del día
                                                echo "<ul>";
                                                $ejercicios = explode("-", $dia);
                                                foreach ($ejercicios as $ejercicio) {
                                                    // Ignorar líneas vacías
                                                    if (!empty(trim($ejercicio))) {
                                                        echo "<li>" . trim($ejercicio) . "</li>";
                                                    }
                                                }
                                                echo "</ul>";
                                            }
                                        }
                                    ?>
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