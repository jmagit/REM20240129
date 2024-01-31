export class MyElement extends HTMLElement {

    constructor() {
        super();
        this._nombre = this.hasAttribute('nombre') ? this.getAttribute('nombre') : '(anónimo)'
        this._despide = this.hasAttribute('despide')
    }
    connectedCallback() {
        this.render()
    }

    render() {
        // es llamado cuando el elemento es agregado al documento (puede ser llamado varias veces si un elemento es agregado y quitado repetidamente)
        if (this._despide) {
            // this.textContent = `Adios ${this._nombre}`
            this.innerHTML = /*html*/`<div>Adios <span>${this._nombre}</span></div>`
        } else {
            // this.textContent = `Hola ${this._nombre}`
            this.innerHTML = /*html*/`<div>Hola <span>${this._nombre}</span></div>`
        }
    }

    disconnectedCallback() {
        // es llamado cuando el elemento es quitado del documento (puede ser llamado varias veces si un elemento es agregado y quitado repetidamente)
    }
    adoptedCallback() {
        // es llamado cuando el elemento es movido a un nuevo documento (ocurre en document.adoptNode, muy raramente usado)
    }
    // static observedAttributes = ['nombre', 'despide'];
    static get observedAttributes() {
        // array de nombres de atributos a los que queremos monitorear por cambios
        return ['nombre', 'despide'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if( oldValue === newValue) return
        this[`_${name}`] = newValue
        this.render()
    }
    get nombre() { return this.getAttribute('nombre') }
    set nombre(value) { this.setAttribute('nombre', value) }
    // puede haber otros métodos y propiedades de elemento
    cotilla() {
        console.log(`Soy un ${this.localName}`)
    }
}
customElements.define('my-element', MyElement);
