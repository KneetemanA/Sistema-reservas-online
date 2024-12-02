import React, { useState } from 'react';
import axios from 'axios';

import '../styles/reservaActions.css';

const ReservaActions = ({ reserva, actualizarReservas }) => {
    // Conversión inicial de la fecha al estado
    const convertirFecha = (fecha) => {
        return fecha ? new Date(fecha).toISOString().split('T')[0] : '';
    };

    const [formData, setFormData] = useState({
        id: reserva.id,
        nombre: reserva.nombre,
        email: reserva.email,
        fecha_reserva: convertirFecha(reserva.fecha_reserva),
        hora_reserva: reserva.hora_reserva,
        mensaje: reserva.mensaje,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const actualizarReserva = async () => {
        
        if (!reserva?.id) {
            console.error('ID de la reserva no disponible. No se puede realizar la acción.');
            return;
        }
    
        if (!formData.nombre || !formData.email || !formData.fecha_reserva || !formData.hora_reserva) {
            alert('Por favor completa todos los campos antes de actualizar.');
            return;
        }
    
        const horaReservaFormatted = formData.hora_reserva.length === 5 && formData.hora_reserva.indexOf(':') === 2
        ? formData.hora_reserva
        : formData.hora_reserva.substring(0, 2) + ':' + formData.hora_reserva.substring(2, 4); 


        try {
            const response = await axios.put(
                `http://localhost:5000/api/reservas/${reserva.id}`,
                {
                    nombre: formData.nombre,
                    email: formData.email,
                    fecha_reserva: formData.fecha_reserva,
                    hora_reserva: horaReservaFormatted,
                    mensaje: formData.mensaje,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Reserva actualizada:', response.data.message);
    
            // Actualizar la reserva en el componente padre (ya manejado por fetchReservas en Home.jsx)
            actualizarReservas(reserva.id, formData);


        } catch (error) {
            console.error('Error al actualizar la reserva:', error.response?.data || error.message);
        }
    };

    const eliminarReserva = async () => {
        if (!reserva?.id) {
            console.error('ID de la reserva no disponible. No se puede realizar la acción.');
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:5000/api/reservas/${reserva.id}`);
            alert('Reserva eliminada con éxito');
            console.log(response.data);
            actualizarReservas(reserva.id, null);
        } catch (error) {
            alert(error.response?.data?.error || 'Error al eliminar la reserva');
        }
    };

    return (
        <div className="update">
            <h3 className="titleUpdate">Actualizar Reserva</h3>
            <form>
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Nombre"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                />
                <input
                    type="date"
                    name="fecha_reserva"
                    value={formData.fecha_reserva}
                    onChange={handleInputChange}
                />
                <input
                    type="time"
                    name="hora_reserva"
                    value={formData.hora_reserva}
                    onChange={handleInputChange}
                />
                <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    placeholder="Mensaje"
                ></textarea>
                <button className="btnUpdate" type="button" onClick={actualizarReserva}>
                    Actualizar Reserva
                </button>
            </form>
            <button className="btnDelete" onClick={eliminarReserva}>
                Eliminar Reserva
            </button>
        </div>
    );
};

export default ReservaActions;
