var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

var dboper = require('./operations');

var url = 'mongodb://localhost:27017/cueva';

MongoClient.connect(url, function (err, db) {
	assert.equal(null, err);
	console.log('Connected correctly to server');
	
	dboper.insertDocument(db, {
		tipoPregunta: 'texto',
		pregunta: 'Para la humanidad puede ser',
		respuesta: 'salto'
	}, 'salas', function (result) {
		console.log(result.ops);
		
		dboper.findDocuments(db, 'salas', function (docs) {
			console.log(docs);
			
			dboper.updateDocument(db,
								  { tipoPregunta: 'texto' },
								  { pregunta: 'Para la humanidad puede ser otra cosa' },
				'salas', function (result) {
					console.log(result.result);
				
					dboper.findDocuments(db, 'salas', function (docs) {
						console.log(docs);
						
						db.dropCollection('salas', function (result) {
							console.log(result);
							
							db.close();
						});
					});
				}
			)
		});
	});
});