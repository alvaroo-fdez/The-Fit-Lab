<?php
setcookie('correo', $correo, time()-3600*24*365*100, '/');
setcookie('nombre', $nombre, time()-3600*24*365*100, '/');
setcookie('id', $id, time()-3600*24*365*100, '/');

header("Location: ../index.php");
?>