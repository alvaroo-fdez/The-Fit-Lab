<?php
require_once 'Usuario.php';

// Registramos un nuevo usuario y devolvemos si ha sido exitoso o no el registro
if(isset($_POST['btregistro'])){
    $nombre = htmlspecialchars($_POST['nombreregistro']);
    $email = htmlspecialchars($_POST['emailregistro']);
    $password = htmlspecialchars($_POST['passregistro']);

    $usuario = new Usuario($nombre, $email, $password);

    $insercion = $usuario->insertaUsuario();

    //echo $insercion;

        if($insercion == 2){
            header('location: ../index.php?mensaje=exito');
            
        }else if($insercion == 3){
            header('location: ../index.php?mensaje=error');
        }
    
}