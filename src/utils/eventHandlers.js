import { formatCurrency } from './simulator';

export const setupEventListeners = () => {
    const currencyInputs = ['precoCota', 'ultimoRendimento', 'investimentoMensal'];
    
    currencyInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value === '') {
                    e.target.value = '';
                    return;
                }
                value = (parseFloat(value) / 100).toFixed(2);
                e.target.value = formatCurrency(parseFloat(value));
            });
        }
    });
};