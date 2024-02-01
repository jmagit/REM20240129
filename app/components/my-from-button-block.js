let template = document.createElement('template');
template.innerHTML = /* html */`
    <button id="send" type="button" >Enviar</button>
    <button id="back" type="button" >Volver</button>
    `
class MyFromButtonsBlock extends HTMLElement {
    static observedAttributes = ['value'];
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        let content = template.content.cloneNode(true);
        this.btnSend = content.getElementById('send')
        this.btnSend.addEventListener('click', () => this.dispatchEvent(new Event('send', { bubbles: true, composed: true })))
        this.btnBack = content.getElementById('back')
        this.btnBack.addEventListener('click', () => this.dispatchEvent(new Event('back', { bubbles: true, composed: true })))
        this.shadowRoot.appendChild(content);
   }
}
customElements.define('my-from-button-block', MyFromButtonsBlock);