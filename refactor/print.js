function printMessage(city,temp,humidity,sunrise,sunset){
return  (`A ${city}, la temperature est de ${(temp-273.15).toFixed(2)}° et l'humidité est de ${humidity} bars
  le soleil se leve a ${hours(sunrise)} et se couche a ${hours(sunset)}`);  ;
}

function printError(error){
  return error.message;
}
function hours(date){
let hours = new Intl.DateTimeFormat('en-US',{hour:"numeric",minute:"numeric",second:"numeric"}).format(date);
return hours
}
module.exports= {printError , printMessage, hours}
