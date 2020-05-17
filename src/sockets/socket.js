const {io} = require('../index');
const {Ticket} = require('../classes/ticket');

const ticket = new Ticket();

io.on('connection',(client) => {
    client.on('siguiente-ticket',(data, callback)=>{
        let siguiente = ticket.siguiente();
        console.log('es siguiente ticket es:', siguiente);
        callback(siguiente);
    })

    client.emit('ultimo-turno', {
        ultimo:ticket.getUltimoTicket(),
        ultimos4: ticket.getUltimos4()
    });

    client.on('atender-turno',(data, callback)=>{
        if(!data.escritorio){
            return callback({
                err:true,
                message: ' el escritorio es necesario'
            })
        }
        let atenderTicket = ticket.atenderTicket(data.escritorio);
        callback(atenderTicket);

        client.broadcast.emit('ultimos4',{
            ultimos4:ticket.getUltimos4()
        });
    })
});