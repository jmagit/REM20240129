import { useState } from 'react'

function toUpper(value) {
    return value ? (value[0].toUpperCase() + value.substring(1).toLowerCase()) : value
}

export function DemosJSX() {
    const calc = (a, b) => {
        let result = 0
        for (let i = 0; i < b; i++) {
            result += a
        }
        return result
    }
    let r = calc(20, 2)
    let url = "logo192.png"
    let tamaño = { height: 150, width: 50 }
    let { h, w } = tamaño
    let { width, height } = tamaño
    // let value = [150, 150, 200]
    // let [h,w] = value
    height = '<i>kk</i>'
    width = 0
    const etiquetas = (cond, valor) => {
        if(cond) {
            return <i>{valor}</i>
        } else {
            return <b>{valor}</b>
        }
    }
    let eti = <span>Parrafo</span>
    const [valores, setValores] = useState([150, 150, 200])
    let listado = [
        {id: 1, nombre: 'Madrid'},
        {id: 2, nombre: 'barcelona'},
        {id: 3, nombre: 'VALENCIA'},
        {id: 4, nombre: 'ciudad Real'},
    ]
    listado[1] = {...listado[1], nombre: 'Barcelona'}
    let myStyle={color: 'white', backgroundColor: 'red'}
    let clase = 'urgente'
    if(width > 0){
        myStyle.color = 'red'
    }else{
        myStyle.fontSize = '12px'
        clase = 'error'
    }
    const modifica = () => {
        valores.forEach((t, i) => valores[i] = t + 1 )
        setValores([...valores])
        // setValores([...valores, 100])
    }
    // if(!width)
    //     return [
    //         <p>No hay, valor{clase}</p>,
    //         <p>No hay valor</p>
    //     ]
    //     // return <p>No hay valor</p>
    return (
        <>
            <p style={myStyle}>Calcula: 2 + 2 = {2 + 2} = {calc(2, 2)} = {r}</p>
            {/* <img src="logo192.png" height={r} /> */}
            {/* <img src={url} height={40} width="40" />
            <img src={url} {...tamaño} /> */}
            <img src={url} height={h} width={w} />
            <p className={clase} >width: {width > 0 ? 'true':'false'} height: {height || 'vacio'} {height && 'tiene valor'}</p>
            <p>width: {width > 0 ? <b>true</b>:eti} height: {height || 'vacio'}</p>
            <p style={{color: 'white', backgroundColor: 'red'}} dangerouslySetInnerHTML={{__html: height}} />
            {etiquetas(width > 0, 'valor')}
            {eti}
            <input type='button' value="add" onClick={modifica} />
            <ul>{valores.filter(item => item < 200).map((item, index) => <li key={index}>{item}</li>)}</ul>
            <ul>{listado.map(item => <li key={item.id}>{toUpper(item.nombre)}</li>)}</ul>
            <select>{listado.map(item => <option key={item.id} value={item.id}>{toUpper(item.nombre)}</option>)}</select>        
            {JSON.stringify(tamaño)}
            {JSON.stringify({clase})}

        </>
    )
}