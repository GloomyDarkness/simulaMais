# founds-simulator
Simulador de Fundos Imobiliários
## Descrição

O **Simulador de Fundos Imobiliários** é uma ferramenta interativa desenvolvida para ajudar investidores a calcular e visualizar o crescimento de seus investimentos em fundos imobiliários ao longo do tempo. Com ele, você pode inserir dados como o preço da cota, rendimento mensal, investimento mensal e prazo, e obter uma projeção detalhada dos seus ganhos, incluindo a possibilidade de reinvestir os dividendos.

## Funcionalidades

- **Cálculo de Investimento**: Insira o preço da cota, rendimento mensal, investimento mensal e prazo para calcular o total investido, total reinvestido e dividendos mensais.
- **Reinvestimento de Dividendos**: Opção para reinvestir automaticamente os dividendos ganhos e o saldo restante do investimento mensal.
- **Conversão de Prazo**: Alterna entre meses e anos para facilitar a entrada de dados.
- **Detalhamento Mensal**: Exibe uma tabela detalhada com o número de cotas, valor investido, reinvestimento e dividendos para cada mês.

## Como Usar

1. **Preencha os Campos**: Insira o preço da cota, último rendimento, investimento mensal e prazo desejado.
2. **Escolha o Prazo**: Utilize o botão para alternar entre meses e anos.
3. **Reinvestimento**: Marque a opção de reinvestir dividendos se desejar.
4. **Calcular**: Clique no botão "Calcular" para obter os resultados.
5. **Resultados**: Veja os resultados detalhados na seção de resultados, incluindo uma tabela com o detalhamento mensal.

## Exemplo de Uso

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simulador de Fundos Imobiliários</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="main-container">
        <h1>Simulador de Fundos Imobiliários</h1>
        <div class="form-container">
            <form id="simulator-form" onsubmit="event.preventDefault(); calcular();">
                <div class="input-container">
                    <div class="input-group">
                        <label>Preço da Cota:</label>
                        <input type="text" id="precoCota" placeholder="0,00" required>
                    </div>
                    <div class="input-group">
                        <label>Último Rendimento:</label>
                        <input type="text" id="ultimoRendimento" placeholder="0,00" required>
                    </div>
                    <div class="input-group">
                        <label>Investimento Mensal:</label>
                        <input type="text" id="investimentoMensal" placeholder="0,00" required>
                    </div>
                    <div class="input-group">
                        <label>Prazo:</label>
                        <div class="prazo-wrapper">
                            <input type="text" id="prazoMeses" placeholder="0" required min="1">
                            <button type="button" id="togglePrazo" class="toggle-button">Meses</button>
                        </div>
                    </div>
                </div>
                <div class="button-container">
                    <button type="submit">Calcular</button>
                </div>
                <div class="reinvestimento-container">
                    <input type="checkbox" id="usarReinvestimento" checked>
                    <label for="usarReinvestimento">Reinvestir dividendos ganhos e o que sobrar do investimento mensal</label>
                </div>
                <div id="error-message" class="error-message"></div>
            </form>
        </div>
        <div id="resultados">
            <h2>Resultados</h2>
            <div class="results-container">
                <div class="results-row">
                    <div class="result-item">
                        <div class="result-label">Prazo</div>
                        <div class="result-value">
                            <span id="prazoFinal">0</span> 
                            <span id="prazoFinalUnidade">Meses</span>
                        </div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Preço da Cota</div>
                        <div class="result-value"><span id="precoFinal">0.00</span></div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Último Rendimento</div>
                        <div class="result-value"><span id="rendimentoFinal">0.00</span></div>
                    </div>
                </div>
                <div class="results-row">
                    <div class="result-item">
                        <div class="result-label">Total Investido</div>
                        <div class="result-value" id="totalInvestido">R$ 0,00</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Total Reinvestido</div>
                        <div class="result-value" id="totalReinvestido">R$ 0,00</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Dividendos Mensais no Final</div>
                        <div class="result-value" id="dividendosMensais">R$ 0,00</div>
                    </div>
                </div>
            </div>
            <table id="detalhes-investimento">
                <thead>
                    <tr>
                        <th>Mês</th>
                        <th>Cotas</th>
                        <th>Valor Investido</th>
                        <th>Reinvestimento</th>
                        <th>Dividendo</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Detalhes do investimento serão inseridos aqui -->
                </tbody>
            </table>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

## Licença

Este projeto está licenciado sob a GNU Affero General Public License v3.0. Para mais detalhes, consulte o arquivo [LICENSE](./LICENSE).

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests para melhorias e correções.

## Contato

Para dúvidas ou sugestões, entre em contato pelo email: [seuemail@exemplo.com](mailto:seuemail@exemplo.com).
