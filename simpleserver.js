var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

var url = 'mongodb://localhost:27017/cueva';

MongoClient.connect(url, function (err, db) {
	assert.equal(err, null);
	console.log('Connected correctly to server');
	
	var collection = db.collection('salas');
	collection.insertOne({
		tipoPregunta: 'texto',
		pregunta: 'Todo camino empieza por uno',
		respuesta: 'paso'
	}, function (err, result) {
		assert.equal(err,null);

		console.log("After Insert:");
		console.log(result.ops);

		collection.find({}).toArray(function(err, docs) {
			assert.equal(err, null);
			console.log('Found:');
			console.log(docs);

			db.dropCollection('salas', function (err, result) {
				assert.equal(err, null);
				db.close();
			});
		});
	});
	/*collection.insertOne({
		tipoPregunta: 'texto',
		pregunta: 'Para la humanidad puede ser otra cosa',
		respuesta: 'salto'
	});
	collection.insertOne({
		tipoPregunta: 'imagen',
		pregunta: 'images/sombreropaja.jpg',
		respuesta: 'mugiwara'
	});
	collection.insertOne({
		tipoPregunta: 'texto',
		pregunta: 'Aquel en quien no puedes confiar',
		respuesta: 'putoflou'
	});
	collection.insertOne({
		tipoPregunta: 'audio',
		pregunta: 'audio/numelo8.mp3',
		respuesta: 'eructo'
	});
	collection.insertOne({
		tipoPregunta: 'imagen',
		pregunta: 'images/banderameta.jpg',
		respuesta: 'meta'
	});
	collection.insertOne({
		tipoPregunta: 'texto',
		pregunta: 'chao',
		respuesta: ':wave:'
	});*/
});