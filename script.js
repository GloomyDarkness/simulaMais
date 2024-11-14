function calcularInvestimento(precoCota, investimentoMensal, rendimentoMensal, prazoMeses, usarReinvestimento) {
    let totalInvestido = investimentoMensal * prazoMeses;
    let totalReinvestido = 0;
    let numCotas = 0;
    let saldoAcumulado = 0;
    let dividendosMensais = 0;
    let detalhesInvestimento = []; // Array para armazenar detalhes mensais

    for (let mes = 1; mes <= prazoMeses; mes++) {
        saldoAcumulado += investimentoMensal;

        let cotasCompradas = Math.floor(saldoAcumulado / precoCota);
        numCotas += cotasCompradas;
        
        // Calcula o valor que sobrou da compra de cotas
        let sobraInvestimento = saldoAcumulado - (cotasCompradas * precoCota);
        
        // Calcula dividendos com base no número de cotas atuais
        let dividendos = numCotas * rendimentoMensal;
        
        // Reinvestimento é a soma da sobra do investimento com os dividendos
        let reinvestimento = sobraInvestimento + dividendos;

        // Soma os dividendos ao total reinvestido se usarReinvestimento for "sim"
        if (usarReinvestimento === "sim") {
            totalReinvestido += dividendos;
        }

        // Armazena detalhes do mês atual
        detalhesInvestimento.push({
            mes,
            cotas: numCotas,
            valorInvestido: investimentoMensal,
            reinvestimento: usarReinvestimento === "sim" ? reinvestimento : 0,
            dividendos: dividendos
        });

        // Atualiza saldo para próximo mês
        saldoAcumulado = usarReinvestimento === "sim" ? reinvestimento : sobraInvestimento;

        if (mes === prazoMeses) {
            dividendosMensais = dividendos;
        }
    }

    return {
        ultimoRendimento: rendimentoMensal,
        totalInvestido: totalInvestido,
        totalReinvestido: usarReinvestimento === "sim" ? totalReinvestido : 0,
        dividendosMensais: dividendosMensais,
        detalhesInvestimento // Adiciona detalhes ao retorno
    };
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

let isPrazoEmMeses = true;

function togglePrazoUnidade() {
    const botao = document.getElementById('togglePrazo');
    const input = document.getElementById('prazoMeses');
    const prazoFinalLabel = document.getElementById('prazoFinalUnidade');
    
    isPrazoEmMeses = !isPrazoEmMeses;
    
    if (isPrazoEmMeses) {
        botao.textContent = 'Meses';
        prazoFinalLabel.textContent = 'Meses';
        if (input.value) {
            input.value = Math.round(parseFloat(input.value.replace(',', '.')) * 12);
        }
    } else {
        botao.textContent = 'Anos';
        prazoFinalLabel.textContent = 'Anos';
        if (input.value) {
            input.value = (parseFloat(input.value) / 12).toFixed(1).replace('.', ',');
        }
    }
}

function formatarPrazo(prazoMeses) {
    if (isPrazoEmMeses) {
        return `${prazoMeses} Meses`;
    } else {
        const anos = (prazoMeses / 12).toFixed(1).replace('.', ',');
        return `${anos} Anos`;
    }
}

function mostrarErro(mensagem) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = mensagem;
    errorDiv.classList.add('visible');
    setTimeout(() => {
        errorDiv.classList.remove('visible');
    }, 3000); // Remove a mensagem após 3 segundos
}

