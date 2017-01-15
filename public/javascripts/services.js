'use strict';

angular.module('cuevaApp')
	.constant('baseURL', 'http://localhost:3000/cueva')
	.service('salaFactory', ['$resource', 'baseURL', function ($resource, baseUrl) {
		
		this.mandarRespuesta = function () {
			return $resource('/:salaId/comprobarrespuesta/:respuesta')
		}
	}])