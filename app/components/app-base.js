let template = document.createElement('template');
template.innerHTML = /* html */`
    <h1></h1>
    <hr>
    `
export class AppBase extends HTMLElement {
    static observedAttributes = ['value'];
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        let content = template.content.cloneNode(true);
        content.querySelector('h1').textContent = this.title
        this.shadowRoot.appendChild(content);
    }
}
customElements.define('app-base', AppBase);