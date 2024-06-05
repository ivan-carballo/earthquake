import { useState, useRef, useEffect } from 'react'
import { Last, Detalle, Count, NearbyCities } from '../api.js'
import { FormatearFecha } from './formatearFecha.jsx'



async function openCard(data) {

    const coor1 = data.geometry.coordinates[0]
    const coor2 = data.geometry.coordinates[1]

    const URLMapa = `https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d57627.40691107387!2d${coor1}!3d${coor2}!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2ses!4v1717443201040!5m2!1ses!2ses`

    const detalleCompleto = await Detalle(data.id)

    let fechaFormatter = await detalleCompleto.properties.products.origin[0].properties.eventtime
    fechaFormatter = await FormatearFecha(fechaFormatter)

    const detailID = detalleCompleto.id
    const detailUpdate = detalleCompleto.properties.updated
    const detailNet = detalleCompleto.properties.net

    const findCities = await NearbyCities(detailID, detailNet, detailUpdate)
    console.log(findCities)


    let detalleArray = [
      'Magnitud: ' + detalleCompleto.properties.mag,
      'Localizacion: ' + detalleCompleto.properties.place,
      'Riesgo de tsunami: ' + detalleCompleto.properties.tsunami,
      'Profundidad: ' + detalleCompleto.properties.products.origin[0].properties.depth,
      'Fecha: ' + fechaFormatter,
      URLMapa,
      findCities
    ]
    return detalleArray
}


export {
    openCard
}