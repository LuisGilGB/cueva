'use strict'

angular.module('cuevaApp', ['ngSanitize'])

    .controller('CuevaController', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
		$scope.claveIntroducida;
		$scope.claveSolicitada;
		$scope.currentAcertijo;
		$scope.nombreSala = '';
		$scope.resultado = '';
		$scope.isTexto = false;
		$scope.isPic = false;
		$scope.isAudio = false;
		$scope.isVideo = false;
		$scope.isIframe = false;
		$scope.isPuzzle = false;
		$scope.isBombay = false;
		$scope.isFinal = false;
		
		$scope.respuestaVideoFinalUrl = null;
		
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
			var urlAuxiliar = '';
			$scope.nombreSala = acertijo.nombreSala;
			if (acertijo.tipoPregunta === 'texto' || acertijo.tipoPregunta === 'final' || acertijo.tipoPregunta === 'siguiente') {
				$scope.isTexto = true;
				$scope.isPic = false;
				$scope.isAudio = false;
				$scope.isVideo = false;
				$scope.isIframe = false;
				$scope.isPuzzle = false;
				$scope.isBombay = false;
				
				if (acertijo.tipoPregunta === 'final') {
					$scope.cleanAll();
					urlAuxiliar = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + acertijo.pregunta + '" frameborder="0" allowfullscreen></iframe>';
					$scope.respuestaVideoFinalUrl = $sce.trustAsHtml(urlAuxiliar);
					$scope.isFinal = true;
					$scope.resultado = 'Enhorabuena, has salido de la cueva';
				} else {
					$scope.acertijo = acertijo.pregunta;
				}
			} else if (acertijo.tipoPregunta === 'imagen') {
				$scope.isTexto = false;
				$scope.isPic = true;
				$scope.isAudio = false;
				$scope.isVideo = false;
				$scope.isIframe = false;
				$scope.isPuzzle = false;
				$scope.isBombay = false;
				$scope.acertijoImagenUrl = acertijo.pregunta;
			} else if (acertijo.tipoPregunta === 'audio') {
				$scope.isTexto = false;
				$scope.isPic = false;
				$scope.isAudio = true;
				$scope.isVideo = false;
				$scope.isIframe = false;
				$scope.isPuzzle = false;
				$scope.isBombay = false;
				//$scope.acertijoAudioUrl = acertijo.pregunta;
				urlAuxiliar = '<object width="148" height="44"><param name="movie" value="http://vocaroo.com/player.swf?playMediaID=' + acertijo.pregunta + '&autoplay=0"></param><param name="wmode" value="transparent"></param><embed src="http://vocaroo.com/player.swf?playMediaID=' + acertijo.pregunta + '&autoplay=0" width="148" height="44" wmode="transparent" type="application/x-shockwave-flash"></embed></object>';
				
				$scope.acertijoAudioUrl = $sce.trustAsHtml(urlAuxiliar);
			} else if (acertijo.tipoPregunta === 'video') {
				$scope.isTexto = false;
				$scope.isPic = false;
				$scope.isAudio = false;
				$scope.isVideo = true;
				$scope.isIframe = false;
				$scope.isPuzzle = false;
				$scope.isBombay = false;
				urlAuxiliar = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + acertijo.pregunta + '" frameborder="0" allowfullscreen></iframe>';
				
				$scope.acertijoVideoUrl = $sce.trustAsHtml(urlAuxiliar);
			} else if (acertijo.tipoPregunta === 'picross') {
				$scope.isTexto = false;
				$scope.isPic = false;
				$scope.isAudio = false;
				$scope.isVideo = false;
				$scope.isIframe = true;
				$scope.isPuzzle = false;
				$scope.isBombay = false;
				urlAuxiliar = '<iframe width="750" height="750" src="' + acertijo.pregunta + '"></iframe>';
				
				$scope.acertijoIframeUrl = $sce.trustAsHtml(urlAuxiliar);
			} else if (acertijo.tipoPregunta === 'puzzle') {
				$scope.isTexto = false;
				$scope.isPic = false;
				$scope.isAudio = false;
				$scope.isVideo = false;
				$scope.isIframe = false;
				$scope.isPuzzle = true;
				$scope.isBombay = false;
				urlAuxiliar = '<br><center><a href="http://www.flash-gear.com/index.php?puz"><img src="http://www.flash-gear.com/puz1.gif"></a><br><EMBED allowScriptAccess="always" allowNetworking="all" src="' + acertijo.pregunta + '" quality=high wmode=transparent scale=noscale salign=LT bgcolor="FFFFFF" WIDTH="' + acertijo.width + '" HEIGHT="' + acertijo.height + '" NAME="' + acertijo.puzName + '" ALIGN="" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer" /><BR><a href="http://www.flash-gear.com/index.php?puz"><img src="http://www.flash-gear.com/puz2.gif"><br><b><font face="Verdana"><h5>provided by flash-gear.com</h5></font></b></a><br></center><br>';
				
				$scope.acertijoPuzzleUrl = $sce.trustAsHtml(urlAuxiliar);
			} else if (acertijo.tipoPregunta === 'bombay') {
				$scope.isTexto = false;
				$scope.isPic = false;
				$scope.isAudio = false;
				$scope.isVideo = false;
				$scope.isIframe = false;
				$scope.isPuzzle = false;
				$scope.isBombay = true;
				urlAuxiliar = '<div style="background-color:#ddd;margin-left:auto;margin-right:auto;-moz-border-radius:7px;border-radius:7px;width: 400px;"><object id="agence-communication" quality="high" data="https://www.grapheine.com/bombaytv/bt.swf?code=' + acertijo.pregunta + '" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" height="370" width="400"><param name="movie" value="https://www.grapheine.com/bombaytv/bt.swf?code=' + acertijo.pregunta + '"><param name="quality" value="high"></param><param name="allowScriptAccess" value="always"></param></object></div>';
				
				$scope.acertijoBombayUrl = $sce.trustAsHtml(urlAuxiliar);
			} else {
				$scope.isTexto = false;
				$scope.isPic = false;
				$scope.isAudio = false;
				$scope.isVideo = false;
				$scope.isIframe = false;
				$scope.isBombay = false;
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
