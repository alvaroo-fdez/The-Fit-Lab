<?php require_once('nav.php') ;?>

    <!-- [ Main Content ] start -->
    <div class="pcoded-main-container">
        <div class="col-lg-12 col-md-12" style="padding-top:10px !important">
            <div class="card chat-card">
                <div class="card-header">
                    <h5>Chat</h5>
                    <!-- Resto del código del encabezado -->
                </div>
                <div class="card-body" id="chat-container" style="max-height: 400px; overflow-y: auto">
                    <!-- Contenedor de mensajes -->
                    
                </div>
                <div class="input-group m-t-15" style="padding: 20px;box-shadow: 0px -3px 11px 2px rgba(0, 0, 0, 0.2);margin-top:0px !important">
                        <input type="text" name="task-insert" class="form-control" id="user-message-input"
                            placeholder="Pregunta lo que quieras..." onkeydown="presionarEnter(event)">
                        <div class="input-group-append">
                            <button class="btn btn-primary" onclick="sendMessage()">
                            <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
            </div>
        </div>
    </div>
    </div>
    </div>
    <script src="../js/obtener_api.js"></script>
    <script src="../Biblioteca IA/chatbot.js"></script>
<?php require_once('footer.php') ?>