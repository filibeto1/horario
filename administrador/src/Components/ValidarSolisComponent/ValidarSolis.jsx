import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/vali.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCircleUser, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Navigation from '../NavigationComponent/Navigation';

const ValidarSolis = () => {
  const [turnos, setTurnos] = useState([]);
  const [searchInputEmpleado, setSearchInputEmpleado] = useState('');
  const [searchInputTurno, setSearchInputTurno] = useState('');
  const [filteredTurnos, setFilteredTurnos] = useState([]);

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await fetch('http://localhost:3002/turnos');
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de turnos');
        }
        const data = await response.json();
        setTurnos(data);
        setFilteredTurnos(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTurnos();
  }, []);

  useEffect(() => {
    const filterTurnos = () => {
      let filtered = turnos.filter((turno) => {
        return (
          turno.Nombre.toLowerCase().includes(searchInputEmpleado.toLowerCase()) &&
          turno.HoraInicio.toLowerCase().includes(searchInputTurno.toLowerCase())
        );
      });
      setFilteredTurnos(filtered);
    };

    filterTurnos();
  }, [turnos, searchInputEmpleado, searchInputTurno]);

  const handleValidar = (turnoId) => {
    // Aquí puedes escribir la lógica para validar el turno con el ID 'turnoId'
    console.log(`Validando turno con ID ${turnoId}`);
    alert('Turno validado correctamente');
    // Por ejemplo, podrías realizar una solicitud al servidor para validar el turno
  };

  const handleRechazar = (turnoId) => {
    // Aquí puedes escribir la lógica para rechazar el turno con el ID 'turnoId'
    console.log(`Rechazando turno con ID ${turnoId}`);
    const updatedTurnos = filteredTurnos.filter(turno => turno._id !== turnoId); // Cambio aquí
    setFilteredTurnos(updatedTurnos);
    alert('Turno rechazado correctamente');
    // Por ejemplo, podrías realizar una solicitud al servidor para rechazar el turno
  };

  return (
    <div>
      <Navigation />
      {/* Contenido Principal */}
      <Container className="col-12">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>Validar Solicitudes</h1>
            </div>
            <br></br>
            <div className="col-5">
              <form className="d-flex">
                <input
                  className="form-control me-2 "
                  type="search"
                  placeholder="Buscar por empleado..."
                  aria-label="Search"
                  value={searchInputEmpleado}
                  onChange={(e) => setSearchInputEmpleado(e.target.value)}
                />
                <input
                  className="form-control me-2 "
                  type="search"
                  placeholder="Buscar por turno..."
                  aria-label="Search"
                  value={searchInputTurno}
                  onChange={(e) => setSearchInputTurno(e.target.value)}
                />
                <button className="btn btn-outline-link" type="submit">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </form>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="col">
              <button type="button" className="btn btn-light">
                Actualizar
              </button>
            </div>
            <div className="col-1">
              <button type="button" className="btn btn-success btn-sm">
                Aceptar todo
              </button>
            </div>
            <div className="col-1">
              <button type="button" className="btn btn-danger btn-sm">
                Denegar todo
              </button>
            </div>
          </div>
        </div>
        <br></br>
        <div className="col-12">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <table className="table rounded">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Nombre Turno</th>
                      <th>Hora Inicial</th>
                      <th>Hora Final</th>
                      <th>Notas</th>
                      <th className="col-1">Acciones</th> {/* Nueva columna para acciones */}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTurnos.map((turno, index) => (
                      <tr key={index}>
                        <td>
                          <FontAwesomeIcon
                            icon={faCircleUser}
                            style={{ color: '#000000', fontSize: '1.5rem' }}
                          />
                        </td>
                        <td>{turno.Nombre}</td>
                        <td>{turno.HoraInicio}</td>
                        <td>{turno.HoraFinal}</td>
                        <td>{turno.role}</td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            className="btn btn-success mr-2"
                            onClick={() => handleValidar(turno._id)} // Cambio aquí
                          >
                            <FontAwesomeIcon icon={faCheck} />
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleRechazar(turno._id)} // Cambio aquí
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ValidarSolis;
