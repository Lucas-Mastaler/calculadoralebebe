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
    var origem = 'CEP_ORIGEM'; // Substitua 'CEP_ORIGEM' pelo CEP de origem
    calcularQuilometragem(origem, cep, function(quilometragem) {
        // Exibe os resultados
        document.getElementById('resultado').innerHTML = `
            <p>Entrega: ${entrega}</p>
            <p>CEP: ${cep}</p>
            <p>Região Rural: ${rural ? 'Sim' : 'Não'}</p>
            <p>Quilometragem: ${quilometragem} km</p>
        `;
    });
});

function calcularQuilometragem(origem, destino, callback) {
    var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' + origem + '&destinations=' + destino + 'AIzaSyAP4ZC1m9mvt_xg_pQZbPd8vnreoJk5XnY';

    // Faz a requisição à API do Google Maps
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Extrai a quilometragem da resposta
            var quilometragem = data.rows[0].elements[0].distance.text;
            callback(quilometragem);
        })
        .catch(error => {
            console.error('Erro ao calcular a quilometragem:', error);
            callback('Erro');
        });
}
