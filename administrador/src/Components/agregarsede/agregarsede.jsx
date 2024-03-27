import React, { useState, useEffect } from "react";
import { Button, FormControl, Table, Form, Modal } from "react-bootstrap";
import Navigation from "../NavigationComponent/Navigation";
import "../agregarsede/css/sede.css";

export default function GestionarSedes() {
  const [sedes, setSedes] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroUbicacion, setFiltroUbicacion] = useState("");
  const [nuevaSede, setNuevaSede] = useState({
    nombre: "",
    ubicacion: ""
  });
  const [sedeEditando, setSedeEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
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

    fetchSedes();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevaSede((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFiltroNombreChange = (event) => {
    setFiltroNombre(event.target.value);
  };

  const handleFiltroUbicacionChange = (event) => {
    setFiltroUbicacion(event.target.value);
  };

  const agregarSede = async () => {
    try {
      const response = await fetch("http://localhost:3002/sedes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaSede),
      });

      if (!response.ok) {
        throw new Error("No se pudo agregar la sede");
      }

      const data = await response.json();
      setSedes([...sedes, data]);
      setNuevaSede({ nombre: "", ubicacion: "" });
      setMostrarFormulario(false);
    } catch (error) {
      console.error(error);
    }
  };

  const editarSede = async () => {
    try {
      const response = await fetch(`http://localhost:3002/sedes/${sedeEditando._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaSede), // Cambiar a nuevaSede
      });
  
      if (!response.ok) {
        throw new Error("No se pudo editar la sede");
      }
  
      const data = await response.json();
      const index = sedes.findIndex(sede => sede._id === sedeEditando._id);
      const nuevasSedes = [...sedes];
      nuevasSedes[index] = data;
      setSedes(nuevasSedes);
      setSedeEditando(null);
      setMostrarFormulario(false);
    } catch (error) {
      console.error(error);
    }
  };
  

  const eliminarSede = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/sedes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("No se pudo eliminar la sede");
      }
      const nuevasSedes = sedes.filter(
        (sede) => sede._id !== id
      );
      setSedes(nuevasSedes);
    } catch (error) {
      console.error(error);
    }
  };

  const mostrarEditarSede = (sede) => {
    setSedeEditando(sede);
    setNuevaSede({
      nombre: sede.nombre,
      ubicacion: sede.ubicacion
    });
    setMostrarFormulario(true);
  };

  return (
    <div>
      <Navigation />
      <div className="AGEMcontenedor1">
        <h2 className="AGEMTitulo">Gestionar Sedes</h2>
        <div className="AGEMBotonContainer">
          <Button
            variant="success"
            className="AGEMBotonAgregar"
            onClick={() => {
              setSedeEditando(null);
              setMostrarFormulario(true);
            }}
          >
            Agregar Sede
          </Button>{" "}
          <FormControl
            type="text"
            placeholder="Buscar por nombre..."
            className="AGEMBuscador"
            value={filtroNombre}
            onChange={handleFiltroNombreChange}
          />
          <FormControl
            type="text"
            placeholder="Buscar por ubicación..."
            className="AGEMBuscador"
            value={filtroUbicacion}
            onChange={handleFiltroUbicacionChange}
          />
        </div>
        <Modal
          show={mostrarFormulario}
          onHide={() => {
            setSedeEditando(null);
            setMostrarFormulario(false);
            setNuevaSede({ nombre: "", ubicacion: "" });
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>{sedeEditando ? 'Acualizar Sede' : 'Agregar Sede'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre de la Sede</Form.Label>
                <FormControl
                  type="text"
                  name="nombre"
                  value={nuevaSede.nombre}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formUbicacion">
                <Form.Label>Ubicación</Form.Label>
                <FormControl
                  type="text"
                  name="ubicacion"
                  value={nuevaSede.ubicacion}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setSedeEditando(null);
                setMostrarFormulario(false);
                setNuevaSede({ nombre: "", ubicacion: "" });
              }}
            >
              Cancelar
            </Button>
            <Button variant="info" onClick={sedeEditando ? editarSede : agregarSede}>
              {sedeEditando ? 'Actualizar' : 'Agregar'}
            </Button>
          </Modal.Footer>
        </Modal>

        <Table className="AGEMTable">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nombre</th>
              <th>Ubicación</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {sedes
              .filter((sede) =>
                sede.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) &&
                sede.ubicacion.toLowerCase().includes(filtroUbicacion.toLowerCase())
              )
              .map((sede, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{sede.nombre}</td>
                  <td>{sede.ubicacion}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => mostrarEditarSede(sede)}
                      className="AGEMBotonEditar"
                    >
                      Actualizar
                    </Button>{" "}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => eliminarSede(sede._id)}
                      className="AGEMBotonEliminar"
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
