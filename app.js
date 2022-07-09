const express = require('express');
const app = express();
const port = 3000;

const https = require('node:https')

//API Endpoints, Path, Parameters
const endpoint = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey= '7dd1119e4ccd073552353bdfd941b95f'

let lat = 29.951065
let lon = -90.071533
const units =  'metric'

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
                    let jObject = JSON.parse(data);
                    const temp = jObject.main.temp;
                    const location = jObject.name;
                    const humidity = jObject.main.humidity;
                    console.log('City: '+location);
                    console.log('Temp: ' + temp);
                    console.log('Humidity: '+ humidity);
                    
                })
            }
        }

    })
    res.sendFile(__dirname+ '/index.html')

})