<?php

require_once 'Conexion.php';

// Clase Usuario
class Usuario{
    private $nombre;
    private $correo;
    private $password;

    function __construct($nombre, $correo, $password) {
        $this->nombre = $nombre;
        $this->correo = $correo;
        $this->password = $password;
    }

    // Función que inserta un nuevo usuario en la base de datos
    function insertaUsuario(){
        $con = new Conexion();
        $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $con->prepare("SELECT * FROM usuarios WHERE correo = :correo");
        $stmt->bindParam(':correo', $this->correo);
        $stmt->execute();

        // si el correo ya existe en la base de datos no es posible la inserción
        if ($stmt->rowCount() > 0) {
            $resultado = 4;
        } else {
            // Insertamos el usuario con un nombre, correo y encriptamos la contraseña
            try {
                $stmt = $con->prepare('INSERT INTO `usuarios` (`nombre`, `correo`, `contraseña`) VALUES (?, ?, ?)');
                
                $passencr = password_hash($this->password, PASSWORD_DEFAULT);
                $verificationCode = uniqid();
    
                $stmt->bindParam(1, $this->nombre);
                $stmt->bindParam(2, $this->correo);
                $stmt->bindParam(3, $passencr);

                if($stmt->execute()){
                    $resultado = 2;
                }else{
                    $resultado = 3;
                }
            
            } catch(PDOException $e) {
                echo "Error al insertar usuario: " . $e->getMessage();
            }
        }
        // Devolvemos en función de como se haya manejado la inserción
        return $resultado;
    }

    // Función que comprueba si existen las credenciales proporcionadas y si es posible el inicio de sesión
    static function compruebaLogin($correo, $password){
        session_start();
        $con = new Conexion();
        $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $con->prepare("SELECT `contraseña` FROM `usuarios` WHERE `correo` = :correo");
        $stmt->bindParam(':correo', $correo);
        $stmt->execute();
        
        $contra = $stmt->fetch(PDO::FETCH_ASSOC)['contraseña'];
        
        // Si la contraseña es la misma a la asociada con el correo seguimos
        if(password_verify($password, $contra)){

            $stmt2 = $con->prepare("SELECT `id` FROM `usuarios` WHERE `correo` = :correo");
            $stmt2->bindParam(':correo', $correo);
            $stmt2->execute();

            $id = $stmt2->fetch(PDO::FETCH_ASSOC)['id'];

            // Recogemos todos los datos del usuario para poder hacer las cookies y la sesión
            if($id){
                $stmt3 = $con->prepare("SELECT `nombre` FROM `usuarios` WHERE `id` = :id");
                $stmt3->bindParam(':id', $id);
                $stmt3->execute();

                $nombre = $stmt3->fetch(PDO::FETCH_ASSOC)['nombre'];

                $_SESSION['correo'] = $correo;
                $_SESSION['nombre'] = $nombre;

                setcookie('correo', $correo, time()+3600*24*365*100, '/');
                setcookie('nombre', $nombre, time()+3600*24*365*100, '/');
                setcookie('id', $id, time()+3600*24*365*100, '/');
    
                // Enviamos a la página de chat
                header("Location: ../front/chat.php");
                exit;
            }
        // Si no es la contraseña indicamos el error en el login
        }else{
            header('location: ../index.php?mensajelogin=error');
        }
    }
}