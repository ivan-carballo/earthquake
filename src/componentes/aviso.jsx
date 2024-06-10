import { useState, useEffect } from 'react'

import '../css/aviso.css'

import { mensajesArray } from './mensajes'
import { FormatearFecha } from './formatearFecha'



function Aviso() {
    const [mensajes, setMensajes] = useState('')
    const [mensajeTotal, setMensajeTotal] = useState(mensajesArray)
    const [camposRellenos, setCamposRellenos] = useState('')
    const [camposEnviado, setCamposEnviado] = useState('')
    const [estadoBoton, setEstadoBoton] = useState(true);

    
    
        useEffect(() => {
            if (estadoBoton) {
                const listMensajes =  mensajeTotal.map((data) => 
                    <div id='div-mensaje'>
                        <p>Nombre: {data.name}</p>    
                        <p>Fecha: {data.date}</p> 
                        <p>Ciudad: {data.city}</p> 
                        <p>Mensaje: {data.text}</p> 
                    </div>
                )
                setMensajes(listMensajes)
                setEstadoBoton(!estadoBoton)
            }
        }, [estadoBoton]);




    async function Enviar(e) {
        const nameForm = e.target.form[0].value
        const dateForm = await FormatearFecha(Date.now())
        const cityForm = e.target.form[2].value
        const textForm = e.target.form[3].value

        if (nameForm.length < 1 || cityForm.length < 1 || textForm.length < 1) {
            setCamposRellenos('Debe rellenar todos los campos para poder enviar el aviso de seismo')
        } else {
            const newMensaje = {
                                name: nameForm,
                                date: dateForm,
                                city: cityForm,
                                text: textForm
                                }

            let allMensaje = mensajeTotal
            allMensaje.push(newMensaje)

            setCamposRellenos('')
            setMensajeTotal(allMensaje)
            setEstadoBoton(!estadoBoton);
            setCamposEnviado('Su aviso de seismo ha sido enviado de forma correcta')

            setTimeout(() => {
                setCamposEnviado('')
            }, 8000);
        }
    }




    return (
        <div id='aviso-cuerpo'>
            <div id='rotulo'>
                <h1>Estas en la seccion de avisos</h1>
            </div>

            <div id='datosCompleto'>
                <div id='form'>
                    <form id='formulario'>
                        <p id='camposVacios'>{camposRellenos}</p>
                        <p id='camposEnviado'>{camposEnviado}</p>
                        <label className='form-label' htmlFor="name">Nombre: </label>
                        <input type="text" name="name" id="name" placeholder='Nombre' />
                        <br />
                        <label className='form-label' htmlFor="city">Ciudad: </label>
                        <input type="text" name="city" id="city" placeholder='Ciudad' />
                        <br />
                        <label className='form-label' htmlFor="text">Mensaje: </label>
                        <textarea name="text" id="text" cols='30' rows='8' placeholder='Mensaje' />
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