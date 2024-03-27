import React from "react";
import "./css/permisos.css";
import Navigation from "../NavigationConponent/Navigation";
import Form from "react-bootstrap/Form";

export default function Permisos() {
  return (
    <div>
      <Navigation />
      <div className="containerPermisos1">
        <div className="containerPermisosForm">
          <label>Nombre completo</label>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Ingresa tu nombre"
            />
          </div>
          <label>Área de trabajo</label>
          <Form.Select aria-label="Default select example">
            <option>Selecciona tu área</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
          <br />
          <label>Fecha de inicio de vacaciones</label>
          <Form.Control type="date" />
          <br />
          <label>Fecha de finalización de vacaciones</label>
          <Form.Control type="date" />
          <br />
          <label>Justificación</label>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
          <button type="button" className="btn btn-success">Enviar</button>
        </div>
      </div>
    </div>
  );
}
