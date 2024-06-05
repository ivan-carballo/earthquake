import { NearbyCities } from "../api"
import { Detalle } from "../api"




async function CiudadesAfectadas(data) {

    const details = await Detalle(data.id)

    const detailID = details.id
    const detailUpdate = details.properties.updated
    const detailNet = details.properties.net
  
    const findCities = await NearbyCities(detailID, detailNet, detailUpdate)

    return findCities
}




export {
    CiudadesAfectadas
}