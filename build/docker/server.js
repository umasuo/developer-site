var path = require('path')
var express = require('express')
var app = express()

app.use(express.static('./'))

app.use('/', function ( req, res, next ) {
  res.sendfile(__dirname + '/index.html');
});

app.listen(3000, function () {
  console.log('web server started!')
})
