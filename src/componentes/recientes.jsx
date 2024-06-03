import { useState, useRef, useEffect } from 'react'
import { Last } from '../api.js'




function Recientes(listAPI) {
  const [datosAPI, setDatosAPI] = useState('')
  const [data, setData] = useState('')




  useEffect(() => {
    LastFind()
    async function LastFind() {
      let datos = await Last();
      datos = await datos.features
  
      const listAPI = await datos.map((data) =>
        <div onClick={()=>{setData(data)}}>
          <p key={data.properties.place}>{data.properties.place}</p>
        </div>
      )
      setDatosAPI(listAPI)
    }
  }, []);
  







  return (
    <div>
        <h1>Ultimos 15 terremotos registrados</h1>
        {datosAPI}
    </div>
  )
}

export {
    Recientes
}