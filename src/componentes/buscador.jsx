import { useState, useRef, useEffect } from 'react'

import '../css/buscador.css'

import { formatearDate, Last, Detalle, Count, FindDate } from '../api.js'
import { Modal } from '../modal/modal.jsx'
import { openCard } from './openCard.jsx'


function Buscador() {
    const [results, setResults] = useState('')
    const [data, setData] = useState('')
    const [detail, setDetail] = useState('')

  


    async function ClickFindDate(e) {
        let inicial = e.target.form[0].valueAsDate
        let final = e.target.form[1].valueAsDate
        let mag = e.target.form[2].valueAsNumber

        inicial = await formatearDate(inicial)
        final = await formatearDate(final)

        let API_findDate = await FindDate(inicial, final, mag)
        API_findDate = await API_findDate.features

        const resultsAPI = await API_findDate.map((data) =>
            <div className='div-tarjeta' onClick={ async ()=>{
                setData(data)
                setDetail(await openCard(data))
                }}>
                <p key={data.properties.ids}>Localizacion: {data.properties.place}</p>
                <p key={data.id}>Magnitud: {data.properties.mag}</p>
            </div>
        )
        setResults(resultsAPI)
    }
    


    return (
        <div id='body'>
            <div id='formDate'>
                <form action="" id='form'>
                    <label className='form-inputs' htmlFor="inicial">Fecha inicial</label>
                    <input className='form-inputs' name='inicial' type='date' />
                    <br />
                    <label className='form-inputs' htmlFor="final">Fecha final</label>
                    <input className='form-inputs' name='final' type='date' />
                    <br />
                    <label className='form-inputs' htmlFor="mag">Magnitud minima:</label>
                    <input className='form-inputs' name='mag' type='number' min="0" max="25" />
                    <br />
                    <input className='form-inputs' name='findDate' type='button' value='Buscar por fecha' onClick={ClickFindDate}/>
                </form>
            </div>

            {detail && 
            <Modal isOpen={true} onClose={()=> {
                setDetail(null)
                }}>

                <div id='completo'>
                    <div id="modalNombre">
                        <p>{detail[4]}</p>
                        <p>{detail[1]}</p>
                        <p>{detail[0]}</p>
                        <p>{detail[3]}</p>
                        <p>{detail[2]}</p>
                    </div>

                    <div id='modalMapa'>
                        <iframe
                        id="inlineFrameExample"
                        width="800"
                        height="600"
                        src={detail[5]}>
                        </iframe>
                    </div>
                </div>

              </Modal>
            }
            

            <div id='results'>
                {results}
            </div>
        </div>
    )
}


export {
    Buscador
}