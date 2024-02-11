<?php
    
class Conexion extends PDO{
    private $dsn = "mysql:host=localhost;dbname=the fit lab";
    private $user = "root";
    private $pass = "";
    
    function __construct() {
        parent::__construct($this->dsn, $this->user, $this->pass);
    }
}