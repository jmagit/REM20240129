class MyCounter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.init = this.hasAttribute('init') ? +this.getAttribute('init') : 0;
        this.delta = 1;
        this.count = this.init
        // this.baja = this.baja.bind(this)
        // this.sube = this.sube.bind(this)
        // this.cambia = this.cambia.bind(this)
    }
    // component attributes
    static get observedAttributes() {
        return ['init', 'delta'];
    }
    get disabled() { return this.hasAttribute('disabled'); }
    set disabled(value) {
        value ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
        this.btnBaja.disabled = this.disabled
        this.btnSube.disabled = this.disabled
    }
    // attribute change
    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return;
        this[property] = newValue;
    }
    // connect component
    connectedCallback() {
        const container = document.createElement('div');
        container.classList.add('container');

        this.pantalla = document.createElement('output');
        this.pantalla.setAttribute('id', 'pantalla')
        this.pantalla.setAttribute('part', 'pantalla')
        this.pantalla.classList.add('pantalla');
        this.pantalla.textContent = this.count;
        container.appendChild(this.pantalla);

        this.btnBaja = document.createElement('button');
        this.btnBaja.setAttribute('type', 'button')
        this.btnBaja.classList.add('btn');
        this.btnBaja.addEventListener('click', this.baja.bind(this))
        this.btnBaja.textContent = '-';
        this.btnBaja.disabled = this.disabled
        container.appendChild(this.btnBaja);

        this.btnSube = document.createElement('button');
        this.btnSube.setAttribute('type', 'button')
        this.btnSube.classList.add('btn');
        this.btnSube.addEventListener('click', this.sube.bind(this))
        this.btnSube.textContent = '+';
        this.btnSube.disabled = this.disabled
        container.appendChild(this.btnSube);

        this.shadowRoot.appendChild(container);
    }

    cambia(delta) {
        if(this.disabled) return
        this.count = this.count + delta
        this.pantalla.textContent = this.count;
        // this.dispatchEvent(new Event('keydown', { cancelable: true, composed: true }))
        // this.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, }))
        this.dispatchEvent(new CustomEvent('change', { detail: this.count, bubbles: true, composed: true  }))
    }

    baja(ev) {
        this.cambia(-this.delta, ev);
        ev.preventDefault();
    }

    sube(ev) {
        ev.stopPropagation();
        this.cambia(+this.delta, ev);
    }
}

// register component
customElements.define('my-counter', MyCounter);