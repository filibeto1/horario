import React, { useState, useEffect } from "react";
import { Button, FormControl, Table, Form, Modal } from "react-bootstrap";
import Navigation from "../NavigationComponent/Navigation";
import "../contratos/css/contrato.css";

export default function Contratos() {
  const [contratos, setContratos] = useState([]);
  const [nuevoContrato, setNuevoContrato] = useState({
    fechaInicio: "",
    fechaFin: "",
    diasLaborales: "",
    diasDescanso: "",
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [contratoSeleccionado, setContratoSeleccionado] = useState(null);
  const [valoresContratoSeleccionado, setValoresContratoSeleccionado] = useState({
    fechaInicio: "",
    fechaFin: "",
    diasLaborales: "",
    diasDescanso: "",
  });
  const [mostrarModalActualizar, setMostrarModalActualizar] = useState(false);
  const [filtroFechaInicio, setFiltroFechaInicio] = useState("");
  const [filtroFechaFin, setFiltroFechaFin] = useState("");
  const [filtroDiasLaborales, setFiltroDiasLaborales] = useState("");
  const [filtroDiasDescanso, setFiltroDiasDescanso] = useState("");

  // Función para formatear la fecha en un formato deseado (solo fecha, sin hora)
  const formatFecha = (fecha) => {
    const fechaObj = new Date(fecha);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const fechaFormateada = fechaObj.toLocaleDateString('es-MX', options);
    return fechaFormateada;
  };

  useEffect(() => {
    const fetchContratos = async () => {
      try {
        const response = await fetch("http://localhost:3002/contratos");
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de contratos");
        }
        const data = await response.json();
        setContratos(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContratos();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevoContrato((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const agregarContrato = async () => {
    try {
      const response = await fetch("http://localhost:3002/contratos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoContrato),
      });

      if (!response.ok) {
        throw new Error("No se pudo agregar el contrato");
      }

      const data = await response.json();
      setContratos([...contratos, data]);
      setNuevoContrato({ fechaInicio: "", fechaFin: "", diasLaborales: "", diasDescanso: "" });
      setMostrarFormulario(false);
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarContrato = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/contratos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("No se pudo eliminar el contrato");
      }
      const nuevosContratos = contratos.filter((contrato) => contrato._id !== id);
      setContratos(nuevosContratos);
    } catch (error) {
      console.error(error);
    }
  };

  const abrirModalActualizar = (contrato) => {
    setContratoSeleccionado(contrato);
    setValoresContratoSeleccionado({ ...contrato });
    setMostrarModalActualizar(true);
  };

  const cerrarModalActualizar = () => {
    setContratoSeleccionado(null);
    setMostrarModalActualizar(false);
  };

  const actualizarContrato = async () => {
    try {
      const response = await fetch(
        `http://localhost:3002/contratos/${contratoSeleccionado._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(valoresContratoSeleccionado),
        }
      );
      if (!response.ok) {
        throw new Error("No se pudo actualizar el contrato");
      }
      const data = await response.json();
      const index = contratos.findIndex((c) => c._id === contratoSeleccionado._id);
      const nuevosContratos = [...contratos];
      nuevosContratos[index] = data;
      setContratos(nuevosContratos);
      cerrarModalActualizar();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navigation />
      <h2 className="titulo">Gestión de Contratos</h2>
      <div className="contenedor">
        <div className="boton-container">
          <Button
            variant="success"
            className="boton-verde"
            onClick={() => setMostrarFormulario(true)}
          >
            Agregar
          </Button>{" "}
          <FormControl
            type="text"
            placeholder="Filtrar por fecha de inicio..."
            className="filtro"
            value={filtroFechaInicio}
            onChange={(e) => setFiltroFechaInicio(e.target.value)}
          />
          <FormControl
            type="text"
            placeholder="Filtrar por fecha de fin..."
            className="filtro"
            value={filtroFechaFin}
            onChange={(e) => setFiltroFechaFin(e.target.value)}
          />
          <FormControl
            type="number"
            placeholder="Filtrar por días laborales..."
            className="filtro"
            value={filtroDiasLaborales}
            onChange={(e) => setFiltroDiasLaborales(e.target.value)}
          />
          <FormControl
            type="number"
            placeholder="Filtrar por días de descanso..."
            className="filtro"
            value={filtroDiasDescanso}
            onChange={(e) => setFiltroDiasDescanso(e.target.value)}
          />
        </div>
        <Modal
          show={mostrarFormulario}
          onHide={() => setMostrarFormulario(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Agregar Contrato</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formFechaInicio">
                <Form.Label>Fecha de Inicio</Form.Label>
                <FormControl
                  type="date"
                  name="fechaInicio"
                  value={nuevoContrato.fechaInicio}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formFechaFin">
                <Form.Label>Fecha de Fin</Form.Label>
                <FormControl
                  type="date"
                  name="fechaFin"
                  value={nuevoContrato.fechaFin}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formDiasLaborales">
                <Form.Label>Días Laborales</Form.Label>
                <FormControl
                  type="number"
                  name="diasLaborales"
                  value={nuevoContrato.diasLaborales}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formDiasDescanso">
                <Form.Label>Días de Descanso</Form.Label>
                <FormControl
                  type="number"
                  name="diasDescanso"
                  value={nuevoContrato.diasDescanso}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setMostrarFormulario(false)}
            >
              Cancelar
            </Button>
            <Button variant="primary" onClick={agregarContrato}>
              Agregar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal para actualizar */}
        <Modal show={mostrarModalActualizar} onHide={cerrarModalActualizar}>
          <Modal.Header closeButton>
            <Modal.Title>Actualizar Contrato</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formFechaInicioActualizar">
                <Form.Label>Fecha de Inicio</Form.Label>
                <FormControl
                  type="date"
                  name="fechaInicio"
                  value={valoresContratoSeleccionado.fechaInicio}
                  onChange={(e) =>
                    setValoresContratoSeleccionado({
                      ...valoresContratoSeleccionado,
                      fechaInicio: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formFechaFinActualizar">
                <Form.Label>Fecha de Fin</Form.Label>
                <FormControl
                  type="date"
                  name="fechaFin"
                  value={valoresContratoSeleccionado.fechaFin}
                  onChange={(e) =>
                    setValoresContratoSeleccionado({
                      ...valoresContratoSeleccionado,
                      fechaFin: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formDiasLaboralesActualizar">
                <Form.Label>Días Laborales</Form.Label>
                <FormControl
                  type="number"
                  name="diasLaborales"
                  value={valoresContratoSeleccionado.diasLaborales}
                  onChange={(e) =>
                    setValoresContratoSeleccionado({
                      ...valoresContratoSeleccionado,
                      diasLaborales: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formDiasDescansoActualizar">
                <Form.Label>Días de Descanso</Form.Label>
                <FormControl
                  type="number"
                  name="diasDescanso"
                  value={valoresContratoSeleccionado.diasDescanso}
                  onChange={(e) =>
                    setValoresContratoSeleccionado({
                      ...valoresContratoSeleccionado,
                      diasDescanso: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cerrarModalActualizar}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={actualizarContrato}>
              Actualizar
            </Button>
          </Modal.Footer>
        </Modal>

        <Table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Fecha de Inicio</th>
              <th>Fecha de Fin</th>
              <th>Días Laborales</th>
              <th>Días de Descanso</th>
              <th>Actualizar</th>
              <th>Eliminar</th>
            </tr>
          </thead>

          <tbody>
            {contratos
              .filter((contrato) =>
                contrato.fechaInicio.toLowerCase().includes(filtroFechaInicio.toLowerCase())
              )
              .filter((contrato) =>
                contrato.fechaFin.toLowerCase().includes(filtroFechaFin.toLowerCase())
              )
              .filter((contrato) =>
                contrato.diasLaborales.toString().includes(filtroDiasLaborales)
              )
              .filter((contrato) =>
                contrato.diasDescanso.toString().includes(filtroDiasDescanso)
              )
              .map((contrato, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{formatFecha(contrato.fechaInicio)}</td>
                  <td>{formatFecha(contrato.fechaFin)}</td>
                  <td>{contrato.diasLaborales}</td>
                  <td>{contrato.diasDescanso}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => abrirModalActualizar(contrato)}
                    >
                      Actualizar
                    </Button>{" "}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => eliminarContrato(contrato._id)}
                    >
                      Eliminar
                    </Button>{" "}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
