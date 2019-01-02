const http = require('http');

const print = require('./print.js');

let printError = print.printError
let printMessage = print.printMessage

  function getData(city){

    let appid = "f26267ccbd411cfa7edd09523722422d"
    let meteo  =http.get (`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`, (res) => {
      // console.dir(res.statusCode);
      let body  = ""
      res.on("data", (chunk) => {body += chunk})
      res.on("end", () => {
        if (res.statusCode === 200) {
          try {
            let data_weather = JSON.parse(body);
            let sunrise = new Date (data_weather.sys.sunrise*1000);
            let sunset = new Date (data_weather.sys.sunset*1000);
            printMessage(city,data_weather.main.temp,data_weather.main.pressure,sunrise,sunset);
          } catch (e) {console.error(e.message);
          }
        } else {
          printError({message :`Impossible de recuperer les informations de ${city}
veuillez verifier l'orthographe si il y a un espace dans le nom du pays le mettre entre ""`});
        }
      });

    });
    meteo.on('error',printError)

  }

module.exports = {getData};
