//*jshint esversion: 6 */

// ----------required packages---------//
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

// new instance of express
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const data = {
    //the members, status,merge_fields ---comes from mailChimp api
    'members': [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }],
  }
  var jsonData = JSON.stringify(data)

  // console.log(firstName, lastName, email);

  // NOTE: The API KEY BELOW HAS BEEN DISABLED ON MAILCHIMP
  //       AS THIS CODE WILL BE PUSHED TO PUBLIC GITHUB

  const url = "https://us20.api.mailchimp.com/3.0/lists/327a67278c";

  const options = {
    method: "POST",
    auth: "key:4a76dfa2eb23f71d1a9862d0ae11d07b-us20"
  }

  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      console.log(response.statusCode);
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();
});


app.post("/failure", function(req, res) {
  res.redirect("/");
});


/*
So this is; basically a dynamic port that Heroku will define on the go. So at any given point, it might decide to deploy your app to Port 3000 or 5000 or whatever it is on their local system.
So by changing our port to this, it'll allow us to work seamlessly with their system.
But the problem is that if we try to run this app now locally using localhost, then ur computer won't
know what this is all about because this process object is defined by Hiroku.
So what we can do here, if we want to run it, both testing locally as well as deploying to Hiroku,
if we want to do that simultaneously, then we can tell our app to listen on this port for Hiroku,
but also add an OR to tell it that you can listen on 3000 when we're running locally.
So by putting in this as the port, then our app will work both on Hiroku as well as our local system.
*/
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running in port 3000")
});


// Api Key
// 4a76dfa2eb23f71d1a9862d0ae11d07b-us20

// Unique id for Audience Newsletter : Audience ID (also known as List ID)
// That is going to help mailchimp identify the list that you want to put your subscribers into.
// 327a67278c
