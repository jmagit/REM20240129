import React, { useEffect, useRef, useState } from 'react'
import { Esperando } from '../biblioteca/comunes';
import { Paginator } from 'primereact/paginator';

function Ficha(props) {
    // {"id":"0","author":"Alejandro Escamilla","width":5000,"height":3333,"url":"","download_url":"","visible":false}
    return (
        <div className="card" style={{ width: "14rem" }}>
            {props.visible && <img src={props.download_url} className="card-img-top" alt={`Foto ${props.id} de ${props.author}`} />}
            <div className="card-body">
                <h5 className="card-title">{props.author}</h5>
                {!props.visible && <div className="card-text">
                    <p>Dimensión: {props.width}x{props.height}</p>
                    <p><a href={props.url} target="_blank" rel="noreferrer" title={`Saber mas de la foto ${props.id}`}>Saber mas</a></p>
                    <input type="button" value="Ver foto" className="btn btn-primary" onClick={() => props.onVer && props.onVer(props.id)} />
                </div>}
            </div>
        </div>
    )
}

export default function Muro(props) {
    const [loading, setLoading] = useState(true)
    const [errorMsg, setErrorMsg] = useState('')
    const [listado, setListado] = useState([])
    const [pagina, setPagina] = useState(1)
    const [rows, setRows] = useState(20)
    const first = useRef(0);
    const totalRecords = 1000;

    useEffect(() => {
        setLoading(true)
        setErrorMsg('')
        fetch(`https://picsum.photos/v2/list?page=${pagina}&limit=${rows}`).then(
            resp => {
                if (resp.ok) {
                    resp.json().then(data => {
                        setListado(data.map(item => ({ ...item, visible: false })))
                        first.current = pagina ? (pagina * rows) : 0
                    }).catch(err => setErrorMsg(`Error formato del body: ${err}`));
                } else { // Error de petición
                    console.error(`${resp.status} - ${resp.statusText}`);
                    setErrorMsg(`${resp.status} - ${resp.statusText}`)
                }
                setLoading(false)
            },
            err => { // Error de cliente
                setErrorMsg('Error de petición');
                console.error(err)
                setLoading(false)
            }
        )
    }, [pagina, rows])

    function load(pagina = 0, filas = 20) {
        setPagina(pagina)
        setRows(filas)
    }
    function mostrar(indice) {
        listado[indice].visible = !listado[indice].visible;
        setListado([...listado])
    }

    if (loading)
        return <Esperando />
    return (
        <div>
            {errorMsg && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
                        viewBox="0 0 16 16"
                        width={26}
                        role="img"
                        aria-label="Error:"
                    >
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                    <div>{errorMsg}</div>
                </div>
            )}
            <main className='container-fluid'>
                <Paginator first={first.current} rows={rows} totalRecords={totalRecords} rowsPerPageOptions={[10, 20, 50, 100]}
                    onPageChange={e => load(e.page, e.rows)} />
                <div className='row'>
                    {listado.map((item, index) => <Ficha key={item.id} {...item} onVer={() => mostrar(index)} />)}
                </div>
            </main>
        </div>
    )
}

