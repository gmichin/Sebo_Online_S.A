const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const db = require('../db');
router.get('/data', (req, res) => {
  const query = 'SELECT * FROM users';

  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao obter dados do banco de dados.' });
    } else {
      res.json(result);
    }
  });
});

router.post('/signup', async(req, res) => {
  res.send('Rota de cadastro do usuário');
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  console.log('\n\nEmail:', email);
  console.log('Senha:', senha);

  try {
    const response = await fetch('http://localhost:3000/users/data');
    if (!response.ok) {
      throw new Error('Erro ao buscar os dados dos usuários');
    }
    const usersData = await response.json();
    const user = usersData.find(user => user.email === email && user.senha === senha);
    if (user) {
      res.send('Autenticação bem-sucedida');
    } else {
      res.status(401).send('Autenticação falhou');
    }
  } catch (error) {
    console.error('Erro:', error.message);
    res.status(500).send('Erro interno do servidor');
  }
});

router.put('/:id', (req, res) => {
  /// Implemente a edição do perfil do usuário aqui
  res.send('Rota de edição de usuários');
});

router.delete('/:id', (req, res) => {
  // Implemente o soft delete do usuário aqui
  res.send('Rota de soft delete de usuários');
});

module.exports = router;

