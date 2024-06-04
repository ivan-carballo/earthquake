import { useState, useRef, useEffect } from 'react'

import '../css/recientes.css'

import { Last, Detalle, Count } from '../api.js'
import { openCard } from './openCard.jsx'




function Recientes() {
  const [datosAPI, setDatosAPI] = useState('')
  const [data, setData] = useState('')
  const [Detail, setDetail] = useState('')
  const [contador, setContador] = useState('')
  const [coor1, setCoor1] = useState('')
  const [coor2, setCoor2] = useState('')


  
  let URLMapa = `https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d57627.40691107387!2d${coor1}!3d${coor2}!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2ses!4v1717443201040!5m2!1ses!2ses`

  
  useEffect(() => {
    LastFind()
    async function LastFind() {
      let datos = await Last();
      datos = await datos.features      
  
      const listAPI = await datos.map((data) =>
        <div className='div-tarjeta' onClick={ async ()=>{
            setData(data)
            setDetail(await openCard(data))
            }}>
            <p key={data.properties.ids}>Localizacion: {data.properties.place}</p>
            <p key={data.id}>Magnitud: {data.properties.mag}</p>
        </div>
      )
      setDatosAPI(listAPI)
    }
  }, []);


  useEffect(() => {
    Conteo()
    async function Conteo() {
      const conteo = await Count()
      setContador(conteo)
    }
  })
  



  return (
    <div id='all'>
        <div id='reciente'>

            <p className='rotulo'>Ultimos 20 terremotos registrados</p>
            <p className='rotulo'>Teremotos registrados hoy: {contador}</p>
            {datosAPI}

        </div>
        <div id='mapas'>

          <div id='mapa-datos'>
            <h1>Datos del terremoto</h1>
            <p>{Detail[4]}</p>
            <p>{Detail[0]}</p>
            <p>{Detail[1]}</p>
            <p>{Detail[2]}</p>
            <p>{Detail[3]}</p>
            {/* <p>{Detail[5]}</p> */}
            <p>properties.products.nearby-cities[0].contents.nearby-cities.json.url</p>
          </div>

          <div id='mapa-mapa'>

            <iframe
            id="inlineFrameExample"
            title="Inline Frame Example"
            width="1100"
            height="800"
            src={Detail[5]}>
            </iframe>

          </div>
        </div>
      </div>
  )
}

export {
    Recientes
}