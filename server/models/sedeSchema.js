const mongoose = require("mongoose");

const sedeSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ubicacion: { type: String, required: true }
});

module.exports = mongoose.model("Sede", sedeSchema);
