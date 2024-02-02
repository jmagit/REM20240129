import React, { Component, useRef, useState } from 'react'
import './calculadora.css'
import { Calculadora as CalculadoraObject } from '../biblioteca/calculadora'

export class CalculadoraConClase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pantalla: '0',
      resumen: null
    }
    this.calc = new CalculadoraObject(() => { }, () => { })
    this.calc.onPantallaChange = value => this.setState({ pantalla: value.replace(/\./g, ',') })
    this.calc.onResumenChange = value => this.setState({ resumen: value.replace(/\./g, ',') })
    this.ponDigito = this.ponDigito.bind(this)
    this.calcula = ev => this.calc.calcula(ev.target.value)
  }
  ponDigito(ev) {
    this.calc.ponDigito(ev.target.value);
  }
  render() {
    return (
      <main>
        <h1>Calculadora</h1>
        <div className="Calculadora">
          <output className="Resumen">{this.state.resumen}</output>
          <output className="Pantalla">{this.state.pantalla}</output>
          <input className="btnOperar" type="button" defaultValue="C" onClick={this.calc.inicia} />
          <input className="btnOperar col-2x2" type="button" defaultValue="↶ BORRAR" onClick={this.calc.borrar} />
          <input className="btnOperar" type="button" defaultValue="+" onClick={this.calcula} />
          <input className="btnDigito" type="button" defaultValue={7} onClick={this.ponDigito} />
          <input className="btnDigito" type="button" defaultValue={8} onClick={this.ponDigito} />
          <input className="btnDigito" type="button" defaultValue={9} onClick={this.ponDigito} />
          <input className="btnOperar" type="button" defaultValue="-" onClick={this.calcula} />
          <input className="btnDigito" type="button" defaultValue={4} onClick={this.ponDigito} />
          <input className="btnDigito" type="button" defaultValue={5} onClick={this.ponDigito} />
          <input className="btnDigito" type="button" defaultValue={6} onClick={this.ponDigito} />
          <input className="btnOperar" type="button" defaultValue="*" onClick={this.calcula} />
          <input className="btnDigito" type="button" defaultValue={1} onClick={this.ponDigito} />
          <input className="btnDigito" type="button" defaultValue={2} onClick={this.ponDigito} />
          <input className="btnDigito" type="button" defaultValue={3} onClick={this.ponDigito} />
          <input className="btnOperar" type="button" defaultValue="/" onClick={this.calcula} />
          <input className="btnDigito" type="button" defaultValue="±" onClick={this.calc.cambiaSigno} />
          <input className="btnDigito" type="button" defaultValue={0} onClick={this.ponDigito} />
          <input className="btnDigito" type="button" defaultValue="," onClick={this.calc.ponComa} />
          <input className="btnOperar" type="button" defaultValue="=" onClick={this.calcula} />
          {/* 
			<input id="btnPI" class="btnDigito" type="button" value="&#928">
			<input class="btnOperar" type="button" value="^">
			*/}
        </div>
      </main>
    )
  }
}

const Pantalla = props => (
  <output className="Pantalla">
    {props.coma ? props.pantalla.replace(/\./g, ',') : props.pantalla}
  </output>
);
const Resumen = ({ coma, resumen }) => (
  <output className="Resumen">
    {coma ? resumen.replace(/\./g, ',') : resumen}
  </output>
);
class BtnCalcular extends Component {
  constructor(props) {
    super(props);
    this.handleClick = () => {
      if (this.props.onClick) this.props.onClick(this.props.texto);
    };
  }
  render() {
    return (
      <button className={this.props.css} onClick={this.handleClick}>
        {this.props.texto}
      </button>
    );
  }
}

