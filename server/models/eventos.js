const mongoose = require("mongoose");

const eventosSchema = new mongoose.Schema({
  evento: { type: String, required: true , unique: true},
  lugarEvento:{type: String, required:true},
  fechaEvento:{ type: String },
  asistentes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Asistente' }],
  limiteAsistentes: { type: Number, default: 5 }
});


// validación personalizada para evitar agregar el mismo asistente más de una vez al evento
eventosSchema.path('asistentes').validate(function(value) {
  const duplicates = value.filter((item, index) => value.indexOf(item) !== index);
  return duplicates.length === 0;
}, 'No se pueden agregar el mismo asistente más de una vez al evento');

module.exports = mongoose.model("Eventos", eventosSchema);
