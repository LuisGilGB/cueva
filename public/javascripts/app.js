'use strict'

angular.module('cuevaApp', [])

    .controller('CuevaController', ['$scope', '$http', function($scope, $http) {
		$scope.claveIntroducida;
		$scope.claveSolicitada;
		$scope.currentAcertijo;
		$scope.resultado = '';
		$scope.isTexto = false;
		$scope.isPic = false;
		$scope.isAudio = false;
		
		$scope.currentIndex = 0;
		
		$scope.primerAcertijo = {
			"nombreSala": "Xenogearsifm",
			"tipoPregunta": "texto",
			"pregunta": "Primer color de banda por orden alfabético",
			"respuestas": [{
				"textoRespuesta": "Amarillo",
				"nombreDestino": "H-Samba"
			}]
		};
		
		$scope.acertijos = [{
			tipoPregunta: 'texto',
			pregunta: 'Todo camino empieza por uno',
			respuesta: 'paso'
		}, {
			tipoPregunta: 'texto',
			pregunta: 'Para la humanidad puede ser otra cosa',
			respuesta: 'salto'
		}, {
			tipoPregunta: 'imagen',
			pregunta: 'images/sombreropaja.jpg',
			respuesta: 'mugiwara'
		}, {
			tipoPregunta: 'texto',
			pregunta: 'Aquel en quien no puedes confiar',
			respuesta: 'putoflou'
		}, {
			tipoPregunta: 'audio',
			pregunta: 'audio/numelo8.mp3',
			respuesta: 'eructo'
		}, {
			tipoPregunta: 'imagen',
			pregunta: 'images/banderameta.jpg',
			respuesta: 'meta'
		}, {
			tipoPregunta: 'texto',
			pregunta: 'chao',
			respuesta: ':wave:'
		}];
		
		$scope.setNewAcertijo = function (acertijo) {
			if (acertijo.tipoPregunta === 'texto' || 'final' || 'siguiente') {
				$scope.isTexto = true;
				$scope.isPic = false;
				$scope.isAudio = false;
				$scope.acertijo = acertijo.pregunta;
				if (acertijo.tipoPregunta === 'final') {
					$scope.cleanAll();
					$scope.resultado = 'Enhorabuena, has salido de la cueva';
				}
			} else if (acertijo.tipoPregunta === 'imagen') {
				$scope.isTexto = false;
				$scope.isPic = true;
				$scope.isAudio = false;
				$scope.acertijoImagenUrl = acertijo.pregunta;
			} else if (acertijo.tipoPregunta === 'audio') {
				$scope.isTexto = false;
				$scope.isPic = false;
				$scope.isAudio = true;
				$scope.acertijoAudioUrl = acertijo.pregunta;
			} else {
				$scope.isTexto = false;
				$scope.isPic = false;
				$scope.isAudio = false;
			}
		}
		
		$scope.updateAcertijo = function () {
			$scope.setNewAcertijo($scope.currentAcertijo);
		}
		
		$scope.cleanAll = function () {
			angular.element('#cueva-form').remove();
		}
		
		$http({
			method: 'GET',
			url: '/cueva/empezarcueva'
		}).then(function successCallback (response) {
			$scope.currentAcertijo = response.data;
			$scope.updateAcertijo();
		}, function errorCallback (response) {
			$scope.cleanAll();
		});
		
		$scope.compruebaClave = function () {
			var serviceUrl;
			
			$scope.claveIntroducida ?
				serviceUrl = 'cueva/' + $scope.currentAcertijo._id + '/comprobarrespuesta/' + $scope.claveIntroducida :
				serviceUrl = 'cueva/' + $scope.currentAcertijo._id + '/comprobarrespuesta/noquierovaciosquierojajas'
			
			$http({
				method: 'GET',
				url: serviceUrl
			}).then(function successCallback (response) {
				if (response.data._id) {
					$scope.currentAcertijo = response.data;
					$scope.updateAcertijo();
					$scope.resultado = '';
				} else {
					$scope.resultado = 'Inténtelo de nuevo';
				}
				$scope.claveIntroducida = '';
			}, function errorCallback (response) {
				$scope.resultado = 'Inténtelo de nuevo';
				$scope.claveIntroducida = '';
			});
		}
    }]);