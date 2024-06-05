import { useState, useRef, useEffect } from 'react'

import '../css/simulador.css'



function Simulador() {



    return (
        <div>
            <div id='rotulo_p'>
                <h1>Estas en el simulador de terremotos</h1>
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
                    <input id='button_sim' name='sim' type='button' value='Comenzar simulacion' />
                </form>
            </div>
        </div>
    )
}


export {
    Simulador
}