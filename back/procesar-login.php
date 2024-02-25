<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ob_start();
session_start();
require_once 'Usuario.php';

if(isset($_POST['btlogin'])){
    $emailLogin = htmlspecialchars($_POST['emaillogin']);
    $passwordLogin = htmlspecialchars($_POST['passlogin']);

    Usuario::compruebaLogin($emailLogin, $passwordLogin);
    ob_end_flush();
}
?>