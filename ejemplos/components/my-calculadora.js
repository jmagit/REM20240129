// 'use strict';
function Calculadora(fnPantalla, fnResumen, fnChangeValue) {
	if (fnPantalla && typeof (fnPantalla) !== 'function')
		throw new Error('Falta la función para pintar en la pantalla')
	if (fnResumen && typeof (fnResumen) !== 'function')
		throw new Error('Falta la función para pintar el resumen')
	let ref = this;
	let acumulado = 0;
	let operador = '+';
	let limpiar = true;
	let miPantalla = '0'
	let miResumen = '';

	ref.pantalla = '0';
	ref.resumen = '';

	ref.onPantallaChange = fnPantalla;
	ref.onResumenChange = fnResumen;

	function pintaPantalla() {
		ref.pantalla = miPantalla;
		if (typeof (ref.onPantallaChange) !== 'function')
			throw new Error('Falta la función para pintar en la pantalla');
		ref.onPantallaChange(miPantalla);
	}
	function pintaResumen() {
		ref.resumen = miResumen;
		if (typeof (ref.onResumenChange) !== 'function')
			throw new Error('Falta la función para pintar el resumen');
		ref.onResumenChange(miResumen);
	}

	ref.inicia = function () {
		acumulado = 0;
		operador = '+';
		miPantalla = '0';
		miResumen = '';
		limpiar = true;
		pintaPantalla();
		pintaResumen();
	};
	ref.inicia();

	ref.ponDigito = function (value) {
		if (typeof (value) !== 'string')
			value = value.toString();
		if (value.length != 1 || value < '0' || value > '9') {
			console.error('No es un valor numérico.');
			return;
		}
		if (limpiar || miPantalla == '0') {
			miPantalla = value;
			limpiar = false;
		} else
			miPantalla += value;
		pintaPantalla();
	};
	ref.ponOperando = function (value) {
		if (!Number.isNaN(parseFloat(value)) && parseFloat(value) == value) {
			miPantalla = value.toString();
			limpiar = false;
			pintaPantalla();
		} else {
			console.error('No es un valor numérico.');
		}
	};
	ref.ponComa = function () {
		if (limpiar) {
			miPantalla = '0.';
			limpiar = false;
		} else if (miPantalla.indexOf('.') === -1) {
			miPantalla += '.';
		} else
			console.warn('Ya está la coma');
		pintaPantalla();
	};
	ref.borrar = function () {
		if (limpiar || miPantalla.length == 1 || (miPantalla.length == 2 && miPantalla.startsWith('-'))) {
			miPantalla = '0';
			limpiar = true;
		} else
			miPantalla = miPantalla.slice(0, -1);
		pintaPantalla();
	};
	ref.cambiaSigno = function () {
		miPantalla = (-miPantalla).toString();
		if (limpiar) {
			acumulado = -acumulado;
		}
		pintaPantalla();
	};
	ref.calcula = function (value) {
		if ('+-*/='.indexOf(value) == -1) return;

		let operando = parseFloat(miPantalla);
		switch (operador) {
			case '+':
				acumulado += operando;
				break;
			case '-':
				acumulado -= operando;
				break;
			case '*':
				acumulado *= operando;
				break;
			case '/':
				acumulado /= operando;
				break;
		}
		// Con eval() --> acumulado = eval (acumulado + operador + miPantalla);
		// Number: double-precision IEEE 754 floating point.
		// 9.9 + 1.3, 0.1 + 0.2, 1.0 - 0.9
		miPantalla = parseFloat(acumulado.toPrecision(15)).toString();
		// Error forzado
		// miPantalla = acumulado.toString();
		miResumen = value == '=' ? '' : (`${miPantalla} ${value}`);
		pintaPantalla();
		pintaResumen();
		if (fnChangeValue) fnChangeValue(acumulado)
		operador = value;
		limpiar = true;
	};
}

