var api = 'AIzaSyC6N0Y9WgslJ4dYYaHjbYtsibE2rZEsNgQ';
function initMap() {
    var latLng = {
    	lat: 19.462083,
    	lng: -99.244028
    };

    var map = new google.maps.Map(document.getElementById('mapa'), {
        'center': latLng,
        'zoom': 17
    });

    var contenido = '<h2>Mi casa</h2>'+
    				'<p>Ahí vivo todo el año</p>'+
    				'<p>Visitame!</p>';

    var informacion = new google.maps.InfoWindow({
    	content: contenido
    });

    var marker = new google.maps.Marker({
    	position:latLng,
    	map: map,
    	title: ' '
    });

    marker.addListener('click', function(){
    	informacion.open(map, marker);
    });
}

(function(){
	"use strict";
	var regalo = document.getElementById('regalo');

	document.addEventListener('DOMContentLoaded', function(){
		var nombre = document.getElementById('nombre');
		var apellido = document.getElementById('apellido');
		var email = document.getElementById('email');
		var pase_dia = document.getElementById('pase_dia');
		var pase_dosdias = document.getElementById('pase_dosdias');
		var pase_completo = document.getElementById('pase_completo');
		var calcular = document.getElementById('calcular');
		var errorDiv = document.getElementById('error');
		var botonRegistro = document.getElementById('btnRegistro');
		var lista_productos = document.getElementById('lista_productos');
		var suma = document.getElementById('suma_total');
		var etiquetas = document.getElementById('etiquetas');
		var camisas = document.getElementById('camisa_evento');

		calcular.addEventListener('click', calcularMontos);
		pase_dia.addEventListener('blur', mostrarDias);
		pase_dosdias.addEventListener('blur', mostrarDias);
		pase_completo.addEventListener('blur', mostrarDias);
		nombre.addEventListener('blur', validarCampos);
		apellido.addEventListener('blur', validarCampos);
		email.addEventListener('blur', validarCampos);
		email.addEventListener('blur', validarMail);

		function validarCampos() {
			if (this.value == '') {
				errorDiv.style.display = 'block';
				errorDiv.innerHTML = "Este campo es obligatorio";
				this.style.border = '1px solid red';
			} else {
				errorDiv.style.display = 'none';
				this.style.border = '1px solid #cccccc';
			}
		}

		function validarMail() {
			if (this.value.indexOf('@') > -1) {
				errorDiv.style.display = 'none';
				this.style.border = '1px solid #cccccc';
			} else {
				errorDiv.style.display = 'block';
				errorDiv.innerHTML = "Es necesario al menos un @";
				this.style.border = '1px solid red';
			}
		}

		function calcularMontos(event) {
			event.preventDefault();
			if (regalo.value === '') {
				alert('Debes elegir un regalo');
				regalo.focus();
			} else {
				var boletosDia = parseInt(pase_dia.value, 10) || 0,
					boletos2dias = parseInt(pase_dosdias.value, 10) || 0,
					boletoCompleto = parseInt(pase_completo.value, 10) || 0,
					cantCamisas = parseInt(camisas.value, 10) || 0,
					cantEtiquetas = parseInt(etiquetas.value, 10) || 0;
				var totalPagar = (boletosDia * 30) + (boletos2dias * 45) + (boletoCompleto * 50) + ((cantCamisas * 10) * 93) + (cantEtiquetas * 2);
				var listadoProductos = [];
				if (boletosDia >= 1) {
					listadoProductos.push(boletosDia + ' pases por día');
				}
				if (boletos2dias >= 1) {
					listadoProductos.push(boletos2dias + ' pases por 2 días');
				}
				if (boletoCompleto >= 1) {
					listadoProductos.push(boletoCompleto + ' pases por todos los días');
				}
				if (cantCamisas >= 1) {
					listadoProductos.push(cantCamisas + ' Camisas');
				}
				if (cantEtiquetas >= 1) {
					listadoProductos.push(cantEtiquetas + ' Etiquetas');
				}

				lista_productos.style.display = 'block';
				lista_productos.innerHTML = '';
				for (var i = 0; i < listadoProductos.length; i++) {
					lista_productos.innerHTML += listadoProductos[i] + '<br>';
				}

				suma.innerHTML = '$ ' + totalPagar.toFixed(2);
			}
		}

		function mostrarDias() {
			var boletosDia = parseInt(pase_dia.value, 10) || 0,
				boletos2dias = parseInt(pase_dosdias.value, 10) || 0,
				boletoCompleto = parseInt(pase_completo.value, 10) || 0;

			var diasElegidos = [];

			if (boletosDia > 0) {
				diasElegidos.push('viernes');
			}
			if (boletos2dias > 0) {
				diasElegidos.push('viernes','sabado');
			}
			if (boletoCompleto > 0) {
				diasElegidos.push('viernes','sabado','domingo');
			}
			for (var i = 0; i < diasElegidos.length; i++) {
				document.getElementById(diasElegidos[i]).style.display = 'block';
			}
		}
	});
})();

$(function(){
	$('.nombre-sitio').lettering();

	var windowHeight = $(window).height();
	var barraAltura = $('.barra').innerHeight();
	$(window).scroll(function(){
		var scroll = $(window).scrollTop();
		if (scroll > windowHeight) {
			$('.barra').addClass('fixed');
			$('body').css({'margin-top': barraAltura+'px'})
		} else {
			$('.barra').removeClass('fixed');
			$('body').css({'margin-top': '0px'})
		}
	});

	$('.menu-movil').on('click', function(){
		$('.navegacion-principal').slideToggle();
	});

	$('.programa-evento .info-curso:first').show();
	$('.menu-programa a:first').addClass('activo');
	$('.menu-programa a').on('click', function(){
		$('.menu-programa a').removeClass('activo');
		$(this).addClass('activo');
		$('.ocultar').hide();
		var enlace = $(this).attr('href');
		$(enlace).fadeIn(1000);
		return false;
	})

	$('.resumen-evento li:nth-child(1) p').animateNumber({number:6}, 1200);
	$('.resumen-evento li:nth-child(2) p').animateNumber({number:15}, 1200);
	$('.resumen-evento li:nth-child(3) p').animateNumber({number:3}, 1200);
	$('.resumen-evento li:nth-child(4) p').animateNumber({number:9}, 1200);

	$('.cuenta-regresiva').countdown('2017/12/10 09:00:00', function(event){
		$('#dias').html(event.strftime('%D'));
		$('#horas').html(event.strftime('%H'));
		$('#minutos').html(event.strftime('%M'));
		$('#segundos').html(event.strftime('%S'));
	});
});


