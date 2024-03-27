const express = require("express");
const router = express.Router();
const contratoController = require('../controllers/contratoController');
const cors = require("cors");
const Contrato = require("../models/contratoSchema");

router.use(cors());

// Ruta para obtener todos los contratos
router.get("/", async (req, res) => {
  try {
    const contratos = await Contrato.find();
    res.json(contratos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para crear un nuevo contrato
router.post("/", async (req, res) => {
  const nuevoContrato = new Contrato({
    fechaInicio: req.body.fechaInicio,
    fechaFin: req.body.fechaFin,
    diasLaborales: req.body.diasLaborales,
    diasDescanso: req.body.diasDescanso,
  });

  try {
    const contratoGuardado = await nuevoContrato.save();
    res.status(201).json(contratoGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para actualizar un contrato existente
router.patch("/:id", async (req, res) => {
  try {
    const contrato = await Contrato.findById(req.params.id);
    if (!contrato) {
      return res.status(404).json({ message: "Contrato no encontrado" });
    }

    if (req.body.fechaInicio) {
      contrato.fechaInicio = req.body.fechaInicio;
    }
    if (req.body.fechaFin) {
      contrato.fechaFin = req.body.fechaFin;
    }
    if (req.body.diasLaborales) {
      contrato.diasLaborales = req.body.diasLaborales;
    }
    if (req.body.diasDescanso) {
      contrato.diasDescanso = req.body.diasDescanso;
    }

    const contratoActualizado = await contrato.save();
    res.json(contratoActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para eliminar un contrato por su ID
router.delete("/:id", async (req, res) => {
  try {
    const contratoEliminado = await Contrato.findByIdAndDelete(req.params.id);
    if (!contratoEliminado) {
      return res.status(404).json({ message: "Contrato no encontrado" });
    }
    res.json({ message: "Contrato eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