export function CalculadoraConFuncion(props) {
  const [pantalla, setPantalla] = useState('0')
  const [resumen, setResumen] = useState(null)
  // let calc = useRef(new CalculadoraObject(value => setPantalla(value.replace(/\./g, ',')), value => setResumen(value.replace(/\./g, ','))));
  let calc = useRef(new CalculadoraObject(() => { }, () => { }));
  calc.current.onPantallaChange = value => setPantalla(value.replace(/\./g, ','))
  calc.current.onResumenChange = value => setResumen(value.replace(/\./g, ','))

  const calcula = ev => calc.current.calcula(ev.target.value)
  const ponDigito = (ev) => {
    calc.current.ponDigito(ev.target.value);
  }

  return (
    <main>
      <h1>Calculadora</h1>
      <div className="Calculadora">
        <output className="Resumen">{resumen}</output>
        <output className="Pantalla">{pantalla}</output>
        <input className="btnOperar" type="button" defaultValue="C" onClick={calc.current.inicia} />
        <input className="btnOperar col-2x2" type="button" defaultValue="↶ BORRAR" onClick={calc.current.borrar} />
        <input className="btnOperar" type="button" defaultValue="+" onClick={calcula} />
        <input className="btnDigito" type="button" defaultValue={7} onClick={ponDigito} />
        <input className="btnDigito" type="button" defaultValue={8} onClick={ponDigito} />
        <input className="btnDigito" type="button" defaultValue={9} onClick={ponDigito} />
        <input className="btnOperar" type="button" defaultValue="-" onClick={calcula} />
        <input className="btnDigito" type="button" defaultValue={4} onClick={ponDigito} />
        <input className="btnDigito" type="button" defaultValue={5} onClick={ponDigito} />
        <input className="btnDigito" type="button" defaultValue={6} onClick={ponDigito} />
        <input className="btnOperar" type="button" defaultValue="*" onClick={calcula} />
        <input className="btnDigito" type="button" defaultValue={1} onClick={ponDigito} />
        <input className="btnDigito" type="button" defaultValue={2} onClick={ponDigito} />
        <input className="btnDigito" type="button" defaultValue={3} onClick={ponDigito} />
        <input className="btnOperar" type="button" defaultValue="/" onClick={calcula} />
        <input className="btnDigito" type="button" defaultValue="±" onClick={calc.current.cambiaSigno} />
        <input className="btnDigito" type="button" defaultValue={0} onClick={ponDigito} />
        <input className="btnDigito" type="button" defaultValue="," onClick={calc.current.ponComa} />
        <input className="btnOperar" type="button" defaultValue="=" onClick={calcula} />
        {/* 
			<input id="btnPI" class="btnDigito" type="button" value="&#928">
			<input class="btnOperar" type="button" value="^">
			*/}
      </div>
    </main>
  )
}

export class CalculadoraCompleta extends Component {
  // static propTypes = {
  //   init: PropTypes.number,
  //   onChange: PropTypes.func,
  //   coma: PropTypes.bool
  // };
  // static defaultProps = {
  //   init: 0,
  //   coma: false
  // };
  constructor(props) {
    super(props);
    this.acumulado = 0;
    this.operador = '+';
    this.limpiar = true;
    this.state = {
      pantalla: props.init.toString(),
      resumen: ''
    };

    this.inicia = this.inicia.bind(this);
    this.ponDigito = this.ponDigito.bind(this);
    this.ponComa = this.ponComa.bind(this);
    this.borrar = this.borrar.bind(this);
    this.cambiaSigno = this.cambiaSigno.bind(this);
    this.calcula = this.calcula.bind(this);
  }

  render() {
    let cabecera = [];
    if (this.state.resumen) {
      cabecera.push(<Resumen key="resumen" resumen={this.state.resumen} coma={this.props.coma} />)
    }
    cabecera.push(<Pantalla key="pantalla" pantalla={this.state.pantalla} coma={this.props.coma} />)
    return (
      <div className="Calculadora">
        {/* <Resumen resumen={this.state.resumen} />
          <Pantalla pantalla={this.state.pantalla} coma={this.props.coma} /> */}
        {cabecera}
        <BtnCalcular css="btnOperar" texto="CE" onClick={this.inicia} />
        <BtnCalcular css="btnOperar col-2x2" texto={'\u21B6 BORRAR'} onClick={this.borrar} />
        <BtnCalcular css="btnOperar" texto='+' onClick={this.calcula} />
        {[7, 8, 9].map(item => (
          <BtnCalcular key={"btn" + item} css="btnDigito" texto={item} onClick={this.ponDigito} />
        ))}
        <BtnCalcular css="btnOperar" texto="-" onClick={this.calcula} />
        {[4, 5, 6].map(item => (
          <BtnCalcular key={"btn" + item} css="btnDigito" texto={item} onClick={this.ponDigito} />
        ))}
        <BtnCalcular css="btnOperar" texto="*" onClick={this.calcula} />
        {[1, 2, 3].map(item => (
          <BtnCalcular key={"btn" + item} css="btnDigito" texto={item} onClick={this.ponDigito} />
        ))}
        <BtnCalcular css="btnOperar" texto="/" onClick={this.calcula} />
        <BtnCalcular css="btnDigito" texto="±" onClick={this.cambiaSigno} />
        <BtnCalcular css="btnDigito" texto='0' onClick={this.ponDigito} />
        <BtnCalcular css="btnDigito" texto={this.props.coma ? ',' : '.'} onClick={this.ponComa} />
        <BtnCalcular css="btnOperar" texto="=" onClick={this.calcula} />
      </div>
    );
  }
  inicia() {
    this.acumulado = 0;
    this.operador = '+';
    this.limpiar = true;
    this.setState({ pantalla: '0', resumen: '' });
  }

