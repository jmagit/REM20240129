let template = document.createElement('template');
template.innerHTML = /* html */`
        <h1>Plantilla por defecto</h1>
        <div>
            <h1 class="titulo">Titulo</h1>
            <slot>(vacío)</slot>
            <slot name="pie"></slot>
        </div>
    `
class MyCard extends HTMLElement {
    static observedAttributes = ['value'];
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.titulo = this.getAttribute('title')
        if (this.hasAttribute('template') && document.getElementById(this.getAttribute('template'))) {
            this.plantilla = document.getElementById(this.getAttribute('template')).content.cloneNode(true)
        } else {
            let defecto = document.getElementById(this.localName)
            if (defecto) {
                this.plantilla = defecto.content.cloneNode(true)
            } else {
                this.plantilla = template.content.cloneNode(true);
            }
        }
    }
    connectedCallback() {
        if (this.titulo) {
            let eti = this.plantilla.querySelector('.titulo')
            if (eti)
                eti.textContent = this.titulo
        }
        this.shadowRoot.appendChild(this.plantilla);
    }
}
customElements.define('my-card', MyCard);