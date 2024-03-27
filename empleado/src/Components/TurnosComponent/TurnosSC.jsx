import React,{useState} from "react";
import './css/turnos.css'
import Card from "react-bootstrap/Card";

export default function TurnosSC() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="turnosSC">
      <Card className="CardTarjeta">
        <Card.Body className="cardcolor">
          <Card.Title>Contrato 1</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Cupos: 0/5</Card.Subtitle>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="option"
              id="option1"
              value="option1"
              checked={selectedOption === "option1"}
              onChange={handleOptionChange}
            />
            <label className="form-check-label" htmlFor="option1">
              Seleccionar
            </label>
          </div>
        </Card.Body>
      </Card>

      <Card className="CardTarjeta">
        <Card.Body className="cardcolor">
          <Card.Title>Contrato 2</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Cupos: 0/5</Card.Subtitle>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="option"
              id="option2"
              value="option2"
              checked={selectedOption === "option2"}
              onChange={handleOptionChange}
            />
            <label className="form-check-label" htmlFor="option2">
              Seleccionar
            </label>
          </div>
        </Card.Body>
      </Card>

      <Card className="CardTarjeta">
        <Card.Body className="cardcolor">
          <Card.Title>Contrato 3</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Cupos: 0/5</Card.Subtitle>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="option"
              id="option3"
              value="option3"
              checked={selectedOption === "option3"}
              onChange={handleOptionChange}
            />
            <label className="form-check-label" htmlFor="option3">
              Seleccionar
            </label>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
