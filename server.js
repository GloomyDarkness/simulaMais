const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Define o diretório estático para servir arquivos CSS, JS e HTML
app.use(express.static(path.join(__dirname, 'src')));

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/html/index.html'));
});

// Rota para a página de informações
app.get('/info', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/html/info.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});