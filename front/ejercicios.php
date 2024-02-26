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
                                <h5>Ejercicios</h5>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="#!">Inicio</a>
                                </li>
                                <li class="breadcrumb-item"><a href="#!">Ejercicios</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Content Section -->

            <div class="container-fluid py-2" id="contenedor">
            </div>
        </div>
    </div>
</div>
</div>
</div>
<!-- Modal -->
<div class="modal fade" id="miModal" tabindex="-1" role="dialog" aria-labelledby="CurlMartilloModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title h4" id="ModalLabel"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body" id="modal-body-content">
                <div class="d-flex align-items-center justify-content-center" id="contenedor-loader" style="height: 50vh;">
                    <div class="spinner-border text-success" id="loader" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <canvas id="canvas" width="200" height="200"></canvas>
                <div id="resultado"></div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@teachablemachine/pose@0.8/dist/teachablemachine-pose.min.js"></script>
<script src="..\Biblioteca IA\ejercicios.js"></script>
<script src="..\js\ejercicios.js"></script>
<script src="..\js\procesamiento_ejercicios.js"></script>

<?php require_once('footer.php') ?>