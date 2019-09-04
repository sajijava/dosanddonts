
var Entity = require('./api/models/entityModel') //created model loading here
var bodyParser = require('body-parser')
var router = require('./api/routes/entityRouter')
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

router(app)

app.listen(port);

console.log('KYT RESTful API server started on: ' + port);
