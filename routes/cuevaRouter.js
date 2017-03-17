var express = require('express');
//var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');

var Salas = require('../models/salas');

var cuevaRouter = express.Router();
cuevaRouter.use(bodyParser.json());

var mensajeRespuestaIncorrecta = {
	data: 'Respuesta incorrecta'
}
var idOriginal = 'Xenogearsifm'

/*router.all('/', function(req, res, next) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	next();
});

router.get('/', function (req, res, next) {
	res.end('Toma cueva');
});*/

cuevaRouter.route('/renovarbasededatos/').all(function (req, res, oncontextmenu) {
	Salas.remove({}, function (err, resp) {
		if (err) throw err;
		fs.readFile('json/salas.json', 'utf-8', function (err, data) {
			var salas = JSON.parse(data);
			console.log(salas);
			Salas.create(salas, function (err, salas) {
				if (err) throw err;

				console.log('Sala creada');

				/*res.writeHead(200, {
					'Content-Type': 'application/'
				});*/
				res.json(salas);
			});
		});
	});
});

cuevaRouter.route('/administrador/').get(function (req, res, next) {
	Salas.find({}, function (err, sala) {
		//if (err) throw err;
		res.json(sala);
	});
})

.post(function (req, res, oncontextmenu) {
	Salas.create(req.body, function (err, sala) {
		//if (err) throw err;

		console.log('Sala creada');
		var nombreSala = sala.nombreSala;

		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		res.end('Añadida la sala de nombre ' + nombreSala);
	});
})

.delete(function (req, res, next) {
	Salas.remove({}, function (err, resp) {
		//if (err) throw err;
		res.json(resp);
	});
});

cuevaRouter.route('/empezarcueva/').get(function (req, res, next) {
	//console.log('HAZ PUTO ALGO')
	Salas.findOne({ 'nombreSala': 'Xenogearsifm' }, function (err, sala) {
		var primeraSala = {
			_id: sala._id,
			nombreSala: sala.nombreSala,
			tipoPregunta: sala.tipoPregunta,
			pregunta: sala.pregunta
		}
		//console.log('HAZLO PUTO JODER');
		//console.log(sala);
		res.json(primeraSala);
		//res.end('cosas');
	});
});

cuevaRouter.route('/:salaId/comprobarrespuesta/:respuesta').get(function (req, res, next) {
	var respuestaCorrecta;
	//Salas.find({ nombreSala: req.params.salaId }, function (err, sala) {
	Salas.findById(req.params.salaId, function (err, sala) {
		//if (err) throw err;
		var respuesta = req.params.respuesta;
		if (sala.tipoPregunta === 'siguiente') {
			Salas.findOne({ nombreSala: sala.respuestas[0].nombreDestino }, function (err, siguienteSala) {
				var salaTrucada = {
					_id: siguienteSala._id,
					nombreSala: siguienteSala.nombreSala,
					tipoPregunta: siguienteSala.tipoPregunta,
					pregunta: siguienteSala.pregunta,
					width: siguienteSala.width,
					height: siguienteSala.height,
					puzName: siguienteSala.puzName,
					videoFinal: siguienteSala.videoFinal
				}
				return res.json(salaTrucada);
			});
		}
		else {
			for (i = 0; i < sala.respuestas.length; i++) {
				if (respuesta.toUpperCase() === sala.respuestas[i].textoRespuesta.toUpperCase()) {
					respuestaCorrecta = sala.respuestas[i];
					break;
				}
			}
			if (!respuestaCorrecta) {
				return res.json(mensajeRespuestaIncorrecta);
			} else {
				Salas.findOne({ nombreSala: respuestaCorrecta.nombreDestino }, function (err, siguienteSala) {
					var salaTrucada = {
						_id: siguienteSala._id,
						nombreSala: siguienteSala.nombreSala,
						tipoPregunta: siguienteSala.tipoPregunta,
						pregunta: siguienteSala.pregunta,
						width: siguienteSala.width,
						height: siguienteSala.height,
						puzName: siguienteSala.puzName,
						videoFinal: siguienteSala.videoFinal
					}
					return res.json(salaTrucada);
				});
			}
		}
	});
});

cuevaRouter.route('/:salaId').get(function (req, res, next) {
	Salas.findById(req.params.salaId, function (err, sala) {
		//if (err) throw err;
		res.json(sala);
	});
});

cuevaRouter.route('/').get(function (req, res, next) {
	/*Salas.findOne({ nombreSala: idOriginal }, function (err, sala) {
		if (err) throw err;
		res.json(sala);
	});*/
	//res.writeHead(200, { 'Content-Type': 'text/html' });
	//res.end(fs.readFile('../public/index.html'));
	res.sendFile(path.resolve('public/index.html'));
});

module.exports = cuevaRouter;
