// Função para atualizar a cotação em tempo real ao selecionar as moedas
async function atualizarCotacao() {
    // Obtém as moedas de origem e destino selecionadas
    const moedaOrigem = document.getElementById('moedaOrigem').value;
    const moedaDestino = document.getElementById('moedaDestino').value;

    // Verifica se as moedas são diferentes
    if (moedaOrigem === moedaDestino) {
        document.getElementById('resultado').innerText = 'Por favor, escolha moedas diferentes.';
        return;
    }

    // URL da API para obter a cotação
    const url = `https://api.exchangerate-api.com/v4/latest/${moedaOrigem}`;

    try {
        // Faz a chamada para a API
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro ao buscar a cotação.');
        }
        // Obtém os dados da resposta
        const data = await response.json();
        const taxa = data.rates[moedaDestino];
        // Exibe a cotação
        document.getElementById('resultado').innerText = `1 ${moedaOrigem} = ${taxa} ${moedaDestino}`;
    } catch (erro) {
        // Exibe uma mensagem de erro
        document.getElementById('resultado').innerText = `Erro: ${erro.message}`;
    }
}

// Função para converter o valor inserido pelo usuário
async function converterMoeda() {
    // Obtém o valor inserido pelo usuário e as moedas selecionadas
    const valor = parseFloat(document.getElementById('valor').value);
    const moedaOrigem = document.getElementById('moedaOrigem').value;
    const moedaDestino = document.getElementById('moedaDestino').value;

    // Verifica se o valor é válido e se as moedas são diferentes
    if (!valor || moedaOrigem === moedaDestino) {
        document.getElementById('resultado').innerText = 'Por favor, insira um valor válido e escolha moedas diferentes.';
        return;
    }

    // URL da API para obter a cotação
    const url = `https://api.exchangerate-api.com/v4/latest/${moedaOrigem}`;

    try {
        // Faz a chamada para a API
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro ao buscar a cotação.');
        }
        // Obtém os dados da resposta
        const data = await response.json();
        const taxa = data.rates[moedaDestino];
        const valorConvertido = (valor * taxa).toFixed(2);

        // Exibe o valor convertido
        document.getElementById('resultado').innerText = `${valor} ${moedaOrigem} = ${valorConvertido} ${moedaDestino}`;
    } catch (erro) {
        // Exibe uma mensagem de erro
        document.getElementById('resultado').innerText = `Erro: ${erro.message}`;
    }
}
