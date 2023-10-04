const express = require('express');
const router = express.Router();

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
  const { nome, email, senha } = req.body;
  const hashedPassword = await bcrypt.hash(senha, 10);
  res.send('Rota de cadastro do usuário');
});

router.post('/login', (req, res) => {
  // Implemente a autenticação do usuário aqui
  res.send('Rota de login do usuário');
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

