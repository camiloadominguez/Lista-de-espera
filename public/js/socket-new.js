//comando de conexion

let socket = io();

socket.on('connect',()=>{
    console.log('usuario conectado')
})

socket.on('disconnect',()=>{
    console.log('usuario desconectado');
})

socket.on('ultimo-turno', (turno)=>{
    document.getElementById('lblNuevoTicket').innerHTML = turno.ultimo;
})

document.getElementsByTagName('button')[0].addEventListener('click',()=>{
    socket.emit('siguiente-ticket',null, (siguienteTicket)=>{
        document.getElementById('lblNuevoTicket').innerHTML = siguienteTicket
    });
})
// $('button').on('click', function(){
//     socket.emit('siguiente-ticket')
// })