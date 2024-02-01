let template = document.createElement('template');
template.innerHTML = /* html */`
    <hr>
    <div>&copy; Todos los derechos reservados</div>
    `
class AppFooter extends HTMLElement {
    static observedAttributes = ['value'];
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        let content = template.content.cloneNode(true);

        this.shadowRoot.appendChild(content);
    }
}
customElements.define('app-footer', AppFooter);