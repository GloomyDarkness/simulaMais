import Head from 'next/head';
import Navbar from '../components/Navbar';

export default function Informacoes() {
  return (
    <>
      <Head>
        <title>Informações sobre o Simulador de Fundos Imobiliários</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div id="navbar-container">
        <Navbar />
      </div>
      <div className="main-container">
        <div className="info-container">
          <h1>
            Guia passo a passo para utilizar nossa calculadora de fundos
            imobiliários
          </h1>
          <p>
            Quer começar a investir, mas não sabe por onde começar? Fundos
            imobiliários podem ser uma excelente escolha. Com nossa calculadora,
            você pode planejar seus rendimentos e alcançar suas metas financeiras
            de forma prática e eficiente!
          </p>
          <ol>
            <li>Digite o valor atual de uma cota do fundo imobiliário;</li>
            <li>Informe o rendimento mensal por cota mais recente;</li>
            <li>Insira o valor que pretende aportar mensalmente no fundo;</li>
            <li>Defina o período de investimento desejado em meses ou anos;</li>
            <li>
              (Opcional) Adicione a quantidade de cotas que já possui nesse fundo;
            </li>
          </ol>
          <p>
            Depois de preencher as informações, clique em
            <strong>&quot;CALCULAR&quot;</strong> e veja os resultados detalhados!
          </p>

          <h2>Como funciona a calculadora de fundos imobiliários?</h2>
          <p>
            Nossa calculadora é uma ferramenta indispensável para quem deseja
            investir com confiança. Ela permite simular cenários diferentes para
            entender como seus investimentos podem evoluir ao longo do tempo.
          </p>
          <p>
            Uma das funcionalidades mais interessantes é a projeção de dividendos
            acumulados. Isso ajuda você a prever o retorno mensal que poderá
            alcançar e a criar um planejamento financeiro sólido e sustentável.
          </p>

          <h2>Exemplo prático utilizando a calculadora</h2>
          <p>
            Vamos imaginar que você decida investir R$ 500,00 por mês e reinvestir
            todos os dividendos recebidos ao longo de 4 anos, totalizando 48
            meses. O fundo imobiliário escolhido possui cotas a R$ 120,00 e paga
            um rendimento de R$ 1,20 por cota ao mês. No final do período, sua
            renda passiva em dividendos pode atingir R$ 430,00 mensais, livres de
            imposto de renda. Isso é o poder do planejamento bem executado!
          </p>

          <h2>Por que é essencial investir?</h2>
          <p>
            Investir é a melhor forma de garantir um futuro financeiro seguro e
            próspero. Ao invés de gastar tudo que ganha, investir permite que seu
            dinheiro trabalhe para você, aproveitando o impacto dos juros
            compostos para construir riqueza ao longo do tempo.
          </p>
          <p>
            Além disso, investimentos em fundos imobiliários oferecem a
            possibilidade de gerar renda passiva – uma renda que não exige esforço
            constante, ao contrário do salário tradicional. Essa é uma estratégia
            poderosa para alcançar liberdade financeira e realizar seus sonhos com
            maior tranquilidade.
          </p>

          <div className="disclaimer-section">
            <h2>Aviso Importante</h2>
            <div className="disclaimer-content">
              <div className="disclaimer-icon">⚠️</div>
              <p>
                Este simulador fornece projeções baseadas em dados atuais do
                mercado de fundos imobiliários. É fundamental compreender que:
              </p>
              <ul>
                <li>
                  Os resultados são estimativas e podem variar significativamente;
                </li>
                <li>
                  O mercado imobiliário está sujeito a flutuações e ciclos
                  econômicos;
                </li>
                <li>Rendimentos passados não garantem retornos futuros;</li>
                <li>
                  Diversos fatores externos podem impactar o desempenho dos
                  fundos;
                </li>
                <li>
                  Recomendamos fortemente a consulta a um especialista financeiro
                  para decisões de investimento.
                </li>
              </ul>
              <div className="disclaimer-highlight">
                <p>
                  💡 <strong>Dica:</strong> Use esta ferramenta como parte do seu
                  processo de análise, mas não como único critério de decisão.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}