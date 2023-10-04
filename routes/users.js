// routes/users.js
const express = require('express');
const router = express.Router();

// Importe as funções de controle de usuário aqui
const { signup, login, updateUser, deleteUser } = require('../controllers/users');

router.post('/signup', signup);
router.post('/login', login);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

const db = require('../db'); // Importe a conexão com o banco de dados aqui
// Rota para obter dados dos usuários em formato JSON
router.get('/data', (req, res) => {
  const query = 'SELECT * FROM users'; // Query SQL para selecionar todos os usuários

  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao obter dados do banco de dados.' });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;

