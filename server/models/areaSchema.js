const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  sede: { type: String, required: true },
});

module.exports = mongoose.model("Area", areaSchema);
