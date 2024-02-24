<!DOCTYPE html>
<html lang="es">
<?php session_start(); ?>
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
    </style>
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
                            <!-- <li class="list-group-item"><a href="user-profile.html"><i
                                        class="feather icon-user m-r-5"></i>View Profile</a></li>
                            <li class="list-group-item"><a href="#!"><i
                                        class="feather icon-settings m-r-5"></i>Settings</a></li> -->
                            <li class="list-group-item"><a href="auth-normal-sign-in.html"><i
                                        class="feather icon-log-out m-r-5"></i>Logout</a></li>
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
                                    class="feather icon-file-text"></i></span><span class="pcoded-mtext">Mis
                                rutinas</span></a>
                    </li>
                    <li class="nav-item">
                        <a href="generar-rutinas.php" class="nav-link "><span class="pcoded-micon"><i
                                    class="feather icon-align-justify"></i></span><span class="pcoded-mtext">Generar
                                rutina</span></a>
                    </li>
                    <li class="nav-item pcoded-menu-caption">
                        <label>Dieta</label>
                    </li>
                    <li class="nav-item">
                        <a href="dietas.php" class="nav-link "><span class="pcoded-micon"><i
                                    class="feather icon-pie-chart"></i></span><span class="pcoded-mtext">Mis
                                dietas</span></a>
                    </li>
                    <li class="nav-item">
                        <a href="generar-dietas.php" class="nav-link "><span class="pcoded-micon"><i
                                    class="feather icon-map"></i></span><span class="pcoded-mtext">Generar
                                dieta</span></a>
                    </li>
                    <li class="nav-item pcoded-menu-caption">
                        <label>Hacer ejercicios</label>
                    </li>
                    <li class="nav-item">
                        <a href="ejercicios.php" class="nav-link "><span class="pcoded-micon"><i
                                    class="feather icon-map"></i></span><span
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