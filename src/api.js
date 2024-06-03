

let today = new Date();
let year = today.getFullYear();
let month = String(today.getMonth() + 1).padStart(2, '0');
let day = String(today.getDate()).padStart(2, '0');
let formattedDate = `${year}-${month}-${day}`;
let formattedDate_yesterday = `${year}-${month}-${day-1}`;



async function Last(initial, final) {
  const latest = await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${formattedDate_yesterday}&endtime=${formattedDate}&limit=15`);
  const bebidas = await latest.json();
  return (bebidas)
}






export {
  Last
}