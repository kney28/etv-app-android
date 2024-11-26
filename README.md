<p align="center">
  <a href="https://kney28.github.io/" target="blank"><img src="img/etv.jpg" width="450" alt="Login App-ETV" /></a>
</p>

<p align="center">Aplicación android contruida con:</p>

<p align="center">
    <a href="https://vuejs.org/">
        <img alt="Vue framework" src="https://img.shields.io/badge/Vue_3-07B284?style=for-the-badge" target="blank">
    </a>
    <a href="https://quasar.dev/">
        <img alt="Quasar framework" src="https://img.shields.io/badge/Quasar-029DC4?style=for-the-badge" target="blank">
        </a>
    <a href="https://capacitorjs.com/">
        <img alt="Capacitor framework" src="https://img.shields.io/badge/Capacitor-575555?style=for-the-badge" target="blank">
    </a>
</p>

<p>Hola y bienvenidos, a continuación, los guiare para que puedan poner en marcha esta app y puedan probarla</p>

## Descripción

Esta aplicación fue diseñada para ejecutarse en dispositivos Android, la aplicación se encarga de capturar datos por medio de formularios, en este caso se basa en el proceso de Enfermedades Transmitidas por Vectores (ETV).
El programa se ejecuta en modo offline con el fin de poder realizar las labores de encuesta en cualquier lugar sin tener que depender del acceso a internet para este fin. Los datos recolectados son almacenados en una base de datos alojada en el dispositivo Android tipo SQLite.

Una vez terminada la jornada laboral y que el censista se encuentre en una zona con cobertura de internet, será momento de hacer la sincronización con el servidor central, en este proceso se envía toda la información almacenada en la base de datos del dispositivo móvil mediate una apiREST.

El servidor validará la petición por medio de usuario y contraseña, tomará los datos y devolverá como respuesta el id de las inserciones exitosas y las no exitosas.

La app tomará estos id para pasar las transacciones exitosas a una tabla log y las no exitosas quedarán disponibles para un nuevo envío e informará al usuario sobre esto.

Espero les guste.

Estaré subiendo nuevas funcionalidades constantemente.

## Funcionalidades Principales

- **Gestión de Usuarios:** Permite la autenticación y de usuarios.
  
- **Sincronización pull:** Realiza una petición al servidor para actualizar las tablas de municipios, barrios entre otros.

- **Sincronización push:** Realiza una petición al servidor para almacenar la información de las encuestas

- **Modo oscuro:** Permite habilitar el modo oscuro desde la app o desde el panel de notificaciones de Android

- **Funcion compartir encuestas (Nuevo!!):** Permite compartir las encuestas realizadas con WhatsApp o con cualquier otra app

> **Nota:** La validación del usuario en el login se a simplificado para efectos prácticos.

<p>
    Te invito a que mires como poner en marcha el proyecto.
    <a href="https://github.com/kney28/etv-app-android/tree/kevin/app"><img alt="App-ETV" src="https://img.shields.io/badge/Go!-green?style=for-the-badge"></a>
</p>
