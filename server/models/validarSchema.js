const mongoose = require('mongoose');

const turnoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  horaInicio: { type: String, required: true },
  horaFinal: { type: String, required: true },
  areaTrabajo: { type: String, required: true },
  cupo: { type: Number, required: true },
  estado: { type: String, enum: ['Activo', 'Inactivo'], default: 'Activo' }
});

const Turno = mongoose.model('Turno', turnoSchema);

module.exports = Turno;
