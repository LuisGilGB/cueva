var mongoose = require('mongoose'),
	assert = require('assert');

var Salas = require('./models/salas-ensayo');

var url = 'mongodb://localhost:27017/cueva';
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
	console.log("Connected correctly to server");
	
	Salas.create({
		idSala: 'UserRandom2',
		tipoPregunta: 'texto',
		pregunta: 'Dime argo',
		respuesta: 'argo'
	}, function (err, sala) {
		if (err) throw err;
		console.log('Sala creada');
		console.log(sala);
		
		var id = sala._id;
		
		setTimeout(function () {
			Salas.findByIdAndUpdate(id, {
					$set: {
						pregunta: 'Pero argo en condisioneh, joío'
					}
				}, {
					new: true
				})
				.exec(function (err, sala) {
					if (err) throw err;
					console.log('Sala actualizada');
					console.log(sala);
					
					db.collection('salas').drop(function () {
						db.close()
					});
			});
		}, 3000);
	});
});