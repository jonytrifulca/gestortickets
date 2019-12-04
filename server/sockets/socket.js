const { io } = require('../server');
//traemos el ticketControl
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    console.log('Usuario conectado');

    //cuando se conecta un usuario le mando el estado actual
    //es otra forma en lugar de hacerlo con el body on load de mas abajo
    //devuelvo el ultimo creado y los ultimos 4 asignados
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });


    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });



    //el cliente consulta el ticket actual
    client.on('actualTicket', (data, callback) => {
        let actual = ticketControl.getUltimoTicket();
        console.log("SERVER ", actual);

        callback({ //para el ack al cliente
            ticket: actual
        });
    });


    //el cliente crea un nuevo ticket
    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();
        //el siguiente ticket es ...
        console.log("SERVER ", siguiente);

        callback({ //para el ack al cliente
            ticket: siguiente
        });

        //client.broadcast.emit('siguienteTicket', data);

    });

    //un escritorio quiere atender un ticket, vamos , el siguiente ticket
    client.on('atenderTicket', (data, callback) => {

        console.log("peticion de atender ticket, proceso...", data);

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: "Necesario mandar escritorio atender"
            });
        }

        console.log("atender ticket, devuelv0000");
        //pillo el siguiente ticket para atender y lo devuelvo
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        console.log("atender ticket, devuelvo", atenderTicket);
        callback({ atenderTicket });

        //notificar cambios en la pantalla principal y ultimos 4
        //le envio un mensaje a todos los que escuchen 'ultimos4'
        console.log("atender ticket, notifico a todas las pantallas los ultimos 4");
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });

    });


});