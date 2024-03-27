const express = require("express");
const router = express.Router();
const cors = require("cors"); // Importa cors
const Area = require("../models/areaschema"); // Importa el modelo de área de trabajo

router.use(cors()); // Configura cors

// Ruta para obtener todas las áreas de trabajo
router.get("/", async (req, res) => {
  try {
    const areas = await Area.find();
    res.json(areas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para crear una nueva área de trabajo
router.post("/", async (req, res) => {
  const nuevaArea = new Area({
    nombre: req.body.nombre,
    sede: req.body.sede,
  });

  try {
    const areaGuardada = await nuevaArea.save();
    res.status(201).json(areaGuardada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para actualizar una área de trabajo existente
router.patch("/:id", async (req, res) => {
  try {
    const area = await Area.findById(req.params.id);
    if (!area) {
      return res.status(404).json({ message: "Área no encontrada" });
    }

    if (req.body.nombre) {
      area.nombre = req.body.nombre;
    }
    if (req.body.sede) {
      area.sede = req.body.sede;
    }

    const areaActualizada = await area.save();
    res.json(areaActualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para eliminar un área de trabajo por su ID
router.delete("/:id", async (req, res) => {
  try {
    const areaEliminada = await Area.findByIdAndDelete(req.params.id);
    if (!areaEliminada) {
      return res.status(404).json({ message: "Área no encontrada" });
    }
    res.json({ message: "Área eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
