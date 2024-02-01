class MyPaginator extends HTMLElement {
    static observedAttributes = ['value'];
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        let content = document.createElement('nav');
        let first = this.getAttribute('first') ?? 1
        let last = this.getAttribute('last') ?? 10
        const controller = ev => this.dispatchEvent(new CustomEvent('change', { detail: +ev.target.value, bubbles: true, composed: true  }))
        for(let i=first; i <= +last; i++ ) {
            let btn = document.createElement('input')
            btn.setAttribute('type', 'button')
            btn.setAttribute('value', i)
            btn.addEventListener('click', controller)
            content.appendChild(btn)
        }
        this.shadowRoot.appendChild(content);
    }
}
customElements.define('my-paginator', MyPaginator);