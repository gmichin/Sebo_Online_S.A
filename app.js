// app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para fazer o parsing do corpo das requisições
app.use(express.json());

// Rotas
app.use('/users', require('./routes/users')); // Roteamento de usuários
//app.use('/admin', require('./routes/admin')); // Roteamento de administradores

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
