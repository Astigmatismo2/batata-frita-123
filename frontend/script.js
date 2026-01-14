let caixaTexto = document.getElementById("Intestino Delgado");

caixaTexto.addEventListener('keypress', (evento) => {
    if (evento.key === 'Enter') {
        let nome = caixaTexto.value;
        console.log('O NOME DIGITADO FOI: ' + nome);
        caixaTexto.value = "";

        enviarNome(nome);
    }
});

function enviarNome(nom) {
    fetch('http://localhost:3000/alunos', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
        body: JSON.stringify({ nome: nom })
    });
}