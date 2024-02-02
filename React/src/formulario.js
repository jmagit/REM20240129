import { useEffect, useRef, useState } from 'react'
import { Esperando, ValidationMessage } from './biblioteca/comunes'

export default function Contactos(props) {
    const [modo, setModo] = useState('list')
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [listado, setListado] = useState([])
    const [elemento, setElemento] = useState({})

    function cancel() {
        setModo('list')
    }
    function send(data) {
        // eslint-disable-next-line default-case
        switch (modo) {
            case 'add':
                alert(`POST ${JSON.stringify(data)}`)
                setModo('list')
                break;
            case 'edit':
                alert(`PUT ${JSON.stringify(data)}`)
                setModo('list')
                break;
        }
    }
    function load() {

    }
    function add() {
        setElemento({sexo: 'H'})
        setModo('add')
    }
    function edit(id) {
        setElemento({ id, nombre: 'Pepito', sexo: 'H', edad: 66, conflictivo: false })
        setModo('edit')
    }
    function view(id) {
        setElemento({ id, nombre: 'Pepito', sexo: 'H', edad: 66, conflictivo: false })
        setModo('view')
    }
    function remove(id) {
        setModo('list')
    }

    if (loading)
        return <Esperando />
    let componente
    switch (modo) {
        case 'view':
            componente = <ContactosView elemento={elemento} onVolver={cancel} />
            break;
        case 'add':
        case 'edit':
            componente = <ContactosForm elemento={elemento} esNuevo={modo === 'add'} onEnviar={e => send(e)} onVolver={cancel} />
            break;
        default:
            componente = <ContactosList listado={listado} onAdd={add} onEdit={id => edit(id)} onView={id => view(id)} onDelete={id => remove(id)} />
            break;
    }
    return (
        <>
            <h1>Contactos</h1>
            {componente}
        </>
    )
}

function ContactosList(props) {
    return (
        <>
            <p>
                <input type='button' value="add" onClick={() => props.onAdd && props.onAdd()} />
                <input type='button' value="edit" onClick={() => props.onEdit && props.onEdit(1)} />
                <input type='button' value="view" onClick={() => props.onView && props.onView(1)} />
                <input type='button' value="delete" onClick={() => props.onDelete && props.onDelete(1)} />
            </p>
        </>
    )
}
function ContactosView({ elemento, onVolver }) {
    return (
        <>
            <p>{JSON.stringify(elemento)}</p>
            <p>
                <input type='button' value="volver" onClick={() => onVolver && onVolver()} />
            </p>
        </>
    )
}
function ContactosForm(props) {
    const [elemento, setElemento] = useState(props.elemento)
    const [invalid, setInvalid] = useState(false)
    const [errorsMsg, setErrorsMsg] = useState({})
    const form = useRef(null)

    useEffect(() => {
        let invalid = false
        let errorsMsg = {}
        for(let cntr of form.current.elements) {
            // eslint-disable-next-line default-case
            switch(cntr.name) {
                case 'nombre':
                    cntr.setCustomValidity(cntr.value !== cntr.value.toUpperCase() ? 'Tiene que estar en mayúsculas' : '')
                    break;
            }
            if(cntr.validationMessage) {
                invalid = true
                errorsMsg[cntr.name] = cntr.validationMessage
            }
        }
        setInvalid(invalid)
        setErrorsMsg(errorsMsg)
    },[elemento])
    function handleChange(ev) {
        const cmp = ev.target.name
        const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value
        setElemento(prev => Object.assign({}, prev, { [cmp]: value }))
    }
    return (
        <form ref={form}>
            <div>
                <label forHtml="id">código: </label>
                {props.esNuevo ? 
                <>
                    <input type="number" id="id" name="id" value={elemento.id} onChange={handleChange} readOnly={!props.esNuevo} required /> 
                    <ValidationMessage msg={errorsMsg?.id} />
                </>
                    : 
                    <span>{elemento.id}</span>
                }
            </div>
            <div>
                <label forHtml="nombre">nombre: </label>
                <input type="text" id="nombre" name="nombre" value={elemento.nombre} onChange={handleChange} required minLength={2} maxLength={10} />
                <ValidationMessage msg={errorsMsg?.nombre} />
            </div>
            <div>
                <input type="radio" id="sexoH" name="sexo" value='H' checked={elemento.sexo === 'H'} onChange={handleChange} />
                <label forHtml="sexoH">hombre </label>
                <input type="radio" id="sexoM" name="sexo" value='M' checked={elemento.sexo === 'M'} onChange={handleChange} />
                <label forHtml="sexo">mujer </label>
            </div>
            <div>
                <label forHtml="sexo">sexo </label>
                <select name="sexo" value={elemento.sexo} onChange={handleChange}>
                    <option value={undefined}>Desconocido</option>
                    <option value="H">hombre</option>
                    <option value="M">mujer</option>
                </select>
            </div>
            <div>
                <label forHtml="edad">edad: </label>
                <input type="number" id="edad" name="edad" value={elemento.edad} onChange={handleChange} min={16} max={67} />
                <ValidationMessage msg={errorsMsg?.edad} />
            </div>
            <div>
                <input type="checkbox" id="conflictivo" name="conflictivo" checked={elemento.conflictivo} onChange={handleChange} />
                <label forHtml="conflictivo">conflictivo</label>
            </div>
            <p>
                <input type='button' value="enviar" onClick={() => props.onVolver && props.onEnviar(elemento)} disabled={invalid} />
                <input type='button' value="volver" onClick={() => props.onVolver && props.onVolver()} />
            </p>
            <p>{JSON.stringify(elemento)}</p>
            <p>{JSON.stringify(errorsMsg)}</p>
        </form>
    )
}
