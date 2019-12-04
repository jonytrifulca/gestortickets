//logica para atender tickets

//establecer la comunicacion
var socket = io();

//pillo el escritorio en el que estoy
var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

$('h1').text("Escritorio " + escritorio);

var labelSmall = $('small');


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


//click en el boton atender nuevo ticket
$('button').on('click', function() {
    console.log("solicito ticket a atender");
    //le digo al servidor que quiero el siguiente ticket
    socket.emit('atenderTicket', { "escritorio": escritorio }, function(resp) {
        if (resp.atenderTicket === "No hay tickets")
            alert("Ya no hay tickets!!!");
        console.log("respuesta del server: ", resp.atenderTicket.numero);
        labelSmall.text(resp.atenderTicket.numero);
    });
});

//al iniciar esta pantallo miro cual es el ticket actual
/*$(document).ready(function() {
    console.log("consulto el ticket actual");
    //le digo al servidor que quiero el siguiente ticket
    socket.emit('actualTicket', null, function(resp) {
        console.log("respuesta del server: ", resp.ticket);
        labelSmall.text(resp.ticket);
    });
});*/