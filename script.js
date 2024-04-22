document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário padrão
    
    // Captura os valores dos campos de entrada
    var entrega = document.getElementById('entrega').value;
    var cep = document.getElementById('cep').value;
    var rural = document.getElementById('rural').checked;

    // Formata o CEP para o formato XXXXX-XXX
    cep = cep.replace(/\D/g, ''); // Remove caracteres não numéricos
    cep = cep.substring(0, 5) + '-' + cep.substring(5); // Insere o traço na posição correta

    // Exibe os resultados
    document.getElementById('resultado').innerHTML = `
        <p>Entrega: ${entrega}</p>
        <p>CEP: ${cep}</p>
        <p>Região Rural: ${rural ? 'Sim' : 'Não'}</p>
    `;
});
