const fs = require('fs');



class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero; //numero del ticket a atender
        this.escritorio = escritorio; //que escritorio lo va a atender
    }

}



class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = []; //tickets pendientes de atender
        this.ultimos4 = []; //ultimos 4 atendidos

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {
            this.reiniciarConteo();
        }

    }

    siguiente() {

        this.ultimo += 1;

        //si se genera un nuevo ticket se mete en el arreglo de los pendientes
        //no hay escritorio => null, aun pendiente
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${ this.ultimo }`;

    }

    getUltimoTicket() {
        return `Ticket ${ this.ultimo }`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    //el escritorio pasado atiende el siguiente ticket
    //lo saca de los pendientes y lo mete en los atendidos
    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        //traigo el numero del siguiente ticket
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); //lo saco del vector

        //ticket a atender, paso su numero y el escritorio
        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(atenderTicket); //lo agrego al inicio de los ultimos 4 atendidos

        if (this.ultimos4.length > 4) { //si llevo mas de 4 => saco el ultimo por la cola
            this.ultimos4.splice(-1, 1); // borra el último
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;

    }


    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = []; //vaciamos los tickets pendientes de atender
        this.ultimos4 = []; //ultimos 4 atendidos reiniciados

        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();

    }


    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets, //grabamos los tickets pendientes
            ultimos4: this.ultimos4 //grabamos los ultimos 4 k estan siendo atendidos
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }



}



module.exports = {
    TicketControl
}