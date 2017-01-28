var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var respuestaSchema = new Schema({
	textoRespuesta: {
		type: String
	},
	nombreDestino: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});

var salaSchema = new Schema({
	nombreSala: {
		type: String,
		unique: true,
		required: true
	},
	tipoPregunta: {
		type: String,
		required: true
	},
	pregunta: {
		type: String,
		required: true
	},
	respuestas: [respuestaSchema]
}, {
	timestamps: true
});

var Salas = mongoose.model('Sala', salaSchema);

module.exports = Salas;