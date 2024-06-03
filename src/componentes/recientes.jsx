import { useState, useRef, useEffect } from 'react'

import '../css/recientes.css'

import { Last } from '../api.js'




function Recientes() {
  const [datosAPI, setDatosAPI] = useState('')
  const [data, setData] = useState('')
  const [coor1, setCoor1] = useState('')
  const [coor2, setCoor2] = useState('')


  async function openMap(data) {
    let coordinates_1 = data.geometry.coordinates[0]
    let coordinates_2 = data.geometry.coordinates[1]
    setCoor1(coordinates_1)
    setCoor2(coordinates_2)
  }

  let URLMapa = `https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d57627.40691107387!2d${coor1}!3d${coor2}!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2ses!4v1717443201040!5m2!1ses!2ses`

  useEffect(() => {
    LastFind()
    async function LastFind() {
      let datos = await Last();
      datos = await datos.features
  
      const listAPI = await datos.map((data) =>
        <div className='div-tarjeta' onClick={()=>{
            setData(data)
            openMap(data)
            }}>
            <p key={data.properties.ids}>Localizacion: {data.properties.place}</p>
            <p key={data.properties.code}>Magnitud: {data.properties.mag}</p>
            <p key={data.properties.time}>Estado: {data.properties.status}</p>
            <p key={data.properties.updated}>Riesgo de tsunami: {data.properties.tsunami}</p>
        </div>
      )
      setDatosAPI(listAPI)
    }
  }, []);
  



  return (
    <div id='all'>
        <div id='reciente'>

            <h2>Ultimos 15 terremotos registrados</h2>
            {datosAPI}

        </div>
        <div id='mapas'>

            <h1>{}</h1>

            <iframe
            id="inlineFrameExample"
            title="Inline Frame Example"
            width="1100"
            height="800"
            src={URLMapa}>
            </iframe>

            </div>
    </div>
  )
}

export {
    Recientes
}