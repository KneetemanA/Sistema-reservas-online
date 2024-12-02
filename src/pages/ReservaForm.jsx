import React, { useState } from 'react';
import axios from 'axios';
import '../styles/reservas.css';

const ReservaForm = ({ agregarReserva }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        fecha_reserva: '',
        hora_reserva: '',
        mensaje: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fechaActual = new Date();
        const fechaReserva = new Date(`${formData.fecha_reserva}T${formData.hora_reserva}`);

        if (fechaReserva < fechaActual) {
            setErrorMessage('La fecha y hora de reserva deben ser futuras.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/reservas/crear', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setSuccessMessage(response.data.message || 'Reserva enviada con éxito.');
            setErrorMessage('');
            setFormData({
                nombre: '',
                email: '',
                fecha_reserva: '',
                hora_reserva: '',
                mensaje: '',
            });

            // Asegúrate de que la respuesta contenga el ID y otros detalles
            const reservaConId = { ...formData, id: response.data.id };
            
            // Llamamos a la función para agregar la reserva a la lista sin recargar la página
            agregarReserva(reservaConId);  // Ahora pasas la reserva con el id

        } catch (error) {
            setErrorMessage(error.response?.data?.error || 'Error al enviar la reserva. Inténtalo de nuevo.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="reserva-form">
            <h2 className="titlePrincipal">Reserva tu lugar</h2>
            {successMessage && <p className="success">{successMessage}</p>}
            {errorMessage && <p className="error">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="details">
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="details">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="details">
                    <label>Fecha de Reserva</label>
                    <input
                        type="date"
                        name="fecha_reserva"
                        value={formData.fecha_reserva}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="details">
                    <label>Hora de Reserva</label>
                    <input
                        type="time"
                        name="hora_reserva"
                        value={formData.hora_reserva}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="details">
                    <label>Mensaje</label>
                    <textarea
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button type="submit">Enviar Reserva</button>
            </form>
        </div>
    );
};

export default ReservaForm;
