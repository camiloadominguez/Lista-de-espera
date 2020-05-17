let socket = io();
let lblTicket1 = $('#lblTicket1');
let lblTicket2 = $('#lblTicket2');
let lblTicket3 = $('#lblTicket3');
let lblTicket4 = $('#lblTicket4');

let lblDesk2 = $('#lblEscritorio2');
let lblDesk1 = $('#lblEscritorio1');
let lblDesk3 = $('#lblEscritorio3');
let lblDesk4 = $('#lblEscritorio4');

let lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
let lblDesks = [lblDesk1, lblDesk2, lblDesk3, lblDesk4];

socket.on('ultimo-turno', (data)=>{
    // console.log(data);
    actualizaHTML(data.ultimos4);
});

socket.on('ultimos4',(ultimos4)=>{

    let audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaHTML(ultimos4.ultimos4);
})

function actualizaHTML(ultimos4){

    for(let i = 0;i<ultimos4.length; i++){
        lblTickets[i].text(`Ticket: ${ultimos4[i].numero}`);
        lblDesks[i].text('Escritorio '+ultimos4[i].escritorio);
    }
}