function calcular() {
    // Função para converter string em número, aceitando vírgula ou ponto
    const converterParaNumero = (valor) => {
        return parseFloat(valor.replace(',', '.'));
    };

    const precoCota = converterParaNumero(document.getElementById('precoCota').value);
    const rendimentoMensal = converterParaNumero(document.getElementById('ultimoRendimento').value);
    const investimentoMensal = converterParaNumero(document.getElementById('investimentoMensal').value);
    let prazoMeses = parseInt(document.getElementById('prazoMeses').value);
    const usarReinvestimento = document.getElementById('usarReinvestimento').checked ? "sim" : "nao";

    if (isNaN(precoCota) || isNaN(rendimentoMensal) || isNaN(investimentoMensal) || isNaN(prazoMeses)) {
        alert('Por favor, insira valores válidos');
        return;
    }

    if (!isPrazoEmMeses) {
        // Converte anos para meses, considerando decimais
        prazoMeses = Math.round(parseFloat(prazoMeses.toString().replace(',', '.')) * 12);
    }

    if (prazoMeses <= 0) {
        mostrarErro('O prazo deve ser maior que zero');
        return;
    }

    // Limpa mensagem de erro se cálculo for bem sucedido
    document.getElementById('error-message').classList.remove('visible');

    const resultado = calcularInvestimento(precoCota, investimentoMensal, rendimentoMensal, prazoMeses, usarReinvestimento);

    // Mostra o container de resultados
    document.getElementById('resultados').style.display = 'block';

    // Atualiza os resultados na página
    document.getElementById('prazoFinal').textContent = isPrazoEmMeses ? 
        prazoMeses : 
        (prazoMeses / 12).toFixed(1).replace('.', ',');
    document.getElementById('precoFinal').textContent = formatarMoeda(precoCota);
    document.getElementById('rendimentoFinal').textContent = formatarMoeda(rendimentoMensal);
    document.getElementById('totalInvestido').textContent = formatarMoeda(resultado.totalInvestido);
    document.getElementById('totalReinvestido').textContent = formatarMoeda(resultado.totalReinvestido);
    document.getElementById('dividendosMensais').textContent = formatarMoeda(resultado.dividendosMensais);

    document.querySelector('#detalhes-investimento tbody').innerHTML = '';

    // Atualiza a tabela com os detalhes mensais
    const tbody = document.querySelector('#detalhes-investimento tbody');
    tbody.innerHTML = '';
    
    resultado.detalhesInvestimento.forEach(detalhe => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${detalhe.mes}º mês</td>
            <td>${detalhe.cotas}</td>
            <td>${formatarMoeda(detalhe.valorInvestido)}</td>
            <td>${formatarMoeda(detalhe.reinvestimento)}</td>
            <td>${formatarMoeda(detalhe.dividendos)}</td>
        `;
    });
}

// Função para formatar input durante digitação
function formatarInput(event) {
    let valor = event.target.value.replace(/\D/g, ''); // Remove tudo que não é número
    
    // Converte para centavos e formata
    valor = (parseFloat(valor) / 100).toFixed(2);
    
    // Formata com vírgula
    valor = valor.replace('.', ',');
    
    // Adiciona zeros à esquerda se necessário
    if (valor === '0,00') valor = '';
    
    event.target.value = valor;
}

// Função para validar entrada de números
function validarNumero(event) {
    // Permite apenas números e teclas de controle
    if (!/\d/.test(event.key) && 
        event.key !== 'Backspace' && 
        event.key !== 'Delete' && 
        event.key !== 'ArrowLeft' && 
        event.key !== 'ArrowRight') {
        event.preventDefault();
    }
}

// Modificar a função validarPrazo para aceitar decimais em anos
function validarPrazo(event) {
    if (!isPrazoEmMeses) {
        // Permite números, vírgula e ponto para anos
        if (!/[\d.,]/.test(event.key) && 
            event.key !== 'Backspace' && 
            event.key !== 'Delete' && 
            event.key !== 'ArrowLeft' && 
            event.key !== 'ArrowRight') {
            event.preventDefault();
        }
        
        // Permite apenas uma vírgula ou ponto
        if ((event.key === ',' || event.key === '.') && 
            event.target.value.includes(',')) {
            event.preventDefault();
        }
    } else {
        // Em meses, permite apenas números inteiros
        if (!/\d/.test(event.key) && 
            event.key !== 'Backspace' && 
            event.key !== 'Delete' && 
            event.key !== 'ArrowLeft' && 
            event.key !== 'ArrowRight') {
            event.preventDefault();
        }
    }
}

// Adicionar eventos aos inputs
document.addEventListener('DOMContentLoaded', () => {
    ['precoCota', 'ultimoRendimento', 'investimentoMensal'].forEach(id => {
        const input = document.getElementById(id);
        input.addEventListener('input', formatarInput);
        input.addEventListener('keydown', validarNumero);
    });

    // Validação específica para o prazo
    const prazoInput = document.getElementById('prazoMeses');
    prazoInput.addEventListener('input', validarPrazo);
    prazoInput.addEventListener('keydown', validarNumero);

    // Adicionar evento para o botão toggle
    const toggleButton = document.getElementById('togglePrazo');
    toggleButton.addEventListener('click', togglePrazoUnidade);
});
