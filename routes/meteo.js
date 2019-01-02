var express = require('express');
var router = express.Router();
var {getData } = require('../function')
// import { getData } from '../function'
/* GET users listing. */
router.post('/', function(req, res, next) {
  let city = req.body.City.trim().split(/\s+/)
  city ===" "  ? res.json('NULL'):
console.log(city);

  for (const item of city) {
    let result  = getData(item)
    console.log(result);
    res.render('result', {
      title: 'Meteo',
      country : item,
      result : result
    })
  
 }
 

});

module.exports = router;
