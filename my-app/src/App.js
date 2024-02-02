import logo from './logo.svg';
import './App.css';
import UnNombre, { Saluda as SaludaLocal, Despide } from './components/saludos'
import DameNombre from './components/formulario'
import { useState } from 'react';

function Saluda(props) {
  return (
      <div>
          <h1>HOLA {props.nombre || <span>Sin nombre</span>}</h1>
      </div>
  )
}

function App() {
  const [nombre, setNombre] = useState('mundo')
  return (
    <div className="App">
      <h1>El nombre actual es {nombre}</h1>
      <Saluda nombre="Mundo" />
      <SaludaLocal />
      <Despide nombre="Mundo" />
      <UnNombre  nombre={nombre} />
      <DameNombre nombre={nombre} onChange={ dato => { setNombre(dato) }} />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
