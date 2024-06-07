import { useState, useEffect } from 'react'

import '../css/aviso.css'

import { mensajesArray } from './mensajes'



function Aviso() {
    const [mensajes, setMensajes] = useState('')
    const [mensajeTotal, setMensajeTotal] = useState(mensajesArray)



    useEffect(() => {
        const listMensajes =  mensajesArray.map((data) => 
            <div id='div-mensaje'>
                <p>Nombre: {data.name}</p>    
                <p>Fecha: {data.date}</p> 
                <p>Ciudad: {data.city}</p> 
                <p>Mensaje: {data.text}</p> 
            </div>
        )
        setMensajes(listMensajes)
    }, []);




    async function Enviar(e) {
        const nameForm = e.target.form[0].value
        const dateForm = e.target.form[1].value
        const cityForm = e.target.form[2].value
        const textForm = e.target.form[3].value


    }




    return (
        <div id='aviso-cuerpo'>
            <div id='rotulo'>
                <h1>Estas en la seccion de avisos</h1>
            </div>

            <div id='datosCompleto'>
                <div id='form'>
                    <form id='formulario'>
                        <label className='form-label' htmlFor="name">Nombre: </label>
                        <input type="text" name="name" id="name" />
                        <br />
                        <label className='form-label' htmlFor="date">Fecha: </label>
                        <input type="date" name="date" id="date" />
                        <br />
                        <label className='form-label' htmlFor="city">Ciudad: </label>
                        <input type="text" name="city" id="city" />
                        <br />
                        <label className='form-label' htmlFor="text">Mensaje: </label>
                        <textarea name="text" id="text" cols='40' rows='5' />
                        <br />
                        <input id='buttonEnviar' type="button" value="Enviar" onClick={Enviar} />
                    </form>
                </div>

                <div id='mensajesEnviados'>
                    {mensajes}
                </div>
            </div>

                
        </div>
    )
}


export {
    Aviso
}