  ponDigito(value) {
    if (typeof value !== "string") {
      value = value.toString();
    }
    if (value.length !== 1 || value < '0' || value > '9') {
      console.error("No es un valor numérico.");
      return;
    }
    if (this.limpiar || this.state.pantalla === '0') {
      this.setState({ pantalla: value });
      this.limpiar = false;
    } else {
      this.setState(prev => {
        return { pantalla: prev.pantalla + value };
      });
    }
  }
  ponOperando(value) {
    // eslint-disable-next-line eqeqeq
    if (!Number.isNaN(parseFloat(value)) && parseFloat(value) == value) {
      this.setState({ pantalla: value.toString() });
      this.limpiar = false;
    } else {
      console.error('No es un valor numérico.');
    }
  }

  ponComa() {
    if (this.limpiar) {
      if (!isFinite(this.acumulado) || isNaN(this.acumulado)) {
        return;
      }
      this.setState({ pantalla: '0.' });
      this.limpiar = false;
    } else if (this.state.pantalla.indexOf('.') === -1) {
      this.setState(prev => {
        return { pantalla: prev.pantalla + '.' };
      });
    } else
      console.warn('Ya está la coma');
  }

  borrar() {
    if (this.limpiar || this.state.pantalla.length === 1 || (+this.state.pantalla < 0 && this.state.pantalla.length === 2) ) {
      this.setState({ pantalla: '0' });
      this.limpiar = true;
    } else {
      this.setState(prev => {
        return { pantalla: prev.pantalla.substr(0, prev.pantalla.length - 1) };
      });
    }
  }

  cambiaSigno() {
    this.setState(prev => ({ pantalla: (-prev.pantalla).toString() }));
    if (this.limpiar) {
      this.acumulado = -this.acumulado;
    }
  }

  calcula(value) {
    if ("+-*/=".indexOf(value) === -1) {
      console.error(`Operación no soportada: ${value}`);
      return;
    }
    let pantalla = this.state.pantalla;
    let resumen = this.state.resumen;
    const operando = parseFloat(pantalla);
    switch (this.operador) {
      case '+':
        this.acumulado += operando;
        break;
      case "-":
        this.acumulado -= operando;
        break;
      case "*":
        this.acumulado *= operando;
        break;
      case "/":
        this.acumulado /= operando;
        break;
      case "=":
      default:
        break;
    }
    // Con eval()
    // acumulado = eval (acumulado + this.operador + pantalla);
    // Number: double-precision IEEE 754 floating point.
    // 9.9 + 1.3, 0.1 + 0.2, 1.0 - 0.9
    pantalla = parseFloat(this.acumulado.toPrecision(15)).toString();
    resumen = value === '=' ? '' : (`${pantalla} ${value}`);
    this.operador = value;
    this.limpiar = true;
    if (this.props.onChange) this.props.onChange(this.acumulado);
    this.setState({ pantalla, resumen });
  }
}

