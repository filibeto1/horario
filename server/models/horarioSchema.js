const mongoose = require('mongoose');

const horarioSchema = new mongoose.Schema({
    nombreEmpleado: {
        type: String,
        required: true
    }, 
    nombreAdmin: {
        type: String,
        required: true
    },
    contrato: {
        type: String,
        required: true
    },
    turno: {
        type: String,
        required: true
    },
    estadoSolicitud: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    razon: {
        type: String,
        required: true
    }
});

const Horario = mongoose.model('Horario', horarioSchema);

module.exports = Horario;
