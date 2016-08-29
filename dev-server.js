var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

// configure app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/'));
app.set('views', path.join(__dirname, '/'));
app.set('view engine', 'ejs');
require('./server/login/login')(app);
// routes
app.get('/*', function(req, res) {
  res.render('index.html');
});

// start
var port = process.env.PORT || 4600;

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});