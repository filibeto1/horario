const express = require('express');
const router = express.Router();
const Horario = require('../models/horarioSchema');

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const horarios = await Horario.find();
        res.json(horarios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const horario = await Horario.findById(req.params.id);
        if (!horario) {
            return res.status(404).json({ message: 'Horario no encontrado' });
        }
        res.json(horario);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const horario = new Horario({
        nombreEmpleado: req.body.nombreEmpleado,
        nombreAdmin: req.body.nombreAdmin,
        contrato: req.body.contrato,
        turno: req.body.turno,
        estadoSolicitud: req.body.estadoSolicitud,
        correo: req.body.correo,
        razon: req.body.razon,
        fecha: req.body.fecha
    });

    try {
        const nuevoHorario = await horario.save();
        res.status(201).json(nuevoHorario);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const horarioActualizado = await Horario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!horarioActualizado) {
            return res.status(404).json({ message: "Horario no encontrado" });
        }
        res.json(horarioActualizado);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const horarioEliminado = await Horario.findByIdAndDelete(req.params.id);
        if (!horarioEliminado) {
            return res.status(404).json({ message: "Horario no encontrado" });
        } 
        res.json({ message: "Horario eliminado correctamente", horario: horarioEliminado });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

