var express = require('express');

var app = express();

app.use(express.static('public'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb');
var Schema = mongoose.Schema;

var AlarmSchema = new Schema({
  name:  String,
  phone: String,
  venmoId: Number,
  date: { type: Date, default: Date.now },
});

app.get('/', function(req, res){
	res.sendfile('public/index.html');
});

app.listen(80, function(){
	console.log('Serve is listening on port 80');
});

