const request = require("request");

const forecast = (latitute,longitute,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=504169dfe6a9f6f0b617400749922912&query='+latitute+','+longitute;

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location service');
        } else if (body.error) {
            callback('Error: '+body.error)
        } else {
            const current = body.current;
            const cecl = current.temperature;
            const feelsLike = current.feelslike;
            // console.log(current.weather_descriptions+'. It is currently '+ cecl + ' °C degree out. And there feels like '+feelsLike + '  °C degree out.');
            callback(undefined, {
                summary: `${current.weather_descriptions}. It is currently ${cecl}  degree  out. And there feels like ${feelsLike} degree out. And humidity is ${current.humidity}`
            })
        }
    })
}


module.exports = {
    forecast
}