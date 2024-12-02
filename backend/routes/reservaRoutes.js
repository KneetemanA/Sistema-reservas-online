const express = require('express')
const router = express.Router();

const {crearReserva, obtenerReservas, reservasID, updateID, deleteReservas} = require('../controllers/reservaController');


// ruta para obtener la reserva
router.get('/', obtenerReservas);


// ruta para crear la reserva
router.post('/crear', crearReserva);


// ruta reservas por ID
router.get('/:id', reservasID);

//Update reservas ID
router.put('/:id', updateID);

// delete reservas

router.delete('/:id', deleteReservas)


module.exports = router;
