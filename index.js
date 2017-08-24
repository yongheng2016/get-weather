#!/usr/bin/env node

var getip = require('./src/js/getip.js')
var  getcity= require('./src/js/getcity.js')
var  getweather= require('./src/js/getweather.js')
var colors = require('colors');
 
getip.ip(function (ip){
    getcity.getcity(ip,function (cityip){
      getweather.getweather(cityip, function (results){
        var a = JSON.parse(results).weather[0]
        var b = JSON.parse(results).weather
        console.log(' ')
        console.log('-------------------------------'.underline.red)
        console.log(' '+a.future[0].date, a.future[0].day)
        console.log('')
        console.log(' '+a.city_name, a.future[0].text, a.now.temperature+'℃')
        console.log('')
        console.log(' '+a.future[0].wind)
        console.log('')
        console.log(' '+'pm25: '+ a.now.air_quality.city.pm25)
        console.log('')
        console.log(' '+'最高温度：'+a.future[0].high + '℃', ' 最低温度：'+a.future[0].low + '℃')
        console.log('-------------------------------'.underline.red)
      }) 
  })
})