export function CalculadoraCompletaConFuncion(props) {
  let [pantalla, setPantalla] = useState((props.init ?? '0').toString())
  let [resumen, setResumen] = useState(null)
  const acumulado = useRef(0);
  const operador = useRef('+');
  const limpiar = useRef(true);

  const inicia = () => {
    acumulado.current = 0;
    operador.current = '+';
    limpiar.current = true;
    setPantalla('0')
    setResumen(null)
  }

  const ponDigito = (value) => {
    if (typeof value !== "string") {
      value = value.toString();
    }
    if (value.length !== 1 || value < '0' || value > '9') {
      console.error("No es un valor numérico.");
      return;
    }
    if (limpiar.current || pantalla === '0') {
      setPantalla(value)
      limpiar.current = false;
    } else {
      setPantalla(p => p + value)
    }
  }
  const ponOperando = (value) => {
    // eslint-disable-next-line eqeqeq
    if (!Number.isNaN(parseFloat(value)) && parseFloat(value) == value) {
      setPantalla(value)
      limpiar.current = false;
    } else {
      console.error('No es un valor numérico.');
    }
  }

  const ponComa = () => {
    if (limpiar.current) {
      if (!isFinite(acumulado.current) || isNaN(acumulado.current)) {
        return;
      }
      setPantalla('0.')
      limpiar.current = false;
    } else if (pantalla.indexOf('.') === -1) {
      setPantalla(p => p + '.')
    } else
      console.warn('Ya está la coma');
  }

  const borrar = () => {
    if (limpiar.current || pantalla.length === 1|| (pantalla.length === 2 && pantalla.startsWith('-'))) {
      setPantalla(p => '0')
      limpiar.current = true;
    } else {
      setPantalla(p => p.substr(0, p.length - 1))
    }
  }

  const cambiaSigno = () => {
    setPantalla(p => (-p).toString())
    if (limpiar.current) {
      acumulado.current = -acumulado.current;
    }
  }

  const calcula = (value) => {
    if ("+-*/=".indexOf(value) === -1) {
      console.error(`Operación no soportada: ${value}`);
      return;
    }
    const operando = parseFloat(pantalla);
    switch (operador.current) {
      case '+':
        acumulado.current += operando;
        break;
      case "-":
        acumulado.current -= operando;
        break;
      case "*":
        acumulado.current *= operando;
        break;
      case "/":
        acumulado.current /= operando;
        break;
      case "=":
      default:
        break;
    }
    // Con eval()
    // acumulado = eval (acumulado + operador.current + pantalla);
    // Number: double-precision IEEE 754 floating point.
    // 9.9 + 1.3, 0.1 + 0.2, 1.0 - 0.9
    pantalla = parseFloat(acumulado.current.toPrecision(15)).toString();
    // pantalla = acumulado.current.toString();
    resumen = value === '=' ? '' : (`${pantalla} ${value}`);
    operador.current = value;
    limpiar.current = true;
    if (props.onChange) props.onChange(acumulado.current);
    setPantalla(pantalla)
    setResumen(resumen)
  }

  let cabecera = [];
  if (resumen) {
    cabecera.push(<Resumen key="resumen" resumen={resumen} coma={props.coma} />)
  }
  cabecera.push(<Pantalla key="pantalla" pantalla={pantalla} coma={props.coma} />)
  return (
    <div className="Calculadora">
      {/* <Resumen resumen={resumen} />
            <Pantalla pantalla={pantalla} coma={props.coma} /> */}
      {cabecera}
      <BtnCalcular css="btnOperar" texto="CE" onClick={inicia} />
      <BtnCalcular css="btnOperar col-2x2" texto={'\u21B6 BORRAR'} onClick={borrar} />
      <BtnCalcular css="btnOperar" texto='+' onClick={calcula} />
      {[7, 8, 9].map(item => (
        <BtnCalcular key={"btn" + item} css="btnDigito" texto={item} onClick={ponDigito} />
      ))}
      <BtnCalcular css="btnOperar" texto="-" onClick={calcula} />
      {[4, 5, 6].map(item => (
        <BtnCalcular key={"btn" + item} css="btnDigito" texto={item} onClick={ponDigito} />
      ))}
      <BtnCalcular css="btnOperar" texto="*" onClick={calcula} />
      {[1, 2, 3].map(item => (
        <BtnCalcular key={"btn" + item} css="btnDigito" texto={item} onClick={ponDigito} />
      ))}
      <BtnCalcular css="btnOperar" texto="/" onClick={calcula} />
      <BtnCalcular css="btnDigito" texto="±" onClick={cambiaSigno} />
      <BtnCalcular css="btnDigito" texto='0' onClick={ponDigito} />
      <BtnCalcular css="btnDigito" texto={props.coma ? ',' : '.'} onClick={ponComa} />
      <BtnCalcular css="btnOperar" texto="=" onClick={calcula} />
    </div>
  );
}