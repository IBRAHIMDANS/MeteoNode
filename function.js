const axios = require('axios')

async function getData(city) {


    let appid = "f26267ccbd411cfa7edd09523722422d"

   return await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`)
        .then(function (response) {
            // handle success
             let dataWeater = response.data.sys
            let resp = {
                sunrise: hours(new Date(dataWeater.sunrise * 1000)),
                 sunset : hours(new Date(dataWeater.sunset * 1000)),
                 country : dataWeater.country,
                 temp : (response.data.main.temp - 273.15).toFixed(2),
                 humidity : response.data.main.pressure
            }

            // console.log(resp);
            return resp;
          })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });

       
}


// function printMessage(city, temp, humidity, sunrise, sunset) {
//     return (`A ${city}, la temperature est de ${(temp-273.15).toFixed(2)}° et l'humidité est de ${humidity} bars
//   le soleil se leve a ${hours(sunrise)} et se couche a ${hours(sunset)}`);
// }


function hours(date) {
    let hours = new Intl.DateTimeFormat('en-US', {
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    }).format(date);
    return hours
}

module.exports = {
    getData
}
