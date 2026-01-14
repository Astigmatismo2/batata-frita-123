let caixaTexto = document.getElementById("Intestino Delgado");

caixaTexto.addEventListener('keypress', (evento) => {
    if (evento.key === 'Enter') {
        let mensagem = caixaTexto.value;
        caixaTexto.value = "";
        enviarMensagem(mensagem);
    }
});

function enviarMensagem(mensagem) {
    fetch('https://batata-frita-123.onrender.com/alunos', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
        body: JSON.stringify({ mensagem: mensagem })
    });
}

function receberMensagens() {
    fetch('https://batata-frita-123.onrender.com/alunos')
    .then(response => response.json())
    .then(mensagens => {
        
        const chatDiv = document.getElementById("chat");
        chatDiv.innerHTML = "";

        mensagens.forEach(msg => {
            const p = document.createElement("p");
            p.textContent = msg.mensagem;
            chatDiv.appendChild(p);
        });

    });
}

setInterval(receberMensagens, 1000);