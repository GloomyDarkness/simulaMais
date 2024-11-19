export let isPrazoEmMeses = true;

export const togglePrazoUnidade = () => {
    const botao = document.getElementById('togglePrazo');
    const input = document.getElementById('prazoMeses');
    const prazoFinalLabel = document.getElementById('prazoFinalUnidade');
    
    isPrazoEmMeses = !isPrazoEmMeses;
    
    if (isPrazoEmMeses) {
        botao.textContent = 'Meses';
        if (input.value) {
            const valor = parseFloat(input.value.replace(',', '.'));
            input.value = Math.round(valor * 12);
        }
    } else {
        botao.textContent = 'Anos';
        if (input.value) {
            const anos = parseFloat(input.value) / 12;
            input.value = Number.isInteger(anos) ? 
                anos.toString() : 
                anos.toFixed(1).replace('.', ',');
        }
    }

    if (prazoFinalLabel) {
        prazoFinalLabel.textContent = isPrazoEmMeses ? 'Meses' : 'Anos';
    }
};

export const getNumericValue = (value) => {
    if (!value || value.trim() === '') return 0;
    return parseFloat(value.replace(/[^\d,.-]/g, '').replace(',', '.')) || 0;
};

export const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export const formatCurrency = (value) => {
    if (isNaN(value) || value === null || value === undefined) return 'R$ 0,00';
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export const formatarPrazo = (prazoMeses) => {
    const anos = Math.floor(prazoMeses / 12);
    const meses = prazoMeses % 12;
    let resultado = '';

    if (anos > 0) {
        resultado += `${anos} ano${anos > 1 ? 's' : ''}`;
    }

    if (meses > 0) {
        if (anos > 0) {
            resultado += ' e ';
        }
        resultado += `${meses} mês${meses > 1 ? 'es' : ''}`;
    }

    return resultado || `0 meses`;
};

export const calcularInvestimento = (precoCota, investimentoMensal, rendimentoMensal, prazoMeses, usarReinvestimento, cotasIniciais = 0) => {
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
};

export const toggleYear = (year) => {
    const monthsWrapper = document.getElementById(`year-${year}`);
    if (!monthsWrapper) return;

    const button = monthsWrapper.parentElement.parentElement.previousElementSibling.querySelector('.year-toggle');
    const icon = button.querySelector('.toggle-icon');
    
    if (monthsWrapper.style.display === 'none') {
        monthsWrapper.style.display = 'block';
        icon.textContent = '▼';
    } else {
        monthsWrapper.style.display = 'none';
        icon.textContent = '▶';
    }
};

export const mostrarErro = (mensagem) => {
    const errorDiv = document.getElementById('error-message');
    if (!errorDiv) return;

    errorDiv.textContent = mensagem;
    errorDiv.classList.add('visible');
    setTimeout(() => {
        errorDiv.classList.remove('visible');
    }, 3000);
};

export const calcular = () => {
    // Obter valores dos inputs usando a nova função getNumericValue
    const precoCota = getNumericValue(document.getElementById('precoCota').value);
    const ultimoRendimento = getNumericValue(document.getElementById('ultimoRendimento').value);
    const investimentoMensal = getNumericValue(document.getElementById('investimentoMensal').value);
    const cotasIniciais = getNumericValue(document.getElementById('cotasIniciais').value);
    let prazoMeses = getNumericValue(document.getElementById('prazoMeses').value);
    const usarReinvestimento = document.getElementById('usarReinvestimento').checked ? "sim" : "nao";

    // Validação básica
    if (precoCota <= 0 || ultimoRendimento <= 0 || investimentoMensal <= 0 || prazoMeses <= 0) {
        mostrarErro('Por favor, preencha todos os campos com valores válidos maiores que zero.');
        return;
    }

    // Limpar mensagem de erro se tudo estiver OK
    document.getElementById('error-message').classList.remove('visible');

    if (!isPrazoEmMeses) {
        prazoMeses = Math.round(parseFloat(prazoMeses.toString().replace(',', '.')) * 12);
    }

    const resultado = calcularInvestimento(
        precoCota, 
        investimentoMensal, 
        ultimoRendimento, // Corrigido: usando ultimoRendimento em vez de rendimentoMensal
        prazoMeses, 
        usarReinvestimento, 
        cotasIniciais
    );

    // Ocultar seção informativa e mostrar resultados
    document.getElementById('info-section').style.display = 'none';
    document.getElementById('resultados').style.display = 'block';

    document.getElementById('prazoFinal').textContent = formatarPrazo(prazoMeses);
    document.getElementById('precoFinal').textContent = formatarMoeda(precoCota);
    document.getElementById('rendimentoFinal').textContent = formatarMoeda(ultimoRendimento);
    document.getElementById('totalInvestido').textContent = formatarMoeda(resultado.totalInvestido);
    document.getElementById('totalReinvestido').textContent = formatarMoeda(resultado.totalReinvestido);
    document.getElementById('dividendosMensais').textContent = formatarMoeda(resultado.dividendosMensais);

    document.querySelector('#detalhes-investimento tbody').innerHTML = '';

    const tbody = document.querySelector('#detalhes-investimento tbody');
    tbody.innerHTML = '';
    
    let currentYear = 1;
    let currentYearRows = [];
    
    resultado.detalhesInvestimento.forEach((detalhe, index) => {
        if (index > 0 && index % 12 === 0) {
            // Criar cabeçalho do ano
            const yearHeader = tbody.insertRow();
            yearHeader.innerHTML = `
                <td colspan="5" class="year-header">
                    <button class="year-toggle" onclick="toggleYear(${currentYear})">
                        <span class="toggle-icon">▼</span> ${currentYear}º Ano
                    </button>
                </td>
            `;
            
            // Criar container para os meses
            const monthsContainer = tbody.insertRow();
            monthsContainer.innerHTML = `
                <td colspan="5" class="months-container">
                    <div class="months-wrapper" id="year-${currentYear}">
                        ${currentYearRows.join('')}
                    </div>
                </td>
            `;
            
            currentYear++;
            currentYearRows = [];
        }
        
        const monthRow = `
            <div class="month-row">
                <span>${detalhe.mes}º mês</span>
                <span>${detalhe.cotas}</span>
                <span>${formatarMoeda(detalhe.valorInvestido)}</span>
                <span>${formatarMoeda(detalhe.reinvestimento)}</span>
                <span>${formatarMoeda(detalhe.dividendos)}</span>
            </div>
        `;
        currentYearRows.push(monthRow);
        
        // Adicionar últimos meses se for o final
        if (index === resultado.detalhesInvestimento.length - 1 && currentYearRows.length > 0) {
            const yearHeader = tbody.insertRow();
            yearHeader.innerHTML = `
                <td colspan="5" class="year-header">
                    <button class="year-toggle" onclick="toggleYear(${currentYear})">
                        <span class="toggle-icon">▼</span> ${currentYear}º Ano
                    </button>
                </td>
            `;
            
            const monthsContainer = tbody.insertRow();
            monthsContainer.innerHTML = `
                <td colspan="5" class="months-container">
                    <div class="months-wrapper" id="year-${currentYear}">
                        ${currentYearRows.join('')}
                    </div>
                </td>
            `;
        }
    });
};