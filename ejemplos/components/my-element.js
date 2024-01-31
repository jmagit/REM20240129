class MyElement extends HTMLElement {
    constructor() {
        super();
    }
    cotilla() {
        console.log(`Soy un ${this.localName}`)
    }
}
customElements.define('my-element', MyElement);
