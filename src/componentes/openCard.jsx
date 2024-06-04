import { useState, useRef, useEffect } from 'react'
import { Last, Detalle, Count } from '../api.js'


async function openCard(data) {

    let coor1 = data.geometry.coordinates[0]
    let coor2 = data.geometry.coordinates[1]

    let URLMapa = `https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d57627.40691107387!2d${coor1}!3d${coor2}!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2ses!4v1717443201040!5m2!1ses!2ses`

    const detalleCompleto = await Detalle(data.id)

    let detalleArray = [
      'Magnitud del seismo: ' + detalleCompleto.properties.mag,
      'Localizacion: ' + detalleCompleto.properties.place,
      'Riesgo de tsunami: ' + detalleCompleto.properties.tsunami,
      'Profundidad: ' + detalleCompleto.properties.products.origin[0].properties.depth,
      'Fecha: ' + detalleCompleto.properties.products.origin[0].properties.eventtime,
      URLMapa
    ]
    return detalleArray
}


export {
    openCard
}