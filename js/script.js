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
            const anos = parseFloat(input.value) / 12;
            input.value = Number.isInteger(anos) ? 
                anos.toString() : 
                anos.toFixed(1).replace('.', ',');
        }
    }
}

function formatarPrazo(prazoMeses) {
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

    return resultado || `0 meses`; // retorna "0 meses" se não houver prazo
}

function mostrarErro(mensagem) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = mensagem;
    errorDiv.classList.add('visible');
    setTimeout(() => {
        errorDiv.classList.remove('visible');
    }, 3000);
}

function getNumericValue(value) {
    if (!value || value.trim() === '') return 0;
    return parseFloat(value.replace(/[^\d,.-]/g, '').replace(',', '.')) || 0;
}

function formatCurrency(value) {
    if (isNaN(value) || value === null || value === undefined) return 'R$ 0,00';
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function calcular() {
    // Obter valores dos inputs usando a nova função getNumericValue
    const precoCota = getNumericValue(document.getElementById('precoCota').value);
    const ultimoRendimento = getNumericValue(document.getElementById('ultimoRendimento').value);
    const investimentoMensal = getNumericValue(document.getElementById('investimentoMensal').value);
    const cotasIniciais = getNumericValue(document.getElementById('cotasIniciais').value);
    let prazoMeses = getNumericValue(document.getElementById('prazoMeses').value);
    const usarReinvestimento = document.getElementById('usarReinvestimento').checked ? "sim" : "nao";

    // Validação básica
    if (precoCota <= 0 || ultimoRendimento <= 0 || investimentoMensal <= 0 || prazoMeses <= 0) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = 'Por favor, preencha todos os campos com valores válidos maiores que zero.';
        errorMessage.classList.add('visible');
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
}

// Adicionar função para voltar à seção informativa
function voltarParaInfo() {
    document.getElementById('resultados').style.display = 'none';
    document.getElementById('info-section').style.display = 'block';
}

function toggleYear(year) {
    const monthsWrapper = document.getElementById(`year-${year}`);
    const button = monthsWrapper.parentElement.parentElement.previousElementSibling.querySelector('.year-toggle');
    const icon = button.querySelector('.toggle-icon');
    
    if (monthsWrapper.style.display === 'none') {
        monthsWrapper.style.display = 'block';
        icon.textContent = '▼';
    } else {
        monthsWrapper.style.display = 'none';
        icon.textContent = '▶';
    }
}

// Adicionar listeners para formatar os inputs
const currencyInputs = ['precoCota', 'ultimoRendimento', 'investimentoMensal'];
currencyInputs.forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value === '') {
            e.target.value = '';
            return;
        }
        value = (parseFloat(value) / 100).toFixed(2);
        e.target.value = formatCurrency(parseFloat(value));
    });
});

// Adicionar listener para o input de cotas (apenas números inteiros)
document.getElementById('cotasIniciais').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    e.target.value = value;
});

// Adicionar listener para o input de prazo (apenas números inteiros)
document.getElementById('prazoMeses').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    e.target.value = value;
});

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

    // Adicionar botão para voltar no topo da seção de resultados
    const resultadosSection = document.getElementById('resultados');
    const backButton = document.createElement('button');
    backButton.innerHTML = '← Voltar';
    backButton.className = 'back-button';
    backButton.onclick = voltarParaInfo;
    resultadosSection.insertBefore(backButton, resultadosSection.firstChild);

    // Nova lógica do Carousel
    const carousel = document.querySelector('.carousel');
    const cards = document.querySelectorAll('.carousel-card');
    
    let currentIndex = 1; // Começa com o card do meio

    function rotateCards(direction) {
        if (direction === 'next' && currentIndex < cards.length - 1) {
            currentIndex++;
        } else if (direction === 'prev' && currentIndex > 0) {
            currentIndex--;
        }

        carousel.style.transform = `translateX(-${(currentIndex - 1) * (cardWidth + 24)}px)`;
    }

    // Adicionar click listeners nos cards
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (index < currentIndex) {
                rotateCards('prev');
            } else if (index > currentIndex) {
                rotateCards('next');
            }
        });
    });

    // Remover os event listeners antigos dos botões
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    if (prevBtn) prevBtn.remove();
    if (nextBtn) nextBtn.remove();

    // Initialize carousel
    updateCarouselMetrics();
});
