<?php
// Cerramos sesión eliminando las cookies del usuario actual y mandandolo al login
setcookie('correo', $correo, time()-3600*24*365*100, '/');
setcookie('nombre', $nombre, time()-3600*24*365*100, '/');
setcookie('id', $id, time()-3600*24*365*100, '/');

header("Location: ../index.php");
?>