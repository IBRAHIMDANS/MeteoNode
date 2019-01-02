const http = require('http');
const fs = require('fs');
const print = require('./print.js');
const url = require('url');

let printError = print.printError
let printMessage = print.printMessage
const port = 8080
const host = "127.0.0.1"
const serv = http.createServer( (req,res) => {
    let q = url.parse(req.url,true);
    let keys = Object.keys(q.query);
    let values = Object.values(q.query);
    // console.log(values);
    // let donne = ""
    // for (let val in keys.length) {
    //   donne = values[val]
    // }
    fs.readFile("./index.html", (err, data) =>{
      if (err) {
        res.writeHead(404, {'Content-type' : 'text/html ; charset= utf-8'})
        res.end("<h1>Page not found</h1>")
      }
      res.writeHead(200, {'Content-type' : 'text/html ; charset= utf-8'})
        console.log(donne);
      res.end(data)

      function getData(city){

        let appid = "f26267ccbd411cfa7edd09523722422d"
        let meteo  =http.get (`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`, (res) => {
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

    })
  }).listen(port,() => {console.log(`Server running  at adress 127.0.0.1:8080`);})
