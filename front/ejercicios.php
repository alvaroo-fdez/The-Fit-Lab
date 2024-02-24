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

            <div class="container-fluid py-2">
                <h5>Biceps</h5>
                <hr>
                <div class="card-deck-scrollable flex-nowrap overflow-auto d-flex flex-row">
                    <div class="card mx-2">
                        <img class="img-fluid card-img-top" src="../assets/images/exercises/curl_biceps_martillo.jpg" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">Curl de biceps martillo</h5>
                            <p class="card-text">Ejercicio con mancuernas que trabaja el antebrazo y el bíceps en agarre neutro</p>
                        </div>
                        <div class="card-footer">
                            <button type="button" class="btn btn-primary" onclick="init('CurlMartillo')">Probar contador</button>
                        </div>
                    </div>
                    <div class="card  mx-2">
                        <img class="img-fluid card-img-top" src="../assets/images/exercises/curl_biceps_barra_z.jpg" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">Curl de bíceps con barra Z</h5>
                            <p class="card-text">Ejercicio con barra que trabaja el bíceps y el antebrazo en agarre semi-pronado</p>
                        </div>
                    </div>
                    <div class="card  mx-2">
                        <img class="img-fluid card-img-top" src="../assets/images/exercises/dominadas_supinas.jpg" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">Dominadas supinas</h5>
                            <p class="card-text">Ejercicio de peso corporal que trabaja el bíceps y la espalda en agarre supino</p>
                        </div>
                    </div>
                    <div class="card  mx-2">
                        <img class="img-fluid card-img-top" src="../assets/images/exercises/curl_biceps_martillo.jpg" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">Curl de biceps martillo</h5>
                            <p class="card-text">Ejercicio con mancuernas que trabaja el antebrazo y el bíceps en agarre neutro</p>
                        </div>
                    </div>
                    <div class="card  mx-2">
                        <img class="img-fluid card-img-top" src="../assets/images/exercises/curl_biceps_barra_z.jpg" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">Curl de bíceps con barra Z</h5>
                            <p class="card-text">Ejercicio con barra que trabaja el bíceps y el antebrazo en agarre semi-pronado</p>
                        </div>
                    </div>
                    <div class="card  mx-2">
                        <img class="img-fluid card-img-top" src="../assets/images/exercises/dominadas_supinas.jpg" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">Dominadas supinas</h5>
                            <p class="card-text">Ejercicio de peso corporal que trabaja el bíceps y la espalda en agarre supino</p>
                        </div>
                    </div>
                    <div class="card  mx-2">
                        <img class="img-fluid card-img-top" src="../assets/images/exercises/curl_biceps_martillo.jpg" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">Curl de biceps martillo</h5>
                            <p class="card-text">Ejercicio con mancuernas que trabaja el antebrazo y el bíceps en agarre neutro</p>
                        </div>
                    </div>
                    <div class="card  mx-2">
                        <img class="img-fluid card-img-top" src="../assets/images/exercises/curl_biceps_barra_z.jpg" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">Curl de bíceps con barra Z</h5>
                            <p class="card-text">Ejercicio con barra que trabaja el bíceps y el antebrazo en agarre semi-pronado</p>
                        </div>
                    </div>
                    <div class="card  mx-2">
                        <img class="img-fluid card-img-top" src="../assets/images/exercises/dominadas_supinas.jpg" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">Dominadas supinas</h5>
                            <p class="card-text">Ejercicio de peso corporal que trabaja el bíceps y la espalda en agarre supino</p>
                        </div>
                    </div>
                    <!-- Agrega más tarjetas según sea necesario -->
                </div>
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
                <canvas id="canvas" width="200" height="200"></canvas>
                <div id="resultado"></div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@teachablemachine/pose@0.8/dist/teachablemachine-pose.min.js"></script>
<script src="..\Biblioteca IA\ejercicios.js"></script>

<?php require_once('footer.php') ?>