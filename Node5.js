var http=require('http');
var url=require('url');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
var cats = {};
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  	console.log('Connection opened successfully');
});

	var Cat = require('./models-cats.js');

	var silence = new Cat({ name: 'Silence' });
	console.log(silence.name);

	var fluffy = new Cat({ name: 'fluffy' });
	fluffy.speak();

	fluffy.save(function (err, fluffy) {
  		if (err) return console.error(err);
  		fluffy.speak();
	});

	
	Cat.find(function (err, kittens) {
  		if (err) return console.error(err);
  		//kittens = console.log(kittens);
  		cats = kittens;
	});

	//Cat.find({ name: /^Fluff/ }, callback);

var server=http.createServer(function(req,res){
    var pathname=url.parse(req.url).pathname;
    switch(pathname){
        case '/home':
            res.end('home');
        break;
        case '/kittens':
            res.end(JSON.stringify(cats));
        break;
        default:
            res.end('default');
        break;
    }

}).listen(8082);

console.log('Server running at http://127.0.0.1:8082/');
