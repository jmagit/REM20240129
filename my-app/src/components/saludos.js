export function Saluda(props) {
    // if(props.nombre)
    //     props.nombre = props.nombre.toUpperCase()
    return (
        <div>
            <h1>Hola {props.nombre || <span>Sin nombre</span>}</h1>
        </div>
    )
}

export function Despide({ nombre }) {
    return (
        <div>
            <h1>Adios {nombre || <span>Sin nombre</span>}</h1>
        </div>
    )
}

export default function LosDos({ nombre }) {
    return (
        <>
            <Saluda nombre={nombre} />
            <Despide nombre={nombre} />
        </>
    )
}
