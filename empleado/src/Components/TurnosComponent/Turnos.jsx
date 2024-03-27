import React from "react";
import './css/turnos.css'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navigation from "../NavigationConponent/Navigation";
import TurnosSC from "../TurnosComponent/TurnosSC";
import Horario from "../TurnosComponent/HorarioTurnos"

export default function Turnos() {
  return (
    <div>
      <Navigation />
      <div className="container1">
        <div className="TSeleccionaArea">
          <h2>Ingresa tu nombre</h2>
          <Form.Group controlId="formNombre">
            <Form.Control type="text" placeholder="Ingrese su nombre"/>
          </Form.Group>
        </div>

        <div className="TSeleccionaHorario">
          <h2>Selecciona tu contrato</h2>
          <TurnosSC />
        </div>
      </div>
      <div className="container2">
        <div className="TContrato">
          <h2>Horario</h2>
          <hr className="LineaHorizontal" />
          <Horario />
          <hr className="LineaHorizontalabajo" />
        </div>
        <div className="TContrato">
          <h2>Contrato</h2>
          <hr className="LineaHorizontal" />
          <iframe
            src="/Pro_Git_LIBRO.pdf"
            title="Contrato"
            width="100%"
            height="300px"
          />
          <hr className="LineaHorizontalabajo" />
          <Button variant="success">Confirmar</Button>
        </div>
      </div>
    </div>
  );
}
