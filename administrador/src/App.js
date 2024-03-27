import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ValidarSolis from "./Components/ValidarSolisComponent/ValidarSolis";
import AgregarUsuario from './Components/AgregarUsuarioComponent/AgregarUsuario';
import TurnoCrud from './Components/TurnoCrudComponent/TurnoCrud';
import AgregarSede from './Components/agregarsede/agregarsede';
import AgregarArea from './Components/agregararea/agregararea';
import AgregarContrato from './Components/contratos/agregarContrato';
import AgregarHorario from './Components/agregarHorario/agregarHorario'; // Importa AgregarHorario aquí

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<ValidarSolis />} />
          <Route path='/agregarUsuario' element={<AgregarUsuario />} />
          <Route path='/turnoCrud' element={<TurnoCrud />} />
          <Route path='/agregarSede' element={<AgregarSede />} />
          <Route path='/agregarArea' element={<AgregarArea />} />
          <Route path='/ValidarSolis' element={<ValidarSolis />} />
          <Route path='/agregarContrato' element={<AgregarContrato />} />
          <Route path='/agregarHorario' element={<AgregarHorario />} /> {/* Utiliza AgregarHorario aquí */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
