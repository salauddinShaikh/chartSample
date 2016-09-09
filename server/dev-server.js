var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

var chartData=require('./data/chartData');
// configure app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + '../'));
app.use('/dist', express.static(__dirname + '/../dist'));
app.use('/assets', express.static(__dirname + '/../assets'));
app.use('/node_modules', express.static(__dirname + '/../node_modules'));
app.set('views', path.join(__dirname, '../'));
app.set('view engine', 'ejs');

require('./login/login')(app);

app.post('/api/data', function(req, res) {
  res.send({data:chartData[req.body.chartName]});
});

app.get('/api/mapPlotting', function(req, res) {
  res.send({ ID: 1, Message: 'Hello From Server'});
});

app.get('/', function(req, res) {
  res.render('index.html');
});

var port = process.env.PORT || 4600;
app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});