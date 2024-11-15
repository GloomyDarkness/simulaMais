function calcularInvestimento(precoCota, investimentoMensal, rendimentoMensal, prazoMeses, usarReinvestimento, cotasIniciais = 0) {
    let totalInvestido = investimentoMensal * prazoMeses;
    let totalReinvestido = 0;
    let numCotas = cotasIniciais;
    let saldoAcumulado = 0;
    let dividendosMensais = 0;
    let detalhesInvestimento = [];

    for (let mes = 1; mes <= prazoMeses; mes++) {
        saldoAcumulado += investimentoMensal;

        let cotasCompradas = Math.floor(saldoAcumulado / precoCota);
        numCotas += cotasCompradas;
        
        let sobraInvestimento = saldoAcumulado - (cotasCompradas * precoCota);
        
        let dividendos = numCotas * rendimentoMensal;
        
        let reinvestimento = sobraInvestimento + dividendos;

        if (usarReinvestimento === "sim") {
            totalReinvestido += dividendos;
        }

        detalhesInvestimento.push({
            mes,
            cotas: numCotas,
            valorInvestido: investimentoMensal,
            reinvestimento: usarReinvestimento === "sim" ? reinvestimento : 0,
            dividendos: dividendos
        });

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
        detalhesInvestimento
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
    }, 3000);
}

function calcular() {
    const converterParaNumero = (valor) => {
        return parseFloat(valor.replace(',', '.'));
    };

    const precoCota = converterParaNumero(document.getElementById('precoCota').value);
    const rendimentoMensal = converterParaNumero(document.getElementById('ultimoRendimento').value);
    const investimentoMensal = converterParaNumero(document.getElementById('investimentoMensal').value);
    let prazoMeses = parseInt(document.getElementById('prazoMeses').value);
    const usarReinvestimento = document.getElementById('usarReinvestimento').checked ? "sim" : "nao";
    const cotasIniciais = parseInt(document.getElementById('cotasIniciais').value) || 0;

    if (isNaN(precoCota) || isNaN(rendimentoMensal) || isNaN(investimentoMensal) || isNaN(prazoMeses)) {
        alert('Por favor, insira valores válidos');
        return;
    }

    if (!isPrazoEmMeses) {
        prazoMeses = Math.round(parseFloat(prazoMeses.toString().replace(',', '.')) * 12);
    }

    if (prazoMeses <= 0) {
        mostrarErro('O prazo deve ser maior que zero');
        return;
    }

    document.getElementById('error-message').classList.remove('visible');

    const resultado = calcularInvestimento(precoCota, investimentoMensal, rendimentoMensal, prazoMeses, usarReinvestimento, cotasIniciais);

    document.getElementById('resultados').style.display = 'block';

    document.getElementById('prazoFinal').textContent = isPrazoEmMeses ? 
        prazoMeses : 
        (prazoMeses / 12).toFixed(1).replace('.', ',');
    document.getElementById('precoFinal').textContent = formatarMoeda(precoCota);
    document.getElementById('rendimentoFinal').textContent = formatarMoeda(rendimentoMensal);
    document.getElementById('totalInvestido').textContent = formatarMoeda(resultado.totalInvestido);
    document.getElementById('totalReinvestido').textContent = formatarMoeda(resultado.totalReinvestido);
    document.getElementById('dividendosMensais').textContent = formatarMoeda(resultado.dividendosMensais);

    document.querySelector('#detalhes-investimento tbody').innerHTML = '';

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

function formatarInput(event) {
    let valor = event.target.value.replace(/\D/g, '');
    valor = (parseFloat(valor) / 100).toFixed(2);
    valor = valor.replace('.', ',');
    if (valor === '0,00') valor = '';
    event.target.value = valor;
}

function validarNumero(event) {
    if (!/\d/.test(event.key) && 
        event.key !== 'Backspace' && 
        event.key !== 'Delete' && 
        event.key !== 'ArrowLeft' && 
        event.key !== 'ArrowRight') {
        event.preventDefault();
    }
}

function validarPrazo(event) {
    if (!isPrazoEmMeses) {
        if (!/[\d.,]/.test(event.key) && 
            event.key !== 'Backspace' && 
            event.key !== 'Delete' && 
            event.key !== 'ArrowLeft' && 
            event.key !== 'ArrowRight') {
            event.preventDefault();
        }
        
        if ((event.key === ',' || event.key === '.') && 
            event.target.value.includes(',')) {
            event.preventDefault();
        }
    } else {
        if (!/\d/.test(event.key) && 
            event.key !== 'Backspace' && 
            event.key !== 'Delete' && 
            event.key !== 'ArrowLeft' && 
            event.key !== 'ArrowRight') {
            event.preventDefault();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ['precoCota', 'ultimoRendimento', 'investimentoMensal'].forEach(id => {
        const input = document.getElementById(id);
        input.addEventListener('input', formatarInput);
        input.addEventListener('keydown', validarNumero);
    });

    const prazoInput = document.getElementById('prazoMeses');
    prazoInput.addEventListener('input', validarPrazo);
    prazoInput.addEventListener('keydown', validarNumero);

    const toggleButton = document.getElementById('togglePrazo');
    toggleButton.addEventListener('click', togglePrazoUnidade);

    const cotasIniciaisInput = document.getElementById('cotasIniciais');
    cotasIniciaisInput.addEventListener('keydown', validarNumero);

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});
