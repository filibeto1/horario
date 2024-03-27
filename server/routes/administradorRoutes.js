const express = require("express");
const router = express.Router();
const administradorController = require("../controllers/administradorController");
const cors = require("cors");
const Administrador = require("../models/administradorSchema");

// Middleware para permitir CORS
router.use(cors());

// Ruta para obtener todos los administradores, con opción de seleccionar campos específicos
router.get("/", async (req, res) => {
  try {
    const camposSeleccionados = req.query.campos;
    let query = Administrador.find();
    if (camposSeleccionados) {
      const camposArray = camposSeleccionados.split(",");
      query = query.select(camposArray.join(" "));
    }
    const administradores = await query.exec();
    res.json(administradores);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los administradores" });
  }
});

// Ruta para crear un nuevo Administrador
router.post("/", administradorController.validarCorreoUnico, async (req, res) => {
  try {
    const nuevoAdministrador = new Administrador(req.body);
    await nuevoAdministrador.save();
    res.status(201).send(nuevoAdministrador);
  } catch (error) {
    res.status(400).json({ error: "Error al crear un nuevo administrador" });
  }
});

// Ruta para actualizar un administrador existente
router.patch("/:id", administradorController.validarCorreoUnico, async (req, res) => {
  try {
    const administrador = await Administrador.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!administrador) {
      return res.status(404).json({ error: "Administrador no encontrado" });
    }
    res.json(administrador);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar el administrador" });
  }
});

// Ruta para eliminar un administrador por su ID
router.delete("/:id", async (req, res) => {
  try {
    const administradorEliminado = await Administrador.findByIdAndDelete(req.params.id);
    if (!administradorEliminado) {
      return res.status(404).json({ error: "Administrador no encontrado" });
    }
    res.json({ message: "Administrador eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el administrador" });
  }
});

module.exports = router;
