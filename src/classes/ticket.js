const fs = require('fs');

class TicketsPendientes {
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class Ticket {
    constructor(){
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];
        let data = require('../db/db.json');

        if(data.hoy == this.hoy){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        }else{
            this.reiniciarConteo();
        }
    }

    siguiente(){
        this.ultimo += 1;
        let ticketsPendientes = new TicketsPendientes(this.ultimo,null)
        this.tickets.push(ticketsPendientes); 

        this.grabarAchivo();

        return `Ticket ${this.ultimo}`
    }

    getUltimoTicket(){
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4(){
        return this.ultimos4;
    }
    atenderTicket(escritorio){
        if(this.tickets.length == 0){
            return 'No hay tickets';
        }
        let numeroTicket = this.tickets.shift();

        let ticketsPendientes = new TicketsPendientes(numeroTicket.numero, escritorio);
        this.ultimos4.unshift(ticketsPendientes);

        if(this.ultimos4.length>4){
            this.ultimos4.pop();
        }
        console.log('ultimos 4: ', this.ultimos4);

        this.grabarAchivo();
        return ticketsPendientes;
        
    }

    reiniciarConteo(){
        this.ultimo=0;   
        this.tickets = [ ];
        this.ultimos4 = [ ];
        console.log('Se ha inicializado el sistema');
        this.grabarAchivo();
    }

    grabarAchivo(){
        let jsonData = {
            ultimo:this.ultimo,
            hoy:this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
        let jsonDataString = JSON.stringify(jsonData,null,'\t');
        fs.writeFileSync('./src/db/db.json', jsonDataString);

    }
}

module.exports = {
    Ticket
}