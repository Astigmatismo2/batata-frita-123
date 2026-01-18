let caixaTexto = document.getElementById("Intestino Delgado");
const backendURL = 'https://batata-frita-123.onrender.com/mensagens';
//'https://batata-frita-123.onrender.com/mensagens'

caixaTexto.addEventListener('keypress', (evento) => {
    if (evento.key === 'Enter') {
        let mensagem = caixaTexto.value;
        caixaTexto.value = "";
        enviarMensagem(mensagem);
    }
});

function enviarMensagem(mensagem) {
    fetch(backendURL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
        body: JSON.stringify({ mensagem: mensagem })
    }).catch(error => {
        console.error('Erro ao enviar mensagem:', error);
    });
}

function receberMensagens() {
    fetch(backendURL)
    .then(response => response.json())
    .then(mensagens => {
        
        const chatDiv = document.getElementById("chat");
        chatDiv.innerHTML = "";

        /*mensagens.forEach(msg => {
            const p = document.createElement("p");
            p.textContent = msg.mensagem;
            chatDiv.appendChild(p);
        });*/

        for (let i = mensagens.length - 1; i >= 0; i--) {
            const p = document.createElement("p");
            p.textContent = mensagens[i].mensagem;
            chatDiv.appendChild(p);
        }

    }).catch(error => {
        console.error('Erro ao receber mensagens:', error);
    });
}

setInterval(receberMensagens, 1000);