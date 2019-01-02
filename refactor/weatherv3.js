const fs = require('fs');
const http = require('http');
const path = require('path');
const ejs = require('ejs');
const express = require('express');
const bodyParser = require("body-parser");
const session = require('express-session');
const print = require('./print.js');

const app = new express ()

const port = 8080
let printError = print.printError
let printMessage = print.printMessage

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use('js',express.static('../meteo_node'))
app.set('view engine', 'ejs');


app.set('trust proxy', 1)
app.use(session({
  secret: 'password',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.get(["/","/index"],(req,res)=> {
  const file = fs.readFileSync("./index.ejs")
  console.log(req.session.error);
  res.render(path.join(__dirname+'/index'))
})

app.post("/", (req,res)=> {
  let city = req.body.ville.split(" ")
// (req.body.ville=== undefined) || (req.body.ville === "") ? res.render("/404", { error : "Vous n'avez pas entrer de message "}):
  // console.log(city.slice(2));ust first proxy
  if (!req.body.ville) {
    req.session.error = 'il y a une erreur '
    res.redirect("/",301, { session : req.session.error });
  }
  req.session.error = undefined
    res.render(path.join(__dirname+'/res'),{data : getData(city) , session : req.session.error })

})

app.listen(port,() => {console.log(`Server running  at adress 127.0.0.1:${port}`);})


function getData(city){

  city.forEach(function(element) {

  let appid = "f26267ccbd411cfa7edd09523722422d"
  let meteo  =http.get (`http://api.openweathermap.org/data/2.5/weather?q=${element}&appid=${appid}`, (res) => {

    let body  = ""
    res.on("data", (chunk) => {body += chunk})
    res.on("end", () => {
      if (res.statusCode === 200) {
        try {
          let data_weather = JSON.parse(body);
          let sunrise = new Date (data_weather.sys.sunrise*1000);
          let sunset = new Date (data_weather.sys.sunset*1000);
           return printMessage(element,data_weather.main.temp,data_weather.main.humidity,sunrise,sunset);
        }
        catch (e) {console.error(e.message);
        }

      } else {
      return   printError({message :`Impossible de recuperer les informations de ${element}
veuillez verifier l'orthographe si il y a un espace dans le nom du pays le mettre entre ""`});
      }
    });

  });
  meteo.on('error',printError)
});

  }





module.exports = {getData};
