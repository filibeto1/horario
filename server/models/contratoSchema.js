const mongoose = require("mongoose");

const contratoSchema = new mongoose.Schema({
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  diasLaborales: { type: Number, required: true },
  diasDescanso: { type: Number, required: true }
});

module.exports = mongoose.model("Contrato", contratoSchema);
