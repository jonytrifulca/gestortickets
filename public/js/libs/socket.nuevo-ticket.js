//logica para manejar nuevos tickets

//establecer la comunicacion
var socket = io();

var label = $('#lblNuevoTicket');

//evento de onconnect
//on disconnnect
//conexion
socket.on('connect', function() {
    console.log('frontend => conectado al servidor');
});

//desconexion
socket.on('disconnect', function() {
    console.log("frontend => perdimos conexion con server");
});

//click en el boton generar un nuevo ticket
$('button').on('click', function() {
    console.log("solicito nuevo ticket");
    //le digo al servidor que quiero el siguiente ticket
    socket.emit('siguienteTicket', null, function(resp) {
        console.log("respuesta del server: ", resp.ticket);
        label.text(resp.ticket);
    });
});

//al iniciar esta pantallo miro cual es el ticket actual
$(document).ready(function() {
    console.log("consulto el ticket actual");
    //le digo al servidor que quiero el siguiente ticket
    socket.emit('actualTicket', null, function(resp) {
        console.log("respuesta del server: ", resp.ticket);
        label.text(resp.ticket);
    });
});