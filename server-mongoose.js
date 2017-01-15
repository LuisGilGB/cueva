var mongoose = require('mongoose'),
	assert = require('assert');

var Salas = require('./models/salas-ensayo');

var url = 'mongodb://localhost:27017/cueva';

mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('Connected correctly to server');
	
	var nuevaSala = Salas({
		idSala: 'UserRandom',
		tipoPregunta: 'texto',
		pregunta: 'Dime argo',
		respuesta: 'argo'
	});
	
	nuevaSala.save(function (err) {
		if (err) throw err;
		console.log('Sala creada');
		
		Salas.find({}, function (err, salas) {
			if (err) throw err;
			
			console.log(salas);
			db.collection('salas').drop(function () {
				db.close();
			});
		});
	});
});