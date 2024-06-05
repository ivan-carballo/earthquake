import { NearbyCities } from "../api"
import { Detalle } from "../api"




async function CiudadesAfectadas(data) {

    const details = await Detalle(data.id)

    const detailID = details.id
    const detailUpdate = details.properties.updated
    const detailNet = details.properties.net
  
    const findCities = await NearbyCities(detailID, detailNet, detailUpdate)
    
    let datos

    if (findCities.length > 0) {
        
        datos = await findCities.map((data) =>
            <div className='div-cities' onClick={ async ()=>{}}>
                <p key={data.distance}>-{data.distance}Km - {data.name}</p>
            </div>
        )

    } else {
        datos = 'No hay datos de ciudades afectadas'
    }

    return datos
}




export {
    CiudadesAfectadas
}