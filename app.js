
const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));






app.get("/",  function(req, res){
res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res){


  const cityName =req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="+ cityName +"&appid=d58bbf3343bf7ea9376f675f3ac00ae2";

  https.get(url, function(response) {

      response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const wDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const image = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>the temprature in "+ cityName +" is " + temp + " degrees clusius </h1>");
            res.write("<h3>weather description is " + wDescription + "</h3>");
            res.write("<img src=" + image + ">");
            res.send();

   });

  });



});




app.listen(process.env.PORT || 3000, function(){
  console.log("app is active on port 3000");
});
