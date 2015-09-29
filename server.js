var http = require('http');
var express = require('express');
var cors = require('cors');
var app = express();
var jwt = require('express-jwt');
var dotenv = require('dotenv');
var cookieParser = require('cookie-parser');

// dotenv.load();

var authenticate = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID,
  getToken: function fromHeaderOrCookie(req) {
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if(req.cookies && req.cookies.id_token) {
      return req.cookies.id_token;
    }
    return null;
  }
});

app.configure(function () {

 // Request body parsing middleware should be above methodOverride
  app.use(express.bodyParser());
  app.use(express.urlencoded());
  app.use(express.json());

  app.use(cookieParser());

  app.use(cors());

  app.use(app.router);
});

app.use(express.static('.'));


app.get('/ping', function(req, res) {
  res.send(200, {text: "All good. You don't need to be authenticated to call this"});
});

app.get('/secured/ping', authenticate, function(req, res) {
  res.send(200, {text: "All good. You only get this message if you're authenticated"});
})

app.post('/secured/authorize-cookie', authenticate, function(req, res) {
  res.cookie('id_token', req.body.token, { expires: new Date(Date.now() + 36000), httpOnly: true });
  res.send(200, { message: 'Cookie set!' });
});

var port = process.env.PORT || 3001;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});
