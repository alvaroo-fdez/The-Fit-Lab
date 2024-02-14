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
                                <h5>¡Empieza a cuidarte con una nueva dieta!</h5>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <ul class="breadcrumb">
                                <li class="breadcrumb-item">
                                    <a href="#!">Inicio</a>
                                </li>
                                <li class="breadcrumb-item"><a href="#!">Dietas</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Content Section -->
            <div class="row">
                <div class="col-md-12">
                    <!-- Listado de dietas en tarjetas -->
                    <div class="card">
                        <div class="card-header">
                            <h5>Generar tu dieta</h5>
                        </div>
                        <div class="card-body">
                            <form id="dietaForm" onsubmit="generarDieta(event)">
                                <div class="form-group">
                                    <label for="nivel">Nivel de actividad:</label>
                                    <select class="form-control" id="nivel" name="nivel">
                                        <option value="principiante">No muy activo (Pasas la mayor parte del día sentado)</option>
                                        <option value="intermedio">Intermedio (Pasas buena parte del día de pie)</option>
                                        <option value="avanzado">Avanzado (Pasas buena parte del día haciendo alguna actividad física)</option>
                                        <option value="experto">Muy activo (Pasas la mayor parte del día haciendo actividad física intensa)</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="altura">Altura (cm):</label>
                                    <input type="number" class="form-control" id="altura" name="altura">
                                </div>
                                <div class="form-group">
                                    <label for="peso">Peso (kg):</label>
                                    <input type="number" class="form-control" id="peso" name="peso">
                                </div>
                                <div class="form-group">
                                    <label for="peso_deseado">Peso Deseado (kg):</label>
                                    <input type="number" class="form-control" id="peso_deseado" name="peso_deseado">
                                </div>
                                <div class="form-group">
                                    <label for="peso_deseado">Edad:</label>
                                    <input type="number" class="form-control" id="edad" name="edad">
                                </div>
                                <div class="form-group">
                                    <label for="sexo">Sexo:</label>
                                    <select class="form-control" id="sexo" name="sexo">
                                        <option value="masculino">Masculino</option>
                                        <option value="femenino">Femenino</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="objetivo">Objetivo:</label>
                                    <select class="form-control" id="objetivo" name="objetivo">
                                        <option value="perder_peso">Perder peso</option>
                                        <option value="construir_musculo">Construir músculo</option>
                                        <option value="definir">Definir</option>
                                        <option value="volumen_limpio">Volumen limpio</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="requisitos">Requisitos adicionales:</label>
                                    <textarea class="form-control" id="requisitos" name="requisitos" rows="3" placeholder="Por ejemplo: Soy vegetariano, no me gusta la piña, soy alérgico a el gluten..."></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary" id="btnGenerarDieta">Generar Dieta</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>
<!-- Modal -->
<div class="modal fade" id="rutinaModal" tabindex="-1" role="dialog" aria-labelledby="rutinaModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="rutinaModalLabel">Dieta Generada</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="form-group" id="grupotitulorutina" style="padding-top: 30px;padding-left: 20px;padding-right: 20px;">
                <label for="tituloRutina">Título de la Dieta:</label>
                <input type="text" class="form-control" id="tituloRutina" name="tituloRutina">
                <span id="errorTitulo" style="color: red;"></span>
            </div>
            <div class="modal-body" id="rutinaModalBody">
                <!-- Contenido de la dieta generada se añadirá aquí -->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" onclick="guardarDieta()">Guardar Dieta</button>
            </div>
        </div>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="../js/obtener_api.js"></script>
<script src="../Biblioteca IA/generar-dieta.js"></script>
<script src="../js/formulario-dieta.js"></script>

<?php require_once('footer.php') ?>