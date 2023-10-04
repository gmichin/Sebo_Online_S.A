const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path'); // Importe o módulo 'path' para lidar com caminhos de arquivo

// Middleware para fazer o parsing do corpo das requisições
app.use(express.json());

// Configurar o middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota de página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rotas para usuários e admin
app.use('/users', require('./routes/users')); // Roteamento de usuários
app.use('/admin', require('./routes/admin')); // Roteamento de administradores

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
