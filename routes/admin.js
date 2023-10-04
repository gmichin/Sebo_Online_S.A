const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

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
  res.send('Rota de cadastro');
});


router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  console.log('\n\nEmail:', email);
  console.log('Senha:', senha);

  try {
    const response = await fetch('http://localhost:3000/admin/data');
    if (!response.ok) {
      throw new Error('Erro ao buscar os dados dos administradores');
    }
    const adminData = await response.json();
    const admin = adminData.find(admin => admin.email === email && admin.senha === senha);
    if (admin) {
      res.send('Autenticação bem-sucedida');
    } else {
      res.status(401).send('Autenticação falhou');
    }
  } catch (error) {
    console.error('Erro:', error.message);
    res.status(500).send('Erro interno do servidor');
  }
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
