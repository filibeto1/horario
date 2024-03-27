const mongoose = require("mongoose");

const administradorSchema = new mongoose.Schema({
  Nombre: { type: String, required: true },
  AppE: { type: String, required: true },
  ApmE: { type: String, required: true },
  FechaNac: { type: Date, required: true },
  Correo: { type: String, required: true },
  Contraseña:{type:String, required:false},
  Region: { type: String, required: true },
  AreaTrabajo: { type: String, required: true },
  Contrato:{type:String, required:false},
  TurnoActual:{type:String, required:false},
  Rol:{type:String, require:true}
});

module.exports = mongoose.model("Administrador", administradorSchema);