//Hide Secrets
require('dotenv').config();
// console.log(process.env);



const express = require('express');
const app = express();
const port = 3000;

//init our body parsers 
app.use(express.urlencoded({extended:true}));


//init https module
const https = require('node:https');
//??
const {rawListeners} = require('node:process');


//Server status message
app.listen(port,() =>{
    console.log('Server listerning Port:' + port);
})

// Get main page
app.get('/', (req, res)=>{

    res.sendFile(__dirname + '/index.html')
})

// Main page POST 
app.post('/', (req, res) => {
    console.log('Server: Post Received')

    //GET: Parse:
    const city = req.body.cityName;
    //CONFIG
    //API Endpoints, Path, Parameters
    const endpoint = 'https://api.openweathermap.org/data/2.5/weather'
    const MY_API_KEY = process.env.WEATHER_API_KEY;
    const units =  'metric'
    //Final ENDPOINT
    let url = endpoint +'?q='+ city +'&units=' + units + '&appid=' + MY_API_KEY

    //Api Request
    https.get(url, (response)=>{
        for(let i=200; i<=300; i++){
            if(i == response.statusCode){
                console.log(response.statusCode)
                //
                response.on('data',(data)=>{
                    
                    //Parse Our Jsoin data to Js Object
                    let jObject = JSON.parse(data);
    
                    const temp = jObject.main.temp;
                    const humidity = jObject.main.humidity;
                    const description = jObject.weather[0].description;
                    
                    //Weather icon
                    const icon = jObject.weather[0].icon;
                    let imgUrl = 'http://openweathermap.org/img/wn/'+ icon +'@2x.png'
    
    
                
    
                    res.write('<h1>' + 'The Temputre in ' + city + ' is ' + temp + ' degress with ' + humidity + '% humidity'+ '</h1>')
                    res.write('<h2>'+'The weather is '+ description + '</h2>')
                    res.write('<img src=' + imgUrl + '>')
                    
    
                
                })
            }
        }
    
    })
    
})


