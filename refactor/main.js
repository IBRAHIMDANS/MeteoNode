 const fs = require('fs');
 const  Weather = require('./weatherv3.js');

let file = process.argv.slice(2)

for (var city in file) {
  Weather.getData(file[city]);
}
