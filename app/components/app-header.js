let template = document.createElement('template');
template.innerHTML = /* html */`
    <style>
        :host {
            display: block;
            margin: 0;
            padding: 1em;
            background-color: lightgreen;
        }
    </style>
    <header>
        <nav>
            <a href="index.html">Home</a> |&nbsp;
            <a href="page-1.html">Page 1</a> |&nbsp;
            <a href="page-2.html">Page 2</a> |&nbsp; 
            <a href="page-3.html">Page 3</a> 
        </nav>
    </header>
    `
class AppHeader extends HTMLElement {
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
customElements.define('app-header', AppHeader);