import { useState, useRef, useEffect } from 'react'

import '../css/buscador.css'

import { formatearDate, Last, Detalle, Count, FindDate } from '../api.js'
import { Modal } from '../modal/modal.jsx'
import { func } from 'prop-types'




function Buscador() {
    const [initialData, setInitialData] = useState('')
    const [finalData, setFinalData] = useState('')
    const [results, setResults] = useState('')
    const [data, setData] = useState('')
    const [coor1, setCoor1] = useState('')
    const [coor2, setCoor2] = useState('')
    const [detail, setDetail] = useState('')

  


    async function ClickFindDate(e) {
        let inicial = e.target.form[0].valueAsDate
        let final = e.target.form[1].valueAsDate

        inicial = await formatearDate(inicial)
        final = await formatearDate(final)

        let API_findDate = await FindDate(inicial, final)
        API_findDate = await API_findDate.features

        const resultsAPI = await API_findDate.map((data) =>
            <div className='div-tarjeta' onClick={ async ()=>{
                setData(data)
                openModal(data)
                }}>
                <p key={data.properties.ids}>Localizacion: {data.properties.place}</p>
                <p key={data.id}>Magnitud: {data.properties.mag}</p>
            </div>
        )
        setResults(resultsAPI)
    }
    

    
    async function openModal(data) {
        let coordinates_1 = data.geometry.coordinates[0]
        let coordinates_2 = data.geometry.coordinates[1]
        setCoor1(coordinates_1)
        setCoor2(coordinates_2)

        let URLMapa = `https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d57627.40691107387!2d${coor1}!3d${coor2}!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2ses!4v1717443201040!5m2!1ses!2ses`
    
        const detalleCompleto = await Detalle(data.id)
    
        let detalleArray = [
          'Magnitud del seismo: ' + detalleCompleto.properties.mag,
          'Localizacion: ' + detalleCompleto.properties.place,
          'Riesgo de tsunami: ' + detalleCompleto.properties.tsunami,
          'Profundidad: ' + detalleCompleto.properties.products.origin[0].properties.depth,
          'Fecha: ' + detalleCompleto.properties.products.origin[0].properties.eventtime,
          //'Longitud: ' + detalleCompleto.properties.products.origin[0].properties.azimuthal-gap
        ]
    
        setDetail(detalleArray)        
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

            {detail && 
            <Modal isOpen={true} onClose={()=> {
                setDetail(null)
                }}>
            <div id="modalNombre">
                <p>{detail[4]}</p>
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