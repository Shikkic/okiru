var express = require('express');

var app = express();

app.use(express.static('public'));

app.get('/', function(req, res){
	res.sendfile('public/index.html');
});

app.listen(80, function(){
	console.log('Serve is listening');
});

