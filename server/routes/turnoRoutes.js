const express = require("express");
const router = express.Router();
const cors = require("cors"); // Importa cors
const Turno = require("../models/turnoSchema");

router.use(cors());

// Ruta para obtener todos los turnos, con opción de seleccionar campos específicos
router.get("/", async (req, res) => {
  try {
    // Verifica si se especificaron campos específicos en la solicitud
    const camposSeleccionados = req.query.campos;
    let query = Turno.find();
    // Si se especificaron campos, se seleccionan esos campos
    if (camposSeleccionados) {
      const camposArray = camposSeleccionados.split(",");
      query = query.select(camposArray.join(" "));
    }
    // Ejecuta la consulta y envía la lista de turnos como respuesta
    const turnos = await query.exec();
    res.json(turnos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para crear un nuevo Turno
router.post("/", async (req, res) => {
  // Crea un nuevo objeto Turno con los datos recibidos en el cuerpo de la solicitud
  const nuevoTurno = new Turno({
    Nombre: req.body.Nombre,
    HoraInicio: req.body.HoraInicio,
    HoraFinal: req.body.HoraFinal,
    Area: req.body.Area,
    Cupo: req.body.Cupo,
    Estado: req.body.Estado,
  });

  try {
    // Guarda el nuevo turno en la base de datos
    const turnoGuardado = await nuevoTurno.save();
    // Responde con el nuevo turno creado
    res.status(201).json(turnoGuardado);
  } catch (error) {
    // Si ocurre un error, responde con un código de estado 400 y un mensaje de error
    res.status(400).json({ message: error.message });
  }
});

// Ruta para actualizar un turno existente
router.patch("/:id", async (req, res) => {
  try {
    // Busca el turno por su ID
    const turno = await Turno.findById(req.params.id);
    if (!turno) {
      // Si no se encuentra el turno, devuelve un error 404
      return res.status(404).json({ message: "Turno no encontrado" });
    }

    // Actualiza los campos del turno con los datos recibidos en el cuerpo de la solicitud
    if (req.body.Nombre) {
      turno.Nombre = req.body.Nombre;
    }
    if (req.body.HoraInicio) {
      turno.HoraInicio = req.body.HoraInicio;
    }
    if (req.body.HoraFinal) {
      turno.HoraFinal = req.body.HoraFinal;
    }
    if (req.body.Area) {
      turno.Area = req.body.Area;
    }
    if (req.body.Cupo) {
      turno.Cupo = req.body.Cupo;
    }
    if (req.body.Estado) {
      turno.Estado = req.body.Estado;
    }

    // Guarda los cambios en la base de datos
    const turnoActualizado = await turno.save();
    // Responde con el turno actualizado
    res.json(turnoActualizado);
  } catch (error) {
    // Si ocurre un error, responde con un código de estado 400 y un mensaje de error
    res.status(400).json({ message: error.message });
  }
});

// Ruta para eliminar un turno por su ID
router.delete("/:id", async (req, res) => {
  try {
    // Busca y elimina el turno por su ID
    const turnoEliminado = await Turno.findByIdAndDelete(req.params.id);
    if (!turnoEliminado) {
      // Si no se encuentra el turno, devuelve un error 404
      return res.status(404).json({ message: "Turno no encontrado" });
    }
    // Devuelve un mensaje indicando que el turno fue eliminado con éxito
    res.json({ message: "Turno eliminado" });
  } catch (error) {
    // Si ocurre un error, devuelve un error 500 y un mensaje
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;