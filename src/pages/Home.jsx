import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReservaForm from './ReservaForm'; // Formulario para agregar reservas
import ReservasList from './ReservasList'; // Componente que muestra las reservas
import '../styles/home.css';

const Home = () => {
    const [reservas, setReservas] = useState([]);

    // Obtener las reservas desde el backend
    const fetchReservas = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/reservas');
            setReservas(response.data); // Guardamos las reservas en el estado
        } catch (error) {
            console.error('Error al obtener reservas:', error);
            alert('Hubo un error al cargar las reservas.');
        }
    };

    // Función para agregar una nueva reserva
    const agregarReserva = (nuevaReserva) => {
        setReservas((prevReservas) => [...prevReservas, nuevaReserva]);
    };

    // Función para actualizar las reservas después de alguna acción
    const actualizarReservas = (id, updatedReserva) => {
        if (updatedReserva) {
            setReservas((prevState) =>
                prevState.map((reserva) =>
                    reserva.id === id ? { ...reserva, ...updatedReserva } : reserva
                )
            );
        } else {
            // Eliminar reserva de la lista
            setReservas((prevState) => prevState.filter((reserva) => reserva.id !== id));
        }
    };

    useEffect(() => {
        fetchReservas(); // Obtener las reservas cuando el componente se monte
    }, []); // Solo se ejecuta una vez cuando el componente se monta

    return (
        <div className='bodyHome'>
            <h1 className='welcome'>Bienvenido a la página de reservas</h1>
            
            <ReservaForm agregarReserva={agregarReserva} />
           
            <ReservasList reservas={reservas} actualizarReservas={actualizarReservas} />
        </div>
    );
};

export default Home;
