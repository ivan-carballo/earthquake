import { useState, useRef, useEffect } from 'react'

import '../css/buscador.css'

import { formatearDate, Last, Detalle, Count, FindDate } from '../api.js'



function Buscador() {
    const [initialData, setInitialData] = useState('')
    const [finalData, setFinalData] = useState('')
    const [results, setResults] = useState('')


    async function ClickFindDate(e) {
        let inicial = e.target.form[0].valueAsDate
        let final = e.target.form[1].valueAsDate

        inicial = await formatearDate(inicial)
        final = await formatearDate(final)

        let API_findDate = await FindDate(inicial, final)
        API_findDate = await API_findDate.features

        const resultsAPI = await API_findDate.map((data) =>
            <div className='div-tarjeta' onClick={()=>{
                setData(data)
                }}>
                <p key={data.properties.ids}>Localizacion: {data.properties.place}</p>
                <p key={data.id}>Magnitud: {data.properties.mag}</p>
            </div>
        )
        setResults(resultsAPI)
    }





    return (
        <div id='all'>
            <div id='formDate'>
                <form action="">
                    <label htmlFor="inicial">Fecha inicial</label>
                    <input name='inicial' type='date' />
                    <label htmlFor="final">Fecha final</label>
                    <input name='final' type='date' />
                    <input name='findDate' type='button' value='Buscar por fecha' onClick={ClickFindDate}/>
                </form>
            </div>

            <div id='results'>
                {results}
            </div>
        </div>
    )
}


export {
    Buscador
}