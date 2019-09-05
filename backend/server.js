
var Entity = require('./api/models/entityModel') //created model loading here
var bodyParser = require('body-parser')
var router = require('./api/routes/entityRouter')
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;



const winston = require('winston')
const consoleTransport = new winston.transports.Console()
const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)

function logRequest(req, res, next) {
    logger.info(req.url)
    next()
}
app.use(logRequest)

function logError(err, req, res, next) {
    logger.error(err)
    next()
}
app.use(logError)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

router(app)

app.listen(port);

console.log('KYT RESTful API server started on: ' + port);
