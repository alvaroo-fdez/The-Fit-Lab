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
                            <h5>Generar tu rutina</h5>
                        </div>
                        <div class="card-body">
                            <form id="rutinaForm">
                                <div class="form-group">
                                    <label for="nivel">Nivel:</label>
                                    <select class="form-control" id="nivel" name="nivel">
                                        <option value="principiante">Principiante</option>
                                        <option value="intermedio">Intermedio</option>
                                        <option value="avanzado">Avanzado</option>
                                        <option value="experto">Experto</option>
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
                                    <label for="dias_semana">Días a la semana:</label>
                                    <div class="dias-semana-container">
                                        <span id="dias-semana-valor">3</span> día(s) a la semana
                                    </div>
                                    <input type="range" class="form-control-range" id="dias_semana" name="dias_semana"
                                        min="1" max="7" oninput="actualizarDiasSemana(this.value)" value="3">
                                </div>
                                <div class="form-group">
                                    <label for="entorno">Entorno de entrenamiento:</label>
                                    <select class="form-control" id="entorno" name="entorno">
                                        <option value="gimnasio">Gimnasio</option>
                                        <option value="casa_sin_equipamiento">Casa sin equipamiento</option>
                                        <option value="casa_con_entrenamiento">Casa con entrenamiento</option>
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
                                <button type="submit" class="btn btn-primary" id="btnGenerarRutina">Generar
                                    Rutina</button>
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
                <h5 class="modal-title" id="rutinaModalLabel">Rutina Generada</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="form-group" id="grupotitulorutina" style="padding-top: 30px;padding-left: 20px;padding-right: 20px;">
                <label for="tituloRutina">Título de la Rutina:</label>
                <input type="text" class="form-control" id="tituloRutina" name="tituloRutina">
            </div>
            <div class="modal-body" id="rutinaModalBody">
                <!-- Contenido de la rutina generada se añadirá aquí -->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" onclick="guardarRutina()">Guardar Rutina</button>
            </div>
        </div>
    </div>
</div>

<script src="../js/obtener_api.js"></script>
<script src="../Biblioteca IA/generar-rutina.js"></script>
<script src="../js/actualizar_semana.js"></script>

<?php require_once('footer.php') ?>