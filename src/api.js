
async function formatearDate(date) {
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, '0');
  let day = String(date.getDate()).padStart(2, '0');
  let formattedDate = `${year}-${month}-${day}`;
  return formattedDate
}

let today = new Date();
let year = today.getFullYear();
let month = String(today.getMonth() + 1).padStart(2, '0');
let day = String(today.getDate()).padStart(2, '0');
let formattedDate = `${year}-${month}-${day}`;
let formattedDate_yesterday = `${year}-${month}-${day-1}`;



async function Last() {
  let latest = await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${formattedDate_yesterday}&endtime=${formattedDate}&limit=20`);
  latest = await latest.json();
  return (latest)
}


async function Detalle(id) {
  let detalle = await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?eventid=${id}&format=geojson`);
  detalle = await detalle.json();
  return (detalle)
}


async function Count() {
  let contador = await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/count?starttime=${formattedDate_yesterday}&endtime=${formattedDate}`);
  contador = await contador.json();
  return (contador)
}


async function FindDate(initial, final) {
  let finder = await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${initial}&endtime=${final}`);
  finder = await finder.json();
  return (finder)
}











export {
  formatearDate,
  Last,
  Detalle,
  Count,
  FindDate
}