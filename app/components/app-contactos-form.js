import './my-from-button-block.js'
let template = document.createElement('template');
template.innerHTML = /* html */`
    <style>
        :host {
            all: initial; /* 1st rule so subsequent properties are reset. */
            display: block;
        }
        label {
            color: var(--color-principal, navy);
        }
    </style>
    <form action="">
        <div>
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre">
        </div>
        <my-from-button-block></my-from-button-block>
    </form>
    `
export class AppContactosForm extends HTMLElement {
    static observedAttributes = ['value'];
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        let content = template.content.cloneNode(true);
        content.querySelector('my-from-button-block')
            .addEventListener('send', () => this.shadowRoot.querySelector('form').submit())
        this.shadowRoot.appendChild(content);
    }
}
customElements.define('app-contactos-form', AppContactosForm);