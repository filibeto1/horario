import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import Navigation from '../NavigationComponent/Navigation';

export default function TurnoCrud() {
  const [turnos, setTurnos] = useState([]);
  const [areas, setAreas] = useState([]);
  const [showAddTurnoModal, setShowAddTurnoModal] = useState(false);
  const [nuevoTurno, setNuevoTurno] = useState({
    Nombre: "",
    HoraInicio: "",
    HoraFinal: "",
    Area: "",
    Cupo: "",
    Estado: "Activo"
  });
  const [selectedTurno, setSelectedTurno] = useState(null);
  const [valoresTurnoSeleccionado, setValoresTurnoSeleccionado] = useState({
    Nombre: "",
    HoraInicio: "",
    HoraFinal: "",
    AreaTrabajo: "",
    Cupo: "",
    Estado: "Activo"
  });
  const [mostrarModalActualizar, setMostrarModalActualizar] = useState(false);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);

  const fetchTurnos = async () => {
    try {
      const response = await fetch("http://localhost:3002/turnos");
      if (!response.ok) {
        throw new Error("No se pudo obtener la lista de turnos");
      }
      const data = await response.json();
      setTurnos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch("http://localhost:3002/areas");
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de areas");
        }
        const data = await response.json();
        const nombresAreas = data.map(area => area.nombre);
        setAreas(nombresAreas);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAreas();
    fetchTurnos();
  }, []);

  const handleClose = () => {
    setShowAddTurnoModal(false);
    setNuevoTurno({
      Nombre: "",
      HoraInicio: "",
      HoraFinal: "",
      Area: "",
      Cupo: "",
      Estado: "Activo"
    });
    setSelectedTurno(null);
  };

  const handleShow = () => setShowAddTurnoModal(true);

  const addTurno = async () => {
    try {
      if (!nuevoTurno.Nombre || !nuevoTurno.HoraInicio || !nuevoTurno.HoraFinal || !nuevoTurno.Area || !nuevoTurno.Cupo || !nuevoTurno.Estado) {
        throw new Error("Todos los campos son obligatorios");
      }

      const response = await fetch("http://localhost:3002/turnos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoTurno),
      });
      if (!response.ok) {
        throw new Error("No se pudo agregar el turno");
      }
      await fetchTurnos();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTurno = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/turnos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("No se pudo eliminar el turno")
      }
      const nuevosTurnos = turnos.filter(
        (turno) => turno._id !== id
      );
      setTurnos(nuevosTurnos);
    } catch (error) {
      console.error(error);
    }
  };

  const abrirModalActualizar = (turno) => {
    setTurnoSeleccionado(turno);
    setValoresTurnoSeleccionado({
      Nombre: turno.Nombre,
      HoraInicio: turno.HoraInicio,
      HoraFinal: turno.HoraFinal,
      AreaTrabajo: turno.Area,
      Cupo: turno.Cupo,
      Estado: turno.Estado
    });
    setMostrarModalActualizar(true);
  };

  const cerrarModalActualizar = () => {
    setTurnoSeleccionado(null);
    setMostrarModalActualizar(false);
  };

  const updateTurno = async () => {
    try {
      if (!valoresTurnoSeleccionado.Nombre || !valoresTurnoSeleccionado.HoraInicio || !valoresTurnoSeleccionado.HoraFinal || !valoresTurnoSeleccionado.AreaTrabajo || !valoresTurnoSeleccionado.Cupo || !valoresTurnoSeleccionado.Estado) {
        throw new Error("Todos los campos son obligatorios");
      }

      const response = await fetch(`http://localhost:3002/turnos/${turnoSeleccionado._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(valoresTurnoSeleccionado),
      });
      if (!response.ok) {
        throw new Error("No se pudo actualizar el turno");
      }
      const data = await response.json();
      const index = turnos.findIndex(
        (e) => e._id === turnoSeleccionado._id
      );
      const nuevosTurnos = [...turnos];
      nuevosTurnos[index] = data;
      setTurnos(nuevosTurnos);
      cerrarModalActualizar();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navigation />
      <h2 className="AGEMTitulo">Turno</h2>
      <div className="AGEMcontenedor1">
        <div className="AGEMBotonContainer">
          <Button variant="success" className="AGEMBotonverde" onClick={handleShow}>
            Agregar
          </Button>{" "}
        </div>
        <Table className="AGEMTable">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nombre</th>
              <th>Hora Inicio</th>
              <th>Hora Final</th>
              <th>Área</th>
              <th>Cupo</th>
              <th>Estado</th>
              <th>Actualizar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map((turno, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{turno.Nombre}</td>
                <td>{turno.HoraInicio}</td>
                <td>{turno.HoraFinal}</td>
                <td>{turno.Area}</td>
                <td>{turno.Cupo}</td>
                <td>{turno.Estado}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => abrirModalActualizar(turno)}
                  >
                    Actualizar
                  </Button>{" "}
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => deleteTurno(turno._id)}
                  >
                    Eliminar
                  </Button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal show={showAddTurnoModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTurno ? "Actualizar Turno" : "Agregar Turno"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombreTurno">
              <Form.Label>Nombre del Turno</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el nombre del turno" value={nuevoTurno.Nombre} onChange={(e) => setNuevoTurno({ ...nuevoTurno, Nombre: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formHoraInicio">
              <Form.Label>Hora de Inicio</Form.Label>
              <Form.Control type="time" placeholder="Ingrese la hora de inicio" value={nuevoTurno.HoraInicio} onChange={(e) => setNuevoTurno({ ...nuevoTurno, HoraInicio: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formHoraFinal">
              <Form.Label>Hora Final</Form.Label>
              <Form.Control type="time" placeholder="Ingrese la hora final" value={nuevoTurno.HoraFinal} onChange={(e) => setNuevoTurno({ ...nuevoTurno, HoraFinal: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formArea">
              <Form.Label>Área de Trabajo</Form.Label>
              <Form.Control
                as="select"
                value={nuevoTurno.Area}
                onChange={(e) => setNuevoTurno({ ...nuevoTurno, Area: e.target.value })}>
                <option value="">Seleccione...</option>
                {areas.map((area, index) => (
                  <option key={index} value={area}>{area}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formCupo">
              <Form.Label>Cupo</Form.Label>
              <Form.Control type="number" placeholder="Ingrese el cupo del turno" value={nuevoTurno.Cupo} onChange={(e) => setNuevoTurno({ ...nuevoTurno, Cupo: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formEstado">
              <Form.Label>Estado</Form.Label>
              <Form.Control as="select" value={nuevoTurno.Estado} onChange={(e) => setNuevoTurno({ ...nuevoTurno, Estado: e.target.value })}>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
                {/* Agrega más opciones según sea necesario */}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={selectedTurno ? updateTurno : addTurno}>
            {selectedTurno ? "Actualizar" : "Agregar"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={mostrarModalActualizar} onHide={cerrarModalActualizar}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Turno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formNombreActualizar'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="Nombre" value={valoresTurnoSeleccionado.Nombre} onChange={(e) => setValoresTurnoSeleccionado({ ...valoresTurnoSeleccionado, Nombre: e.target.value, })} />
            </Form.Group>
            <Form.Group controlId='formHoraInicioActualizar'>
              <Form.Label>Hora Inicio</Form.Label>
              <Form.Control type="text" name="HoraInicio" value={valoresTurnoSeleccionado.HoraInicio} onChange={(e) => setValoresTurnoSeleccionado({ ...valoresTurnoSeleccionado, HoraInicio: e.target.value, })} />
            </Form.Group>
            <Form.Group controlId='formHoraFinalActualizar'>
              <Form.Label>Hora Final</Form.Label>
              <Form.Control type="text" name="HoraFinal" value={valoresTurnoSeleccionado.HoraFinal} onChange={(e) => setValoresTurnoSeleccionado({ ...valoresTurnoSeleccionado, HoraFinal: e.target.value, })} />
            </Form.Group>
            <Form.Group controlId="formAreaActualizar">
              <Form.Label>Área de Trabajo</Form.Label>
              <Form.Control
                as="select"
                name="AreaTrabajo"
                value={valoresTurnoSeleccionado.AreaTrabajo}
                onChange={(e) =>
                  setValoresTurnoSeleccionado({
                    ...valoresTurnoSeleccionado,
                    AreaTrabajo: e.target.value,
                  })
                }
              >
                <option value="">Selecciona una área</option>
                {areas.map((area) => (
                  <option key={area._id} value={area.nombre}>
                    {area.nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='formCupoActualizar'>
              <Form.Label>Cupo</Form.Label>
              <Form.Control type="number" name="Cupo" value={valoresTurnoSeleccionado.Cupo} onChange={(e) => setValoresTurnoSeleccionado({ ...valoresTurnoSeleccionado, Cupo: e.target.value, })} />
            </Form.Group>
            <Form.Group controlId="formEstadoActualizar">
              <Form.Label>Estado</Form.Label>
              <Form.Control as="select" value={valoresTurnoSeleccionado.Estado} onChange={(e) => setValoresTurnoSeleccionado({ ...valoresTurnoSeleccionado, Estado: e.target.value })}>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
                {/* Agrega más opciones según sea necesario */}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModalActualizar}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={updateTurno}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
