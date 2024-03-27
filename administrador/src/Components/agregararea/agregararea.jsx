import React, { useState, useEffect } from "react";
import { Button, FormControl, Table, Form, Modal } from "react-bootstrap";
import Navigation from "../NavigationComponent/Navigation";

export default function AreasTrabajo() {
  const [areas, setAreas] = useState([]);
  const [sedes, setSedes] = useState([]);
  const [nuevaArea, setNuevaArea] = useState({
    nombre: "",
    sede: "",
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [areaSeleccionada, setAreaSeleccionada] = useState(null);
  const [valoresAreaSeleccionada, setValoresAreaSeleccionada] = useState({
    nombre: "",
    sede: "",
  });
  const [mostrarModalActualizar, setMostrarModalActualizar] = useState(false);
  const [filtroArea, setFiltroArea] = useState("");
  const [filtroSede, setFiltroSede] = useState("");

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch("http://localhost:3002/areas");
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de áreas");
        }
        const data = await response.json();
        setAreas(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSedes = async () => {
      try {
        const response = await fetch("http://localhost:3002/sedes");
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de sedes");
        }
        const data = await response.json();
        setSedes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAreas();
    fetchSedes();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevaArea((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const agregarArea = async () => {
    try {
      const response = await fetch("http://localhost:3002/areas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaArea),
      });

      if (!response.ok) {
        throw new Error("No se pudo agregar el área");
      }

      const data = await response.json();
      setAreas([...areas, data]);
      setNuevaArea({ nombre: "", sede: "" });
      setMostrarFormulario(false);
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarArea = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/areas/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("No se pudo eliminar el área");
      }
      const nuevasAreas = areas.filter((area) => area._id !== id);
      setAreas(nuevasAreas);
    } catch (error) {
      console.error(error);
    }
  };

  const abrirModalActualizar = (area) => {
    setAreaSeleccionada(area);
    setValoresAreaSeleccionada({ ...area });
    setMostrarModalActualizar(true);
  };

  const cerrarModalActualizar = () => {
    setAreaSeleccionada(null);
    setMostrarModalActualizar(false);
  };

  const actualizarArea = async () => {
    try {
      const response = await fetch(
        `http://localhost:3002/areas/${areaSeleccionada._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(valoresAreaSeleccionada),
        }
      );
      if (!response.ok) {
        throw new Error("No se pudo actualizar el área");
      }
      const data = await response.json();
      const index = areas.findIndex((a) => a._id === areaSeleccionada._id);
      const nuevasAreas = [...areas];
      nuevasAreas[index] = data;
      setAreas(nuevasAreas);
      cerrarModalActualizar();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navigation />
      <h2 className="titulo">Gestión de Áreas de Trabajo</h2>
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
            placeholder="Filtrar por área..."
            className="filtro"
            value={filtroArea}
            onChange={(e) => setFiltroArea(e.target.value)}
          />
          <FormControl
            type="text"
            placeholder="Filtrar por sede..."
            className="filtro"
            value={filtroSede}
            onChange={(e) => setFiltroSede(e.target.value)}
          />
        </div>
        <Modal
          show={mostrarFormulario}
          onHide={() => setMostrarFormulario(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Agregar Área de Trabajo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <FormControl
                  type="text"
                  name="nombre"
                  value={nuevaArea.nombre}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formSede">
                <Form.Label>Sede</Form.Label>
                <Form.Control
                  as="select"
                  name="sede"
                  value={nuevaArea.sede}
                  onChange={handleInputChange}
                >
                  <option value="">Selecciona una sede</option>
                  {sedes.map((sede) => (
                    <option key={sede._id} value={sede.nombre}>
                      {sede.nombre}
                    </option>
                  ))}
                </Form.Control>
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
            <Button variant="primary" onClick={agregarArea}>
              Agregar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal para actualizar */}
        <Modal show={mostrarModalActualizar} onHide={cerrarModalActualizar}>
          <Modal.Header closeButton>
            <Modal.Title>Actualizar Área de Trabajo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formNombreActualizar">
                <Form.Label>Nombre</Form.Label>
                <FormControl
                  type="text"
                  name="nombre"
                  value={valoresAreaSeleccionada.nombre}
                  onChange={(e) =>
                    setValoresAreaSeleccionada({
                      ...valoresAreaSeleccionada,
                      nombre: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formSedeActualizar">
                <Form.Label>Sede</Form.Label>
                <Form.Control
                  as="select"
                  name="sede"
                  value={valoresAreaSeleccionada.sede}
                  onChange={(e) =>
                    setValoresAreaSeleccionada({
                      ...valoresAreaSeleccionada,
                      sede: e.target.value,
                    })
                  }
                >
                  <option value="">Selecciona una sede</option>
                  {sedes.map((sede) => (
                    <option key={sede._id} value={sede.nombre}>
                      {sede.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cerrarModalActualizar}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={actualizarArea}>
              Actualizar
            </Button>
          </Modal.Footer>
        </Modal>

        <Table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nombre</th>
              <th>Sede</th>
              <th>Actualizar</th>
              <th>Eliminar</th>
            </tr>
          </thead>

          <tbody>
            {areas
              .filter((area) =>
                area.nombre.toLowerCase().includes(filtroArea.toLowerCase())
              )
              .filter((area) =>
                area.sede.toLowerCase().includes(filtroSede.toLowerCase())
              )
              .map((area, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{area.nombre}</td>
                  <td>{area.sede}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => abrirModalActualizar(area)}
                    >
                      Actualizar
                    </Button>{" "}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => eliminarArea(area._id)}
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
