import React from 'react';
import ReservaActions from './ReservaActions'; // Acciones para modificar/eliminar reservas
import '../styles/reservaList.css'

const ReservasList = ({ reservas, actualizarReservas }) => {
    // Función para formatear la fecha
    const formatFecha = (fecha) => {
        const date = new Date(fecha);
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const anio = date.getFullYear();
        return `${dia}/${mes}/${anio}`;
    };

    return (
        <div className='reservaLista'>
    <h2>Lista de Reservas</h2>
    {reservas.length === 0 ? (
        <p>No hay reservas.</p>
    ) : (
        reservas.map((reserva, index) => (
            <div key={reserva.id || index}>
                <p><strong>Nombre:</strong> {reserva.nombre}</p>
                <p><strong>Email:</strong> {reserva.email}</p>
                <p><strong>Fecha:</strong> {formatFecha(reserva.fecha_reserva)}</p>
                <p><strong>Hora:</strong> {reserva.hora_reserva}</p>
                <p><strong>Mensaje:</strong> {reserva.mensaje}</p>
                <ReservaActions reserva={reserva} actualizarReservas={actualizarReservas} />
            </div>
        ))
    )}
</div>
    );
};

export default ReservasList;
