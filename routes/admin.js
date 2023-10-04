// routes/admin.js
const express = require('express');
const router = express.Router();

// Rota de login do administrador
router.post('/login', (req, res) => {
  // Implemente a autenticação do administrador aqui
  res.send('Rota de login do administrador');
});

// Rota para visualizar relatórios e estatísticas
router.get('/reports', (req, res) => {
  // Implemente a lógica para visualizar relatórios e estatísticas aqui
  res.send('Rota para visualizar relatórios e estatísticas');
});

// Rota para visualizar a lista de usuários
router.get('/users', (req, res) => {
  // Implemente a lógica para visualizar a lista de usuários aqui
  res.send('Rota para visualizar a lista de usuários');
});

const db = require('../db'); // Importe a conexão com o banco de dados aqui
// Rota para obter dados dos administradores em formato JSON
router.get('/data', (req, res) => {
  const query = 'SELECT * FROM admin'; // Query SQL para selecionar todos os administradores

  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao obter dados do banco de dados.' });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
