import { useState, useRef, useEffect } from 'react'

import '../css/simulador.css'
import { frase, reset } from './fraseSim'





function Simulador() {
    const [antes, setAntes] = useState('')
    const [despues, setDespues] = useState('')
    const [meme, setMeme] = useState('')
    const [text, setText] = useState('')
    const [reinicio, setReinicio] = useState('')



    async function iniciarSim(e) {
        const magSelected = e.target.form[0].value
        let i = 0

        setAntes()        

        const interval = setInterval(() => {
            
            i++;
            if (i >= 10) {
              clearInterval(interval);
              setDespues()
              setText(frase[magSelected])
              setMeme()
            }
          }, 500);
    }


    async function reiniciar() {
        setAntes('')
        setDespues('')
        setMeme('')
        setText('')
        setReinicio(reset)
        
        setTimeout(() => {
            setReinicio('')
        }, 2500);
    }



    return (
        <div>
            <div id='rotulo_p'>
                <h1>Estas en el simulador de seismos</h1>
            </div>

            <div id='form_sim'>
                <form>
                    <label htmlFor="mag">Magnitud: </label>
                    <select name='mag'>
                        <option selected>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    <br />
                    <input id='button_sim' name='sim' type='button' value='Comenzar simulacion' onClick={iniciarSim}/>
                    <br />
                    <input id='button_sim' name='sim' type='button' value='Reiniciar' onClick={reiniciar}/>
                </form>
            </div>

            <div id='estructura'>
                <div id='mensaje'>
                    <h3>{text}</h3>
                    <h3>{reinicio[0]}</h3>
                    <img src={reinicio[1]} />
                </div>
                <div id='img'>
                    <img src={antes} />
                    <img src={despues} />
                </div>
            </div>
        </div>
    )
}


export {
    Simulador
}