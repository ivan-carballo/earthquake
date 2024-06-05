import { useState, useRef, useEffect } from 'react'

import '../css/recientes.css'

import { Last, Detalle, Count } from '../api.js'
import { openCard } from './openCard.jsx'
import { CiudadesAfectadas } from './ciudadesAfectadas.jsx'
import { func } from 'prop-types'




function Recientes() {
  const [datosAPI, setDatosAPI] = useState('')
  const [data, setData] = useState('')
  const [Detail, setDetail] = useState('')
  const [cities, setCities] = useState('')
  const [contador, setContador] = useState('')
  const [rotulo, setRotulo] = useState('')
  const [rotuloCiudades, setRotuloCiudades] = useState('')


  

  useEffect(() => {
    LastFind()
    async function LastFind() {
      let datos = await Last();
      datos = await datos.features      
  
      const listAPI = await datos.map((data) =>
        <div className='div-tarjeta' onClick={ async ()=>{
            setData(data)
            setRotulo('Datos del seismo')
            setRotuloCiudades('Ciudades afectadas')
            setDetail(await openCard(data))
            setCities(await CiudadesAfectadas(data))
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
            <div id='datos'>
              <h1>{rotulo}</h1>
              <p>{Detail[4]}</p>
              <p>{Detail[1]}</p>
              <p>{Detail[0]}</p>
              <p>{Detail[3]}</p>
              <p>{Detail[2]}</p>
            </div>
              <p>{}</p>
            <div id='cities'>
              <h1>{rotuloCiudades}</h1>
              <p>{cities}</p>
            </div>
          </div>

          <div id='mapa-mapa'>

            <iframe
            id="inlineFrameExample"
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