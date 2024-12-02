const db = require("../models/db");

const moment = require("moment");

//Controlador para crear una reserva
const crearReserva = async (req, res) => {
  console.log("Datos recibidos en el backend:", req.body);
  const { nombre, email, fecha_reserva, hora_reserva, mensaje } = req.body;

  try {
    const [result] = await db.execute(
      "INSERT INTO reservas (nombre, email, fecha_reserva, hora_reserva, mensaje) VALUES (?, ?, ?, ?, ?)",
      [nombre, email, fecha_reserva, hora_reserva, mensaje]
    );
    res
      .status(201)
      .json({ id: result.insertId, message: "Reserva creada con éxito" });
  } catch (error) {
    console.error("Error al crear la reserva:", error);
    res.status(500).json({ error: "Error al crear la reserva" });
  }
};

// Controlador para obtener las reservas

const obtenerReservas = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM reservas");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener las reservas:", error);
    res.status(500).json({ error: "Error al obtener las reservas" });
  }
};

//Obtener las reservas mediante el ID

const reservasID = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute("SELECT * FROM reservas WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error al obtener la reserva:", error);
    res.status(500).json({ error: "Error al obtener la reserva" });
  }
};


// Actualización de reserva mediante ID
const updateID = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, fecha_reserva, hora_reserva, mensaje } = req.body;

  try {
    // Validar que las fechas y horas sean válidas
    const fecha = moment(fecha_reserva, "YYYY-MM-DD", true);
    const hora = moment(hora_reserva, "HH:mm", true);

    if (!fecha.isValid()) {
      return res.status(400).json({ error: "Formato de fecha inválido. Use YYYY-MM-DD." });
    }

    if (!hora.isValid()) {
      return res.status(400).json({ error: "Formato de hora inválido. Use HH:mm." });
    }

    // Verificar si la reserva existe
    const [rows] = await db.execute("SELECT * FROM reservas WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    const reserva = rows[0];
    const reservaFechaHora = moment(`${reserva.fecha_reserva} ${reserva.hora_reserva}`, "YYYY-MM-DD HH:mm");
    const now = moment();

    // Validación de que la reserva está dentro de las 48 horas
    const diffHours = now.diff(reservaFechaHora, "hours");
    if (diffHours > 48) {
      return res.status(400).json({
        error: "No puedes actualizar una reserva después de las 48 horas realizadas",
      });
    }

    // Formatear las fechas para la base de datos
    const formattedFecha = fecha.format("YYYY-MM-DD");
    const formattedHora = hora.format("HH:mm");

    // Actualizar la reserva
    const [result] = await db.execute(
      "UPDATE reservas SET nombre = ?, email = ?, fecha_reserva = ?, hora_reserva = ?, mensaje = ? WHERE id = ?",
      [nombre, email, formattedFecha, formattedHora, mensaje, id]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ error: "No se pudo actualizar la reserva" });
    }

    res.status(200).json({ message: "Reserva actualizada con éxito" });
  } catch (error) {
    console.error("Error al actualizar la reserva:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


const deleteReservas = async (req, res) => {
  const { id } = req.params;

  // Obtener la reserva mediante el ID
  try {
    const [rows] = await db.execute("SELECT * FROM reservas WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    const reserva = rows[0];
    const reservaFechaHora = moment(
      `${reserva.fecha_reserva} ${reserva.hora_reserva}`
    );
    const now = moment();

    const diffHours = now.diff(reservaFechaHora, "hours");

    if (diffHours > 24) {
      return res.status(400).json({
        error:
          "No puedes eliminar una reserva pasada las 24 horas de haberla realizado.",
      });
    }

    // Eliminar una reserva

    const [result] = await db.execute("DELETE FROM reservas WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }
    res.status(200).json({ message: "Reserva eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar la reserva:", error);
    res.status(500).json({ error: "Error al eliminar la reserva" });
  }
};

module.exports = {
  crearReserva,
  obtenerReservas,
  reservasID,
  updateID,
  deleteReservas,
};
