const express = require('express');
const app = express();
const port = 3000;

//init our body parsers 
app.use(express.urlencoded({extended:true}));


//init https module
const https = require('node:https');
const { rawListeners } = require('node:process');

//API Endpoints, Path, Parameters
const endpoint = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey= '7dd1119e4ccd073552353bdfd941b95f'
let lat = 29.951065
let lon = -90.071533
const units =  'metric'
//Endpoint
let url = endpoint + '?lat='+ lat + '&lon=' + lon + '&units=' + units + '&appid=' + apiKey






app.listen(port,() =>{
    console.log('Server listerning Port:' + port);
})


app.get('/', (req, res)=>{

    https.get(url, (response)=>{
        for(let i=200; i<=300; i++){
            if(i == response.statusCode){
                console.log(response.statusCode)
                response.on('data',(data)=>{
                    //Parse Our Jsoin data to Js Object
                    let jObject = JSON.parse(data);

                    const temp = jObject.main.temp;
                    const location = jObject.name;
                    const humidity = jObject.main.humidity;
                    const description = jObject.weather[0].description;
                    
                    //Weather icon
                    const icon = jObject.weather[0].icon;
                    let imgUrl = 'http://openweathermap.org/img/wn/'+ icon +'@2x.png'


                    // console.log('City: '+location);
                    // console.log('Temp: ' + temp);
                    // console.log('Humidity: '+ humidity);
                    // console.log('Description: '+ description);


                    res.write('<h1>' + 'The Temputre in ' + location + ' is ' + temp + ' degress with ' + humidity + '% humidity'+ '</h1>')
                    res.write('<h2>'+'The weather is '+ description + '</h2>')
                    res.write('<img src=' + imgUrl + '>')
                    res.send() 

                    
                })
            }
        }

    })
    

})