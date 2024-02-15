<?php require_once('nav.php') ;
echo $_COOKIE['id'];
?>

    <!-- [ Main Content ] start -->
    <div class="pcoded-main-container">
        <div class="col-lg-12 col-md-12" style="padding-top:10px !important">
            <div class="card chat-card">
                <div class="card-header">
                    <h5>Chat</h5>
                    <!-- Resto del código del encabezado -->
                </div>
                <div class="card-body" id="chat-container">
                    <!-- Contenedor de mensajes -->
                    <div class="input-group m-t-15">
                        <input type="text" name="task-insert" class="form-control" id="user-message-input"
                            placeholder="Send message">
                        <div class="input-group-append">
                            <button class="btn btn-primary" onclick="sendMessage()">
                                <i class="feather icon-message-circle"></i> Send
                            </button>
                        </div>
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