let template = document.createElement('template');
template.innerHTML = /* html */`
		<link rel="stylesheet" href="./components/my-calculadora.css">

		<output class="Resumen" id="txtResumen"></output>
		<output class="Pantalla" id="txtPantalla"></output>
		<input id="btnIniciar" class="btnOperar" type="button" value="C">
		<input id="btnBorrar" class="btnOperar col-2x2" type="button" value="&curvearrowleft; BORRAR">
		<input class="btnOperar btnCalc" type="button" value="+">
		<input class="btnDigito btnNum" type="button" value="7">
		<input class="btnDigito btnNum" type="button" value="8">
		<input class="btnDigito btnNum" type="button" value="9">
		<input class="btnOperar btnCalc" type="button" value="-">
		<input class="btnDigito btnNum" type="button" value="4">
		<input class="btnDigito btnNum" type="button" value="5">
		<input class="btnDigito btnNum" type="button" value="6">
		<input class="btnOperar btnCalc" type="button" value="*">
		<input class="btnDigito btnNum" type="button" value="1" data-valor="1">
		<input class="btnDigito btnNum" type="button" value="2">
		<input class="btnDigito btnNum" type="button" value="3">
		<input class="btnOperar btnCalc" type="button" value="/">
		<input class="btnDigito" type="button" value="±">
		<input class="btnDigito btnNum" type="button" value="0" data-valor="0">
		<input class="btnDigito" type="button" value=".">
		<input class="btnOperar btnCalc" type="button" value="=">
		<!-- 
		<input id="btnPI" class="btnDigito" type="button" value="&#928">
		<input class="btnOperar btnCalc" type="button" value="^">
		-->
    `;

export class MyCalculadora extends HTMLElement {
	static observedAttributes = ['value'];
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.content = template.content.cloneNode(true);

		let txtPantalla = this.content.querySelector('#txtPantalla');
		let txtResumen = this.content.querySelector('#txtResumen');
		let pintaPantalla = value => txtPantalla.textContent = value
		let pintaResumen = value => txtResumen.textContent = value
		let separadorDecimal = '.'
		if (this.hasAttribute('coma')) {
			pintaPantalla = value => txtPantalla.textContent = value.replace(/\./g, ',')
			pintaResumen = value => txtResumen.textContent = value.replace(/\./g, ',')
			separadorDecimal = ','
			this.content.querySelector('[value="."]').value = ','
		}
		let calc = new Calculadora(pintaPantalla, pintaResumen, value => {
			this.value = value
			this.dispatchEvent(new CustomEvent('change', { detail: value }))
		});
		calc.inicia();
		this.content.querySelectorAll('.btnNum').forEach(tag => {
			tag.addEventListener('click', ev => {
				calc.ponDigito(ev.target.value);
			})
		})
		this.content.querySelectorAll('.btnCalc').forEach(tag => {
			tag.addEventListener('click', ev => {
				calc.calcula(ev.target.value);
			})
		})
		this.content.querySelector(`[value="${separadorDecimal}"]`).addEventListener('click', calc.ponComa)
		this.content.querySelector('[value="±"]').addEventListener('click', calc.cambiaSigno);
		this.content.querySelector('#btnIniciar').addEventListener('click', calc.inicia);
		this.content.querySelector('#btnBorrar').addEventListener('click', calc.borrar);
		// this.content.querySelector('#btnPI').addEventListener('click', () => calc.ponOperando(Math.PI.toString()));
		this.shadowRoot.appendChild(this.content);

		this.setAttribute('tabindex', '0')
		this.addEventListener('keydown', ev => {
			if (location.href.endsWith('debug'))
				console.log('Tecla: ' + ev.key + ' -> ' + ev.keyCode)
			// Teclas no imprimibles: Delete -> 46, Backspace -> 8
			if (ev.key === "Delete" || ev.key === "Backspace")
				this.shadowRoot.querySelector('#btnBorrar').click()
			// if('0123456789+-*/=Cc,'.includes(ev.key))
			// 	this.shadowRoot.querySelector(`[value="${ev.key.toUpperCase()}"]`).click()
			const btn = this.shadowRoot.querySelector(`[value="${ev.key.toUpperCase()}"]`);
			if (btn) btn.click()
		})
		this.focus()
		this._calc = calc
		if (this.hasAttribute('value'))
			// eslint-disable-next-line no-self-assign
			this.value = this.value
    }
	get value() { return this.getAttribute('value'); }
	set value(value) {
		if(value !== this.value)
			this.setAttribute('value', value);
		this._calc.ponOperando(value)
	}
    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return;
        this[property] = newValue;
    }
	reset() {
		this._calc.init()
	}
}
customElements.define('my-calculadora', MyCalculadora);