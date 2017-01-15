var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var salaSchema = new Schema({
	idSala: {
		type: String,
		required: true,
		unique: true
	},
	tipoPregunta: {
		type: String,
		required: true
	},
	pregunta: {
		type: String,
		required: true
	},
	respuesta: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});

var Salas = mongoose.model('Sala', salaSchema);

module.exports = Salas;