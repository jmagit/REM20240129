import './my-paginator.js'
let template = document.createElement('template');

template.innerHTML = /* html */`
    <style>
    table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    }

    td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    }

    tr:nth-child(even) {
    background-color: #dddddd;
    }
    </style>
    <my-paginator last="20"></my-paginator>
    <table>
        <thead>
            <tr>
                <th>ID
                <th>Autor
                <th>Dimensiones
                <th>Imagen
        <tbody>
            <template id="row">
                <tr>
                    <td>
                    <td>
                    <td>
                    <td>
            </template>
    </table>
`
export class AppFotoList extends HTMLElement {
    static observedAttributes = ['value'];
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.onSelect = this.onSelect.bind(this)
    }
    connectedCallback() {
        let content = template.content.cloneNode(true);
        content.querySelector('my-paginator')
            .addEventListener('change',  ev => this.load(+ev.detail - 1))
        this.shadowRoot.appendChild(content);
        // let data = [
        //     {
        //         "id": "0",
        //         "author": "Alejandro Escamilla",
        //         "width": 5000,
        //         "height": 3333,
        //         "url": "https://unsplash.com/photos/yC-Yzbqy7PY",
        //         "download_url": "https://picsum.photos/id/0/5000/3333"
        //     },
        //     {
        //         "id": "1",
        //         "author": "Alejandro Escamilla",
        //         "width": 5000,
        //         "height": 3333,
        //         "url": "https://unsplash.com/photos/LNRyGwIJr5c",
        //         "download_url": "https://picsum.photos/id/1/5000/3333"
        //     },
        // ];
        // let row = this.shadowRoot.querySelector('#row');
        // data.forEach(item => {
        //     let clone = row.content.cloneNode(true);
        //     let cells = clone.querySelectorAll('td');
        //     cells[0].textContent = item.id;
        //     cells[1].textContent = item.author;
        //     cells[2].textContent = `${item.width} x ${item.height}`;
        //     cells[3].innerHTML = /* html */`<a href="${item.download_url}" target="_blank" >ver</a>`;
        //     row.parentNode.appendChild(clone);
        // })
        this.load(0)
    }
    load(pagina) {
        const rows = 10
        fetch(`https://picsum.photos/v2/list?page=${pagina}&limit=${rows}`).then(
            resp => {
                if (resp.ok) {
                    resp.json().then(data => {
                        let row = this.shadowRoot.querySelector('#row');
                        row.parentNode.querySelectorAll('tr').forEach(item => item.remove())
                        data.forEach(item => {
                            let clone = row.content.cloneNode(true);
                            let cells = clone.querySelectorAll('td');
                            cells[0].textContent = item.id;
                            cells[1].textContent = item.author;
                            cells[2].textContent = `${item.width} x ${item.height}`;
                            // cells[3].innerHTML = /* html */`<a href="${item.download_url}" target="_blank" >ver</a>`;
                            const enlace = document.createElement('a')
                            enlace.href = item.download_url
                            enlace.target = "_blank"
                            enlace.textContent = 'ver'
                            enlace.addEventListener('click', this.onSelect)
                            cells[3].appendChild(enlace)
                            row.parentNode.appendChild(clone);
                        })
                    }).catch(err => console.error(err));
                } else { // Error de petición
                    console.error(`${resp.status} - ${resp.statusText}`);
                }
            },
            err => { // Error de cliente
                console.error(err)
            }
        )
    }
    onSelect(ev) {
        ev.preventDefault()
        this.dispatchEvent(new CustomEvent('select', { detail: ev.target.href, bubbles: true, composed: true  }))
    }
}
customElements.define('app-foto-list', AppFotoList);