const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
// in order for us to actually get the text that the user typed into the input, we have to do a little
// This is just the necessary code for us to be able
// to start parsing through the body of the post request.

app.use(bodyParser.urlencoded({
    extended: true
}));

const https = require('https');


/*
So now we're able to get dynamic data based on what the user typed into the input,
catch that data in our app.post, and then use that query to structure our URL and get the data for that particular location.
Now we've seen all aspects of our API in use, including authentication, including paths, including queries,
and we've been able to parse the JSON data we get back and send it over to the browser using our Express
and Node modules.
*/

app.get('/', function(req, res) {
    // res.send("Server is up ")
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

    const query = req.body.cityName;
    const apiKey = "0af10252dc10fb2291c6fe826fd0be47";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;

            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<p>The weather is Currently " + description + "</p>");
            res.write("<h1> The temperature in " + query + " is " + temp + " degree celcius.</h1>");
            res.write("<img src=" + imgURL + ">");
            res.send();

        })
    })
});




app.listen(3000, function() {
    console.log(`App listening at http://localhost:${3000}`);
});