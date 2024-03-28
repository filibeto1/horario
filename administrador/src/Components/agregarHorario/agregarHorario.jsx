import React, { useState, useEffect } from 'react';
import '../agregarHorario/css/agregarHorario.css';
import Navigation from "../NavigationComponent/Navigation";
import { faTrash, faEdit, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MensajeEmergente({ mensaje, onClose }) {
  return (
    <div className="mensaje-emergente">
      <p>{mensaje}</p>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
}

function VisualizarHorario({ horario, onClose }) {
  return (
    <div className="formulario-emergente">
        <div className="formulario-container" style={{ width: '100%', margin: '0 auto', overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>        
        <span className="close" onClick={onClose}>&times;</span>
        <div style={{ backgroundColor: 'blue', padding: '10px 0', textAlign: 'center', overflowY: 'hidden' }}>
          <h2 style={{ color: 'white', margin: 0 }}>Visualizar Horario</h2>
        </div>
        <table>
          <tbody>
            <tr>
              <td><strong>Nombre del Empleado:</strong></td>
              <td>{horario.nombreEmpleado}</td>
            </tr>
            <tr>
              <td><strong>Nombre del Administrador:</strong></td>
              <td>{horario.nombreAdmin}</td>
            </tr>
            <tr>
              <td><strong>Contrato:</strong></td>
              <td>{horario.contrato}</td>
            </tr>
            <tr>
              <td><strong>Turno:</strong></td>
              <td>{horario.turno}</td>
            </tr>
            <tr>
              <td><strong>Estado de la Solicitud:</strong></td>
              <td>{horario.estadoSolicitud}</td>
            </tr>
            <tr>
              <td><strong>Correo Electrónico:</strong></td>
              <td>{horario.correo}</td>
            </tr>
            <tr>
              <td><strong>Razón de la Solicitud:</strong></td>
              <td>{horario.razon}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const FormularioHorario = () => {
  const [formulario, setFormulario] = useState({
    nombreEmpleado: '',
    nombreAdmin: '',
    contrato: '',
    turno: '',
    estadoSolicitud: '',
    correo: '',
    razon: ''
  });

  const [historial, setHistorial] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [filtroNombreEmpleado, setFiltroNombreEmpleado] = useState('');
  const [filtroContrato, setFiltroContrato] = useState('');
  const [filtroTurno, setFiltroTurno] = useState('');
  const [administradores, setAdministradores] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [contador, setContador] = useState(1);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const existeCorreo = historial.some((horario) => {
        return horario.correo === formulario.correo && horario._id !== formulario._id;
      });
  
      if (existeCorreo) {
        setMensaje('Ya existe un registro con este correo electrónico');
        return;
      }
  
      let url = 'http://localhost:3002/horario';
      let method = 'POST';
  
      if (formulario._id) {
        url += `/${formulario._id}`;
        method = 'PATCH';
      }
  
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formulario)
      });
      if (response.ok) {
        fetchHistorial();
        setFormulario({
          nombreEmpleado: '',
          nombreAdmin: '',
          contrato: '',
          turno: '',
          estadoSolicitud: '',
          correo: '',
          razon: ''
        });
        setMensaje(formulario._id ? 'Horario actualizado correctamente' : 'Horario guardado correctamente');
        setContador(prevCount => prevCount + 0); // Incrementar el contador
      } else {
        console.error('Error al enviar la solicitud');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const filtrarHistorial = () => {
    let historialFiltrado = historial.filter((horario) => {
      return horario.nombreEmpleado.toLowerCase().includes(filtroNombreEmpleado.toLowerCase()) &&
             horario.contrato.toLowerCase().includes(filtroContrato.toLowerCase()) &&
             horario.turno.toLowerCase().includes(filtroTurno.toLowerCase());
    });
    return historialFiltrado;
  };

  useEffect(() => {
    fetchHistorial();
    fetchAdministradores();
    fetchTurnos();
  }, []);

  const fetchHistorial = async () => {
    try {
      const response = await fetch('http://localhost:3002/horario');
      if (response.ok) {
        const data = await response.json();
        setHistorial(data);
      } else {
        console.error('Error al obtener el historial');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const handleEliminar = async (id) => {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este horario?');
    
    if (confirmacion) {
      try {
        const response = await fetch(`http://localhost:3002/horario/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          fetchHistorial();
          console.log('Horario eliminado correctamente');
        } else {
          console.error('Error al eliminar el horario:', response.statusText);
        }
      } catch (error) {
        console.error('Error de red al eliminar el horario:', error);
      }
    }
  };
  
  const handleActualizar = (horario) => {
    setFormulario({
      ...horario
    });
    setMostrarFormulario(true);
  };

  const handleCloseMensaje = () => {
    setMensaje('');
  };

  const fetchAdministradores = async () => {
    try {
      const response = await fetch('http://localhost:3002/administrador');
      if (response.ok) {
        const data = await response.json();
        setAdministradores(data);
      } else {
        console.error('Error al obtener los administradores');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const fetchTurnos = async () => {
    try {
      const response = await fetch('http://localhost:3002/turnos');
      if (response.ok) {
        const data = await response.json();
        setTurnos(data);
      } else {
        console.error('Error al obtener los turnos');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const handleMostrarFormulario = () => {
    setMostrarFormulario(true);
  };

  const handleCloseFormulario = () => {
    setMostrarFormulario(false);
    setFormulario({
      nombreEmpleado: '',
      nombreAdmin: '',
      contrato: '',
      turno: '',
      estadoSolicitud: '',
      correo: '',
      razon: ''
    });
  };

  const handleMostrarVisualizarHorario = (horario) => {
    setHorarioSeleccionado(horario);
  };

  const handleCloseVisualizarHorario = () => {
    setHorarioSeleccionado(null);
  };

  return (
    <div className="tabla-container">
      <Navigation />
  
      {mostrarFormulario && (
        <div className="formulario-emergente">
          <div className="formulario-container" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
            <span className="close" onClick={handleCloseFormulario}>&times;</span>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Agregar Horario</h2>
            <form onSubmit={handleSubmit}>
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td><label htmlFor="nombreEmpleado">Nombre Empleado:</label></td>
                    <td><input type="text" id="nombreEmpleado" name="nombreEmpleado" value={formulario.nombreEmpleado} onChange={handleChange} required/></td>
                  </tr>
                  <tr>
                    <td><label htmlFor="nombreAdmin">Nombre Administrador:</label></td>
                    <td>
                      <select id="nombreAdmin" name="nombreAdmin" value={formulario.nombreAdmin} onChange={handleChange} required>
                        <option value="">Selecciona un administrador</option>
                        {administradores.map((admin, index) => (
                          <option key={index} value={admin.Nombre}>{admin.Nombre}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="contrato">Contrato:</label></td>
                    <td>
                      <select id="contrato" name="contrato" value={formulario.contrato} onChange={handleChange} required>
                        <option value="">Selecciona el estado del contrato</option>
                        <option value="Aceptado">Aceptado</option>
                        <option value="Denegado">Denegado</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="turno">Turno:</label></td>
                    <td>
                      <select id="turno" name="turno" value={formulario.turno} onChange={handleChange} required>
                        <option value="">Selecciona un turno</option>
                        {turnos.map((turno, index) => (
                          <option key={index} value={turno.Nombre}>{turno.Nombre}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="estadoSolicitud">Estado Solicitud:</label></td>
                    <td><input type="text" id="estadoSolicitud" name="estadoSolicitud" value={formulario.estadoSolicitud} onChange={handleChange} required/></td>
                  </tr>
                  <tr>
                    <td><label htmlFor="correo">Correo Electrónico:</label></td>
                    <td><input type="email" id="correo" name="correo" value={formulario.correo} onChange={handleChange} required/></td>
                  </tr>
                  <tr>
                    <td><label htmlFor="razon">Razón Solicitud:</label></td>
                    <td><textarea id="razon" name="razon" value={formulario.razon} onChange={handleChange} required/></td>
                  </tr>
                </tbody>
              </table>
              <button className="button agregar" onClick={handleMostrarFormulario}>Enviar</button>
            </form>
            {mensaje && <MensajeEmergente mensaje={mensaje} onClose={handleCloseMensaje} />}
          </div>
        </div>
      )}
      <div>
        <h2>Historial de Horarios</h2>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
        <button className="buttonAgregar" onClick={() => setMostrarFormulario(true)}>+ Nuevo Horario</button>

          <div className="filtros" style={{ display: 'flex', marginLeft: '10px' }}>
            <div className="filtro">
              <input type="text" id="filtroNombreEmpleado" placeholder="Nombre de Empleado" value={filtroNombreEmpleado} onChange={(e) => setFiltroNombreEmpleado(e.target.value)} />
            </div>
            <div className="filtro">
              <input type="text" id="filtroContrato" placeholder="Contrato" value={filtroContrato} onChange={(e) => setFiltroContrato(e.target.value)} />
            </div>
            <div className="filtro">
              <input type="text" id="filtroTurno" placeholder="Turno" value={filtroTurno} onChange={(e) => setFiltroTurno(e.target.value)} />
            </div>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr className="primera-fila">
            <th>#</th>
            <th>Nombre del Empleado</th>
            <th>Nombre del Administrador</th>
            <th>Contrato</th>
            <th>Correo Electrónico</th>
            <th>Turno</th>
            <th>Razón de la Solicitud</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Renderizar el historial filtrado */}
          {filtrarHistorial().map((horario, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{horario.nombreEmpleado}</td>
              <td>{horario.nombreAdmin}</td>
              <td>{horario.contrato}</td>
              <td>{horario.correo}</td>
              <td>{horario.turno}</td>
              <td>{horario.razon}</td>
              <td>
                <div className="icon-container">
                  <button className="eliminar" onClick={() => handleEliminar(horario._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
                <div className="icon-container">
                  <button className="actualizar" onClick={() => handleActualizar(horario)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </div>
                <div className="icon-container">
                  <button className="ver-horario" onClick={() => handleMostrarVisualizarHorario(horario)}>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {horarioSeleccionado && (
        <VisualizarHorario horario={horarioSeleccionado} onClose={handleCloseVisualizarHorario} />
      )}
    </div>
  );
};

export default FormularioHorario;

