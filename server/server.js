// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3002;

// Middleware
app.use(bodyParser.json());

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/solicitudesturno', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const turnoSchema = new mongoose.Schema({
  Nombre: String,
  HoraInicio: String,
  HoraFinal: String,
  Area: String,
  Cupo: Number,
  Estado: String,
});
const Turno = mongoose.model('Turno', turnoSchema);

// Routes
app.get('/turnos', async (req, res) => {
  try {
    const turnos = await Turno.find();
    res.json(turnos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/turnos', async (req, res) => {
  const nuevoTurno = new Turno(req.body);
  try {
    const turnoGuardado = await nuevoTurno.save();
    res.status(201).json(turnoGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
