let socket = io();

let searchParams = new URLSearchParams( window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('el escritorio es necesario')
}

let escritorio = searchParams.get('escritorio');
let label = $('small');

$('h1').text('Escritorio: '+escritorio)
console.log(escritorio)

$('button').on('click', function() {
    socket.emit('atender-turno',{escritorio:escritorio},(resp)=>{
        if(resp === 'No hay tickets'){
            label.text('No hay nadie a quien mas atender');
            alert(resp)
        }
        label.text(resp.numero);
    })
})

