import logo from './logo.svg';
import miLogo from './media/logo.png';
import './App.css';
import { DemosJSX } from './demosJSX';
import { Demos, Reloj } from './demos';
import { CalculadoraConFuncion as Calculadora } from './ejercicios/calculadora';
import { ErrorBoundary } from './biblioteca/comunes';
import Muro from './ejercicios/muro';
import { useState } from 'react';
import Contactos from './formulario';

function App() {
  const opcionesDelMenu = [
    { texto: 'Inicio', url: '/', componente: <AppOld /> },
    { texto: 'JSX', url: '/jsx', componente: <DemosJSX /> },
    { texto: 'Demos', url: '/demos', componente: <Demos /> },
    { texto: 'Calculadora', url: '/calc', componente: <Calculadora coma />, },
    { texto: 'Muro', url: '/muro', componente: <Muro /> },
    { texto: 'Contactos', url: '/contactos', componente: <Contactos /> },
  ]
  const [seleccionado, setSeleccionado] = useState(0)

  return (
    <>
      <Head opciones={opcionesDelMenu} seleccionado={seleccionado} onMenuChange={op => setSeleccionado(op)} />
      <main className='container-fluid'>
        <ErrorBoundary>
          {opcionesDelMenu[seleccionado].componente}
        </ErrorBoundary>
        {/* <Calculadora /> */}
        {/* <Calculadora init={666} coma /> */}
        {/* <AppOld /> */}
        {/* <DemosJSX /> */}
        {/* <ErrorBoundary><Demos /></ErrorBoundary> */}
        {/* <Muro /> */}
      </main>
      <Foot />
    </>
  );
}
function Head(props) {
  const haceClick = (indice, ev) => {
    ev.preventDefault()
    if (props.onMenuChange)
      props.onMenuChange(indice)
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: '#e3f2fd' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="inicio"  onClick={ev => haceClick(0, ev)}>
          <img src={miLogo} alt='Logotipo corporativo' height={40} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Menu opciones={props.opciones} seleccionado={props.seleccionado} onMenuChange={props.onMenuChange} />
        </div>
      </div>
    </nav>);
}
function Menu(props) {
  const haceClick = (indice, ev) => {
    ev.preventDefault()
    if (props.onMenuChange)
      props.onMenuChange(indice)
  }
  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      {props.opciones.map((item, index) => (
        <li key={index} className="nav-item">
          <a className={"nav-link" + (props.seleccionado === index ? " active" : "")} href={item.url} onClick={ev => haceClick(index, ev)}>
            {item.texto}
          </a>
        </li>
      ))}
    </ul>
  );
}

function Foot() {
  // let err = true
  //   if(err)
  //     throw new Error('Ha tocado el boton')
  return (
    <footer style={{ backgroundColor: '#e3f2fd' }}>
      <Reloj /> &copy; Todos los derechos reservados
    </footer>
  );
}

function AppOld() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hola mundo</h1>
        <h2>Secreto: {process.env.REACT_APP_SECRET} {process.env.REACT_APP_API_URL}</h2>
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
      </header>
    </div>
  );
}

export default App;
