const express = require('express');
const app = express();
const cors = require('cors');

const reservaRoutes = require('./routes/reservaRoutes');
const PORT = 5000;


//Middleware
// Usar CORS para permitir solicitudes desde http://localhost:3000
app.use(cors({
    origin: 'http://localhost:3000', // Permitir solicitudes solo desde el frontend local
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  }))

app.use(express.json());

//Rutas

app.use('/api/reservas', reservaRoutes)


//Servidor

app.listen(PORT, () =>{
    console.log(`Servidor corriendo en https://localhost:${PORT}`)
});
