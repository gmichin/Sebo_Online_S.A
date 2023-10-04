// routes/admin.js
const express = require('express');
const router = express.Router();

const db = require('../db');
router.get('/data', (req, res) => {
  const query = 'SELECT * FROM admin';

  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao obter dados do banco de dados.' });
    } else {
      res.json(result);
    }
  });
});

router.post('/signup', async(req, res) => {
  const { nome, email, senha } = req.body;
  const hashedPassword = await bcrypt.hash(senha, 10);
  res.send('Rota de cadastro');
});

router.post('/login', (req, res) => {
  // Implemente a autenticação do administrador aqui
  res.send('Rota de login do administrador');
});

router.get('/reports', (req, res) => {
  // Implemente a lógica para visualizar relatórios e estatísticas aqui
  res.send('Rota para visualizar relatórios e estatísticas');
});

router.get('/users', (req, res) => {
  // Implemente a lógica para visualizar a lista de usuários aqui
  res.send('Rota para visualizar a lista de usuários');
});

module.exports = router;
