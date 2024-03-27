const express = require('express');
const router = express.Router();
const Turno = require('../models/turnoSchema'); // Asegúrate de que la ruta del modelo sea correcta

// Middleware para obtener un turno por su ID
async function getTurno(req, res, next) {
  let turno;
  try {
    turno = await Turno.findById(req.params.id);
    if (turno == null) {
      return res.status(404).json({ message: 'Turno no encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.turno = turno;
  next();
}

// Ruta para obtener todos los turnos
router.get('/', async (req, res) => {
  try {
    const turnos = await Turno.find();
    res.json(turnos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para crear un nuevo turno
router.post('/', async (req, res) => {
  const turno = new Turno({
    nombre: req.body.nombre,
    horaInicio: req.body.horaInicio,
    horaFinal: req.body.horaFinal,
    areaTrabajo: req.body.areaTrabajo,
    cupo: req.body.cupo,
    estado: req.body.estado
  });

  try {
    const nuevoTurno = await turno.save();
    res.status(201).json(nuevoTurno);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para obtener un turno por su ID
router.get('/:id', getTurno, (req, res) => {
  res.json(res.turno);
});

// Ruta para actualizar un turno
router.patch('/:id', getTurno, async (req, res) => {
  if (req.body.nombre != null) {
    res.turno.nombre = req.body.nombre;
  }
  if (req.body.horaInicio != null) {
    res.turno.horaInicio = req.body.horaInicio;
  }
  // Repite el proceso para los demás campos del turno

  try {
    const turnoActualizado = await res.turno.save();
    res.json(turnoActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para validar un turno por su ID
router.patch('/:id/validar', getTurno, async (req, res) => {
  try {
    res.turno.estado = 'Validado';
    const turnoValidado = await res.turno.save();
    res.json(turnoValidado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para rechazar un turno por su ID
router.patch('/:id/rechazar', getTurno, async (req, res) => {
  try {
    res.turno.estado = 'Rechazado';
    const turnoRechazado = await res.turno.save();
    res.json(turnoRechazado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para eliminar un turno
router.delete('/:id', getTurno, async (req, res) => {
  try {
    await res.turno.remove();
    res.json({ message: 'Turno eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
