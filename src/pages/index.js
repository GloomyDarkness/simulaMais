import Head from 'next/head';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import { calcular, toggleYear, togglePrazoUnidade } from '../utils/simulator';
import { setupEventListeners } from '../utils/eventHandlers';

export default function Home() {
  const [usarReinvestimento, setUsarReinvestimento] = useState(true);

  useEffect(() => {
    window.toggleYear = toggleYear;
    window.togglePrazoUnidade = togglePrazoUnidade;
    setupEventListeners();
    // Remover a importação do script theme.js
    return () => {
      // cleanup if needed
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    calcular();
  };

  return (
    <>
      <Head>
        <title>Simula Mais</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <div id="navbar-container">
        <Navbar />
      </div>
      <div className="main-container">
        <h1>Simula Mais</h1>
        <div className="quick-tips">
          <h3>Como começar?</h3>
          <div className="tips-container">
            <div className="tip">
              <span className="tip-number">1</span>
              <p>Insira o valor atual da cota do FII que deseja investir</p>
            </div>
            <div className="tip">
              <span className="tip-number">2</span>
              <p>Digite o último rendimento distribuído por cota</p>
            </div>
            <div className="tip">
              <span className="tip-number">3</span>
              <p>Defina quanto pretende investir mensalmente</p>
            </div>
            <div className="tip">
              <span className="tip-number">4</span>
              <p>Escolha o período de investimento desejado</p>
            </div>
          </div>
        </div>
        <div className="form-container">
          <form id="simulator-form" onSubmit={handleSubmit}>
            <div className="input-container">
              <div className="input-group">
                <label>Preço da Cota:</label>
                <input type="text" id="precoCota" placeholder="0,00" required />
              </div>
              <div className="input-group">
                <label>Último Rendimento:</label>
                <input type="text" id="ultimoRendimento" placeholder="0,00" required />
              </div>
              <div className="input-group">
                <label>Investimento Mensal:</label>
                <input type="text" id="investimentoMensal" placeholder="0,00" required />
              </div>
              <div className="input-group">
                <label>Cotas Iniciais:</label>
                <input type="text" id="cotasIniciais" placeholder="0" />
              </div>
              <div className="input-group">
                <label>Prazo:</label>
                <div className="prazo-wrapper">
                  <input type="text" id="prazoMeses" placeholder="0" required />
                  <button 
                    type="button" 
                    id="togglePrazo" 
                    className="toggle-button"
                    onClick={togglePrazoUnidade}
                  >
                    Meses
                  </button>
                </div>
              </div>
            </div>
            <div className="button-container">
              <button type="submit">Calcular</button>
            </div>
            <div className="reinvestimento-container">
              <input 
                type="checkbox" 
                id="usarReinvestimento" 
                checked={usarReinvestimento}
                onChange={(e) => setUsarReinvestimento(e.target.checked)}
              />
              <label htmlFor="usarReinvestimento">Reinvestir dividendos ganhos e o que sobrar do investimento mensal</label>
            </div>
            <div id="error-message" className="error-message"></div>
          </form>
        </div>
        <div id="resultados">
          <h2>Resultados</h2>
          <div className="results-container">
            <div className="results-row">
              <div className="result-item left">
                <div className="result-label">Prazo</div>
                <div className="result-value">
                  <span id="prazoFinal">0</span>
                  <span id="prazoFinalUnidade"></span>
                </div>
              </div>
              <div className="result-item center">
                <div className="result-label">Pre��o da Cota</div>
                <div className="result-value"><span id="precoFinal">0.00</span></div>
              </div>
              <div className="result-item right">
                <div className="result-label">Último Rendimento</div>
                <div className="result-value"><span id="rendimentoFinal">0.00</span></div>
              </div>
            </div>
            <div className="results-row">
              <div className="result-item left">
                <div className="result-label">Total Investido</div>
                <div className="result-value" id="totalInvestido">R$ 0,00</div>
              </div>
              <div className="result-item center">
                <div className="result-label">Total Reinvestido</div>
                <div className="result-value" id="totalReinvestido">R$ 0,00</div>
              </div>
              <div className="result-item right">
                <div className="result-label">Dividendos Mensais no Final</div>
                <div className="result-value" id="dividendosMensais">R$ 0,00</div>
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
            <tbody></tbody>
          </table>
        </div>
        <div id="info-section" className="intro-section">
          <Carousel />
        </div>
      </div>
    </>
  );
}