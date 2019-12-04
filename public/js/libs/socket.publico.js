//logica para mostrar pantalla publica de tickets

//establecer la comunicacion
var socket = io();


var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');


var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

//creo dos vectores de asignacion
var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

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

//al conectarme recibo esto el ultimo creado y los ultimos 4 asignados
socket.on('estadoActual', function(data) {
    console.log("Conectamos al server y traemos la configuracion inicial");
    console.log(data);
    actualizarHtml(data.ultimos4);
});


//tb escucho el evento ultimos4 generado por el server cuando un escritorio
//se asigna un ticket
socket.on('ultimos4', function(data) {
    console.log("un escritorio se asigno un nuevo ticket => actualizamos");
    console.log(data.ultimos4);
    actualizarHtml(data.ultimos4);
    //reproducimos un audio
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
});

/**
 * Recibo un json con los ultimos 4 y lo pongo en la web
 * @param {*} ultimos4 
 */
function actualizarHtml(ultimos4) {
    for (let i = 0; i < ultimos4.length; i++) {
        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
    }
}