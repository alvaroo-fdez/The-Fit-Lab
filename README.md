<p align="center">
  <img src="https://github.com/alvaroo-fdez/The-Fit-Lab/assets/91118214/8a3e9b74-acac-49d7-9094-90bc2b1d59c6" alt="Logo TheFitLab">
</p>

<hr>

<p align="center">
   <img src="http://img.shields.io/static/v1?label=ESTADO&message=EN%20DESARROLLO&color=RED&style=for-the-badge" #vitrinedev/>
</p>

### Temas

- [Descripción del proyecto](#descripción-del-proyecto)

- [Características](#características)

- [Aplicación](#aplicación)

- [Herramientas utilizadas](#herramientas-utilizadas)

- [Acceso al proyecto](#acceso-al-proyecto)

- [Abrir y ejecutar el proyecto](#abrir-y-ejecutar-el-proyecto)

- [Desarrolladores](#desarrolladores)

## Descripción del proyecto

<p align="justify">
The FitLab es un proyecto en desarrollo que utiliza inteligencia artificial para generar dietas y rutinas personalizadas. Además, cuenta con un chatbot que actúa como entrenador personal virtual y un módulo de detección de movimientos que permite a los usuarios realizar entrenamientos personalizados.

El sistema se centra en proporcionar a los usuarios una experiencia integral de desarrollo de la salud y el bienestar, combinando tecnologías avanzadas para mejorar la calidad de vida y generar buenos hábitos. La generación de dietas y rutinas adaptadas, junto con la interacción a través del chatbot y la facilidad para realizar entrenamientos personalizados mediante detección de movimientos, hacen de The FitLab una solución completa para el cuidado personal.

¡Explora las posibilidades de The FitLab y lleva tu bienestar al siguiente nivel!

![Descripción del proyecto The FitLab, que incluye inteligencia artificial para dietas y rutinas personalizadas, chatbot como entrenador personal y detección de movimientos para entrenamientos personalizados.](Enlace a imagen aquí)
</p>

## Características

:heavy_check_mark: **Funcionalidad 1:** Generación de dietas personalizadas utilizando inteligencia artificial.

:heavy_check_mark: **Funcionalidad 2:** Creación de rutinas de entrenamiento adaptadas a las necesidades individuales de los usuarios.

:heavy_check_mark: **Funcionalidad 3:** Chatbot interactivo que actúa como entrenador personal virtual, proporcionando orientación y motivación.

:heavy_check_mark: **Funcionalidad 4:** Módulo de detección de movimientos para realizar entrenamientos personalizados, aprovechando la interactividad y la retroalimentación en tiempo real.

Estas características hacen de nuestro proyecto una solución completa para el cuidado personal, proporcionando no solo planes de dieta y entrenamiento personalizados, sino también un compañero virtual para guiar y motivar a los usuarios a mejorar su calidad de vida.

## Aplicación

<div align="center">

![Prueba en tiempo real](Incluir gifs o imagenes del proyecto)

</div>

###

## Herramientas utilizadas

### Lenguajes de Programación

<a href="https://www.javascript.com" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>
<a href="https://www.php.net" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/php/php-original.svg" alt="php" width="40" height="40"/> </a>

### Tecnologías de Inteligencia Artificial
<a href="https://teachablemachine.withgoogle.com" target="_blank"> <img src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/KQYQADMPAFECPIB64EGFX4LHXM.jpg" alt="teachable machine" width="60" height="40"/> </a>
<a href="https://sweetalert2.github.io/" target="_blank"> <img src="https://cdn.worldvectorlogo.com/logos/openai-2.svg" alt="openai" width="40" height="40"/> </a>

### Bases de Datos
<a href="https://www.mysql.com" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a>

### Frameworks y Librerías Frontend
<a href="https://getbootstrap.com" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/bootstrap/bootstrap-original-wordmark.svg" alt="bootstrap" width="40" height="40"/> </a>
<a href="https://sweetalert2.github.io/" target="_blank"> <img src="https://rohit-chouhan.gallerycdn.vsassets.io/extensions/rohit-chouhan/sweetalert2-snippet/1.1.2/1625627316335/Microsoft.VisualStudio.Services.Icons.Default" alt="bootstrap" width="40" height="40"/> </a>

### Estructuración y Maquetación
<a href="https://www.w3.org/html/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a>
<a href="https://www.w3.org/Style/CSS/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a>

###

## Acceso al proyecto
Puede [acceder al código fuente del proyecto](https://github.com/alvaroo-fdez/The-Fit-Lab) o [descargarlo](https://github.com/alvaroo-fdez/The-Fit-Lab/archive/refs/heads/main.zip)

## Abrir y ejecutar el proyecto

> [!WARNING]
> Necesitas tener una API válida de OpenAI para usar este proyecto y una base de datos con las tablas que te proporcionaremos.

Después de descargar el proyecto, puede ejecutarlo en un servidor local, funciona con XAMPP y el servidor web Apache. Puede hacerlo de la siguiente manera:

- Iniciar Apache y MySQL en tu aplicación XAMPP.
- Crear el archivo .env en el directorio raíz con el siguiente contenido:
  
  ```plaintext
    API_KEY="<tu_api_key_de_openai>"
- Crea las siguientes tablas en tu base de datos MySQL.
  ```sql
  CREATE TABLE `dietas` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `usuario_id` int(11) DEFAULT NULL,
    `titulo` varchar(255) NOT NULL,
    `nivel` varchar(255) NOT NULL,
    `altura` decimal(5,2) NOT NULL,
    `peso` decimal(5,2) NOT NULL,
    `peso_deseado` decimal(5,2) NOT NULL,
    `edad` int(11) NOT NULL,
    `sexo` varchar(1) NOT NULL,
    `objetivo` varchar(255) NOT NULL,
    `requisitos` text DEFAULT NULL,
    `dieta` longtext NOT NULL
  );
  
  CREATE TABLE `usuarios` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `nombre` varchar(255) NOT NULL,
    `correo` varchar(255) NOT NULL,
    `contraseña` varchar(255) NOT NULL
  );
  
  CREATE TABLE `rutinas` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `usuario_id` int(11) DEFAULT NULL ,
    `titulo` varchar(255) DEFAULT NULL,
    `nivel` varchar(50) DEFAULT NULL,
    `altura` int(11) DEFAULT NULL,
    `peso` int(11) DEFAULT NULL,
    `peso_deseado` int(11) DEFAULT NULL,
    `dias_semana` int(11) DEFAULT NULL,
    `sexo` varchar(50) DEFAULT NULL,
    `entorno_entrenamiento` varchar(50) DEFAULT NULL,
    `objetivo` varchar(50) DEFAULT NULL,
    `rutina` longtext CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL
  );

- Configura la conexión a la base de datos en función de tus requisitos
    ```plaintext
    private $dsn = "mysql:host=nombre_del_servidor_remoto;dbname=nombre_de_tu_base_de_datos";
    private $user = "<tu_usuario>";
    private $pass = "<tu_contraseña>";


- Abrir el proyecto desde el directorio raiz, te llevará al index para registrar un nuevo usuario.

## Desarrolladores

| [<img src="https://avatars.githubusercontent.com/u/91118214?v=4" width=115><br><sub>Álvaro Fernández Fernández</sub>](https://github.com/alvaroo-fdez) |  [<img src="https://avatars.githubusercontent.com/u/122311216?v=4" width=115><br><sub>Moisés</sub>](https://github.com/Kymmon)  |
| :---: | :---: |
