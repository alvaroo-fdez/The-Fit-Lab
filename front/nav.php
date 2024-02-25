<!DOCTYPE html>
<html lang="es">
<?php
 session_start();
 if(!isset($_COOKIE['id']) || !isset($_COOKIE['nombre']) || !isset($_COOKIE['correo'])){
    header("Location: ../index.php");
 }
 ?>

<head>
    <title>The Fit Lab</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link rel="icon" href="../assets/images/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://alvaroo-fdez.github.io/daw23/css/style.css">
    <style>
    .card-deck-scrollable {
        @extend .card-deck;
        flex-direction: row;

        &>.card {
            @extend .mx-3;
            flex: 0 0 40% !important;
            /*Change to any size you want*/
            max-width: 40%;
        }
    }

    video {
        width: 100%;
        height: auto;
    }

    ::selection {
        background-color: #7ED956;
        /* Color de fondo de la selección */
        color: #fff;
        /* Color del texto seleccionado */
    }

    ::-moz-selection {
        background-color: #7ED956;
        color: #fff;
    }
    </style>
    <link rel="stylesheet" href="../assets/css/modales.css">
</head>

<body class="">
    <!-- PRE LOADER -->
    <div class="loader-bg">
        <div class="loader-track">
            <div class="loader-fill"></div>
        </div>
    </div>
    <!-- NAV -->
    <nav class="pcoded-navbar">
        <div class="navbar-wrapper  ">
            <div class="navbar-content scroll-div ">
                <div class="">
                    <div class="main-menu-header">
                        <img class="img-radius" src="../assets/images/imagen_perfil.jpg" alt="User-Profile-Image">
                        <div class="user-details">
                            <span><?php echo $_COOKIE['nombre'] ?></span>
                            <div id="more-details">Perfil<i class="fa fa-chevron-down m-l-5"></i></div>
                        </div>
                    </div>
                    <div class="collapse" id="nav-user-link">
                        <ul class="list-unstyled">
                            <li class="list-group-item">
                                <!-- Enlace estilizado como botón para cerrar sesión -->
                                <a href="#" id="logoutLink" onclick="cerrarSesion()">
                                    <i class="feather icon-log-out m-r-5"></i>Cerrar sesión
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                <ul class="nav pcoded-inner-navbar ">
                    <li class="nav-item pcoded-menu-caption">
                        <label>Hablar con FitLab</label>
                    </li>
                    <li class="nav-item pcoded-hasmenu">
                    <li class="nav-item">
                        <a href="chat.php" class="nav-link "><span class="pcoded-micon"><i
                                    class="fas fa-robot"></i></span><span class="pcoded-mtext">Chat</span></a>
                    </li>
                    <li class="nav-item pcoded-menu-caption">
                        <label>Rutina</label>
                    </li>
                    <li class="nav-item">
                        <a href="rutinas.php" class="nav-link "><span class="pcoded-micon"><i
                                    class="fas fa-list"></i></span><span class="pcoded-mtext">Mis
                                rutinas</span></a>
                    </li>
                    <li class="nav-item">
                        <a href="generar-rutinas.php" class="nav-link "><span class="pcoded-micon"><i
                                    class="fas fa-dumbbell"></i></span><span class="pcoded-mtext">Generar
                                rutina</span></a>
                    </li>
                    <li class="nav-item pcoded-menu-caption">
                        <label>Dieta</label>
                    </li>
                    <li class="nav-item">
                        <a href="dietas.php" class="nav-link "><span class="pcoded-micon"><i
                                    class="fas fa-list-ul"></i></span><span class="pcoded-mtext">Mis
                                dietas</span></a>
                    </li>
                    <li class="nav-item">
                        <a href="generar-dietas.php" class="nav-link "><span class="pcoded-micon"><i
                                    class="fas fa-utensils"></i></span><span class="pcoded-mtext">Generar
                                dieta</span></a>
                    </li>
                    <li class="nav-item pcoded-menu-caption">
                        <label>Hacer ejercicios</label>
                    </li>
                    <li class="nav-item">
                        <a href="ejercicios.php" class="nav-link "><span class="pcoded-micon"><i
                                    class="fas fa-stopwatch"></i></span><span
                                class="pcoded-mtext">Ejercitarse</span></a>
                    </li>

                </ul>

            </div>
        </div>
    </nav>

    <!-- HEADER -->
    <header class="navbar pcoded-header navbar-expand-lg navbar-light header-dark">
        <div class="m-header">
            <a class="mobile-menu" id="mobile-collapse" href="#!"><span></span></a>
            <a href="#!" class="b-brand">
                <img src="../assets/images/logo.png" alt="" class="logo">
            </a>
            <a href="#!" class="mob-toggler">
                <i class="feather icon-more-vertical"></i>
            </a>
        </div>
    </header>