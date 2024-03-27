import './App.css';
import Turnos from "./Components/TurnosComponent/Turnos";
import Permisos from "./Components/SolicitudPermisosComponent/Permisos"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Turnos/>}/>
          <Route path="/Permisos" element={<Permisos/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
