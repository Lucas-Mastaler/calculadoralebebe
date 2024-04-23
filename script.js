document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário padrão

    // Captura os valores dos campos de entrada
    var entrega = document.getElementById('entrega').value;
    var cep = document.getElementById('cep').value;
    var rural = document.getElementById('rural').checked;

    // Formata o CEP para o formato XXXXX-XXX
    cep = cep.replace(/\D/g, ''); // Remove caracteres não numéricos
    cep = cep.substring(0, 5) + '-' + cep.substring(5); // Insere o traço na posição correta

    // Calcula a quilometragem usando Google Maps
    var origem = '81030-230'; // Substitua 'CEP_ORIGEM' pelo CEP de origem
    calcularQuilometragem(origem, cep, function(quilometragem) {
        // Exibe os resultados
        document.getElementById('resultado').innerHTML = `
            <p>Entrega: ${entrega}</p>
            <p>CEP: ${cep}</p>
            <p>Região Rural: ${rural ? 'Sim' : 'Não'}</p>
            <p>Quilometragem: ${quilometragem}</p>
        `;
    });
});

function calcularQuilometragem(origem, destino, callback) {
    var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' + origem + '&destinations=' + destino + '&key=SUA_CHAVE_API';

    // Faz a requisição à API do Google Maps
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Verifica se a resposta é válida e se há distância disponível
            if (data.status === 'OK' && data.rows.length > 0 && data.rows[0].elements.length > 0 && data.rows[0].elements[0].status === 'OK') {
                var quilometragem = data.rows[0].elements[0].distance.text;
                callback(quilometragem);
            } else {
                console.error('Erro ao calcular a quilometragem:', data.error_message);
                callback('Erro');
            }
        })
        .catch(error => {
            console.error('Erro ao calcular a quilometragem:', error);
            callback('Erro');
        });
}
