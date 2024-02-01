import './main-page-index.js'

let template = document.createElement('template');
template.innerHTML = /* html */`
    <style>
        * {
            box-sizing: border-box;
        }
        <!-- .box {
            display: flex;
            flex-direction: row;
        }
        #aside::slotted(*) {
            max-width: 100px;
            flex: 1;
            align-items:center;
        }
        #main::slotted(*) {
            flex: 3;
            align-items:center;
        } -->
        app-header {
            background-color: lightblue;
            padding: 30px;
            text-align: center;
            font-size: 35px;
            color: white;
            }
        app-footer {
            display: block;
            background-color: lightblue;
            padding: 10px;
            text-align: center;
            color: white;
        }
        nav {
            float: left;
            width: 30%;
            min-height: 300px; /* only for demonstration, should be removed */
            background: #ccc;
            padding: 20px;
        }
        article {
            float: left;
            padding: 20px;
            width: 70%;
            background-color: #f1f1f1;
            min-height: 300px; /* only for demonstration, should be removed */
        }

        /* Clear floats after the columns */
        section::after {
            content: "";
            display: table;
            clear: both;
        }
        @media (max-width: 600px) {
            nav, article {
                width: 100%;
                height: auto;
            }
        }
    </style>
    <app-header></app-header>
    <section>
        <nav part="aside">
            <slot id="aside" name="aside"></slot>
        </nav>    
        <article part="main">
            <slot id="main">(Falta el contenido)</slot>
        </article>
    </section>
    <app-footer></app-footer>
    `
class AppLayout extends HTMLElement {
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
customElements.define('app-layout', AppLayout);
