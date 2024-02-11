<?php require_once('nav.php') ?>

<!-- [ Main Content ] start -->
<div class="pcoded-main-container">
    <div class="pcoded-wrapper">
        <div class="pcoded-content">
            <div class="page-header">
                <div class="page-block">
                    <div class="row align-items-center">
                        <div class="col-md-8">
                            <div class="page-header-title">
                                <h5>Lista de Rutinas</h5>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="#!">Inicio</a>
                                </li>
                                <li class="breadcrumb-item"><a href="#!">Rutinas</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Content Section -->
            <div class="row">

                <div class="col-md-12">
                    <!-- Listado de rutinas en tarjetas -->
                    <div class="card">
                        <div class="card-header">
                            <h5>Rutinas Disponibles</h5>
                        </div>
                        <div class="card-body">
                            <!-- Ejemplo de tarjeta -->
                            <div class="card col-md-4">
                                <div class="card-body">
                                    <h5 class="card-title">Nombre de la Rutina</h5>
                                    <p class="card-text">Descripción de la rutina.</p>
                                    <!-- Otros detalles de la rutina -->
                                </div>
                            </div>
                            <!-- Repite este bloque para cada rutina en la base de datos -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>
<?php require_once('footer.php') ?>
