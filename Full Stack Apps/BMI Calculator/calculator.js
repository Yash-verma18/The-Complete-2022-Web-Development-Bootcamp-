const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(3000, function() {
  console.log(`App listening at http://localhost:${3000}`);
});

// ------------------------------------------------------------------------------

// ROUTE :  Home Page : Simple Calculator

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
  var result = num1 + num2;

  res.send("Addition of two numbers is " + result);

});

// ------------------------------------------------------------------------------

// ROUTE : 2nd Page : // BMI Calculator

app.get('/bmicalculator', function(req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", function(req, res) {

  var weights = parseFloat(req.body.weight);
  var heights = parseFloat(req.body.height);
  var result = Math.floor(weights/ (heights * heights));

  res.send("Your BMI is " + result);

});

// ------------------------------------------------------------------------------
