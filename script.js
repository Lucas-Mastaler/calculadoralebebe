document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário padrão
    
    // Captura os valores dos campos de entrada
    var campo1 = document.getElementById('campo1').value;
    var campo2 = document.getElementById('campo2').value;

    // Processa os dados (aqui você pode fazer cálculos ou qualquer outra manipulação necessária)
    var resultado = parseInt(campo1) + parseInt(campo2);

    // Exibe os resultados
    document.getElementById('resultado').innerHTML = 'Resultado: ' + resultado;
});
