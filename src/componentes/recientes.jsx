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
            width="1200"
            height="800"
            src='https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d212885.1074621023!2d{coor1}!3d{coor2}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzPCsDM5JzQ4LjAiTiAxMTbCsDQ2JzM5LjYiVw!5e0!3m2!1ses!2ses!4v1717424309896!5m2!1ses!2ses'>
            </iframe>

            </div>
    </div>
  )
}

export {
    Recientes
}