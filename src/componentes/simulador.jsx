import { useState, useRef, useEffect } from 'react'

import '../css/simulador.css'
import { frase, reset } from './fraseSim'





function Simulador() {
    const [antes, setAntes] = useState('')
    const [despues, setDespues] = useState('')
    const [meme, setMeme] = useState('')
    const [text, setText] = useState('')
    const [reinicio, setReinicio] = useState('')
    const [style, setStyle] = useState(false)
    const [shake, setShake] = useState('')



    async function iniciarSim(e) {
        const magSelected = e.target.form[0].value
        let i = 0
        let timeTotal
        magSelected == 0 ? timeTotal = 4 : timeTotal = 10

        setStyle(true);
        setShake(magSelected == 0 ? 0 : 1 / parseInt(magSelected))
        setDespues('')
        setAntes(`../../public/A${magSelected}.jpg`)        

        const interval = setInterval(() => {
            setStyle(false);
            i++;
            if (i >= timeTotal) {
              clearInterval(interval);
              setAntes('')
              setDespues(`../../public/D${magSelected}.jpg`)
              setText(frase[magSelected])
              //setMeme()
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
        }, 2000);
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
                    <img id={style ? 'imgAntes' : ''} style={{ animation: `shake ${shake}s infinite alternate` }}src={antes} />
                    <img src={despues} />
                </div>
            </div>
        </div>
    )
}


export {
    Simulador
}