import { useState } from 'react'

export default function Formulario({nombre, onChange}) {
    const [valor, setValor] = useState(nombre)

    const changeHandler = ev => {
        setValor(ev.target.value)
        if(onChange)
            onChange(ev.target.value)
    }
    return (
        <>
            <p>Nombre actual: {valor}</p>
            <div>
                <input type='text' value={valor} onChange={changeHandler} />
            </div>
        </>
    )
}