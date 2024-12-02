Sistema de Reservas en Línea

Descripción
Este proyecto consiste en un sistema de reservas en línea, que permite a los usuarios realizar reservas fácilmente a través de una interfaz web. Está compuesto por dos partes principales:

1. Front-end: Desarrollado con React.js, donde los usuarios pueden interactuar con el sistema de manera intuitiva.
2. Back-end: Implementado con JavaScript (Node.js), encargado de manejar la lógica de las APIs y controladores para gestionar las reservas.
3. Base de Datos: Utiliza MySQL para almacenar la información de las reservas, usuarios, y otros datos relevantes.


Tecnologías Utilizadas
~ React.js: Para la creación de la interfaz de usuario (Front-end).

~ Node.js: Para el desarrollo del backend, incluyendo la lógica de las APIs.

~ Express.js: Para manejar las rutas y controladores del back-end.

~ MySQL: Para gestionar la base de datos.

~ Axios: Para las solicitudes HTTP entre el front-end y el back-end.

~ CSS/Bootstrap: Para el diseño y estilo de la interfaz.


Características
~ Interfaz de usuario dinámica: Los usuarios pueden ver los horarios disponibles y realizar reservas de manera sencilla.
~ Gestión de reservas: El sistema permite crear, consultar y cancelar reservas.
~ Autenticación: Los usuarios pueden registrarse e iniciar sesión para gestionar sus reservas.
~ Admin Panel: El administrador puede visualizar todas las reservas y gestionarlas.

Instalación
1. Clona el repositorio

git clone https://github.com/tu_usuario/sistema-de-reservas.git

2. Instalación de dependencias
Front-end (React.js)

cd client
npm install

Back-end (Node.js)

cd server
npm install

3. Configuración de la base de datos
 a. Crea una base de datos en MySQL llamada reservas_db.
 b. Asegúrate de tener el archivo .env con la configuración de la base de datos en el directorio server:

DB_HOST=localhost
DB_USER=usuario
DB_PASSWORD=contraseña
DB_NAME=reservas_db

4. Ejecuta el proyecto
Iniciar el back-end (Node.js)

cd server
npm start

Iniciar el front-end (React.js)
cd client
npm start



Funcionalidades
~ Realizar reservas: Los usuarios pueden reservar horarios disponibles.
~ Ver historial de reservas: Los usuarios pueden consultar sus reservas pasadas.
~ Administrar reservas: El administrador puede añadir, eliminar o modificar reservas.
~ Manejo de usuarios: Registro e inicio de sesión para gestionar las reservas personales.


Estructura del Proyecto

sistema-de-reservas/
├── client/                # Front-end (React.js)
│   ├── src/
│   └── public/
├── server/                # Back-end (Node.js + Express.js)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── .env              # Variables de entorno
└── README.md             # Este archivo


Contribuciones
Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (git checkout -b feature-nueva).
3. Realiza los cambios y haz un commit (git commit -am 'Añadir nueva funcionalidad').
4. Haz push a la rama (git push origin feature-nueva).
5. Crea un pull request.


Licencia
Este proyecto está bajo la licencia MIT.

