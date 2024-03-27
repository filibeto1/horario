const express = require("express");
const router = express.Router();
const Sede = require("../models/sedeSchema");

// Ruta para obtener todas las sedes
router.get("/", async (req, res) => {
  try {
    const sedes = await Sede.find();
    res.json(sedes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para crear una nueva sede
router.post("/", async (req, res) => {
  const nuevaSede = new Sede({
    nombre: req.body.nombre,
    ubicacion: req.body.ubicacion
  });

  try {
    const sedeGuardada = await nuevaSede.save();
    res.status(201).json(sedeGuardada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para actualizar una sede existente
router.put("/:id", async (req, res) => {
  try {
    const sede = await Sede.findById(req.params.id);
    if (!sede) {
      return res.status(404).json({ message: "Sede no encontrada" });
    }

    sede.nombre = req.body.nombre || sede.nombre;
    sede.ubicacion = req.body.ubicacion || sede.ubicacion;

    const sedeActualizada = await sede.save();
    res.json(sedeActualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para eliminar una sede por su ID
router.delete("/:id", async (req, res) => {
  try {
    const sedeEliminada = await Sede.findByIdAndDelete(req.params.id);
    if (!sedeEliminada) {
      return res.status(404).json({ message: "Sede no encontrada" });
    }
    res.json({ message: "Sede eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
