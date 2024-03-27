const Administrador = require('../models/administradorSchema');

// Middleware para validar correo electrónico único
exports.validarCorreoUnico = async (req, res, next) => {
  const { Correo } = req.body;
  const administradorId = req.params.id; // Suponiendo que el ID del empleado se pasa en los parámetros de la ruta
  try {
    const administradorExistente = await Administrador.findOne({ Correo });
    if (administradorExistente && administradorExistente._id.toString() !== administradorId) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
    }
    next(); // Continuar con la siguiente función de middleware si el correo es único
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

// Controlador para actualizar un empleado existente
exports.actualizarAdministrador = async (req, res) => {
  try {
    // Buscar el empleado por su ID
    const administrador = await Administrador.findById(req.params.id);
    if (!administrador) {
      // Si no se encuentra el empleado, devuelve un error 404
      return res.status(404).json({ message: "Administrador no encontrado" });
    }

    // Actualizar los campos del empleado con los datos recibidos en el cuerpo de la solicitud
    // No es necesario verificar la existencia de los campos ya que el middleware ya validó el correo electrónico único
    administrador.Nombre = req.body.Nombre;
    administrador.AppE = req.body.AppE;
    administrador.ApmE = req.body.ApmE;
    administrador.FechaNac = req.body.FechaNac;
    administrador.Correo = req.body.Correo;
    administrador.Region = req.body.Region;
    administrador.AreaTrabajo = req.body.AreaTrabajo;
    administrador.Rol = req.body.Rol;

    // Guardar los cambios en la base de datos
    const administradorActualizado = await administrador.save();
    // Responder con el empleado actualizado
    res.json(administradorActualizado); // Aquí estaba el error
  } catch (error) {
    // Si ocurre un error, responder con un código de estado 400 y un mensaje de error
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

