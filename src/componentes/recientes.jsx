import { useState, useRef, useEffect } from 'react'

import '../css/recientes.css'

import { Last, Detalle, Count } from '../api.js'




function Recientes() {
  const [datosAPI, setDatosAPI] = useState('')
  const [data, setData] = useState('')
  const [Detail, setDetail] = useState('')
  const [contador, setContador] = useState('')
  const [coor1, setCoor1] = useState('')
  const [coor2, setCoor2] = useState('')


  async function openMap(data) {
    let coordinates_1 = data.geometry.coordinates[0]
    let coordinates_2 = data.geometry.coordinates[1]
    setCoor1(coordinates_1)
    setCoor2(coordinates_2)

    const detalleCompleto = await Detalle(data.id)
    let detalleArray = [
      detalleCompleto.properties.mag,
      detalleCompleto.properties.place,
      detalleCompleto.properties.tsunami,
      detalleCompleto.properties.products.origin[0].properties.depth,
      detalleCompleto.properties.products.origin[0].properties.eventtime
    ]

    setDetail(detalleArray)
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
            <p>Fecha: {Detail[4]}</p>
            <p>Magnitud: {Detail[0]}</p>
            <p>Lugar: {Detail[1]}</p>
            <p>Riesgo de tsunami: {Detail[2]}</p>
            <p>Profundidad: {Detail[3]}</p>
            <p>properties.products.nearby-cities[0].contents.nearby-cities.json.url</p>
          </div>

          <div id='mapa-mapa'>

            <iframe
            id="inlineFrameExample"
            title="Inline Frame Example"
            width="1100"
            height="800"
            src={URLMapa}>
            </iframe>

          </div>
        </div>
      </div>
  )
}

export {
    Recientes
}