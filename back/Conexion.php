<?php
// clase conexion, donde se configura la base de datos
class Conexion extends PDO{
    // Configura estos parámetros en función de tus requisitos
    private $dsn = "mysql:host=localhost;dbname=the fit lab";

    // Define tu usauario y contraseña en función de tus requisitos
    private $user = "root";
    private $pass = "";
    
    function __construct() {
        parent::__construct($this->dsn, $this->user, $this->pass);
    }
}