const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const db = require('../db');


//vizualizar de todos perfis de usuário
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



// Login de usuários
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const response = await fetch('http://localhost:3000/users/data');
    if (!response.ok) {
      throw new Error('Erro ao buscar os dados dos usuários');
    }
    const usersData = await response.json();
    const user = usersData.find(user => user.email === email && user.senha === senha);
    if (user) {
      const userToken = user.token;
      res.status(200).json({ success: true, redirectUrl: `/profile.html?token=${userToken}` });
    } else {
      res.status(401).json({ success: false, message: 'Autenticação falhou' });
    }
  } catch (error) {
    console.error('Erro:', error.message);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
});





// Editar perfil de usuário por token
router.put('/:token', (req, res) => {
  const token = req.params.token;
  const { nome, email, status, tipo, area_especializacao, senha } = req.body;
  if (!nome || !email || !status || !tipo || !area_especializacao || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }
  const query = `UPDATE users SET nome=?, email=?, status=?, tipo=?, area_especializacao=?, senha= ? WHERE token=?`;

  db.query(
    query,
    [nome, email, status, tipo, area_especializacao, senha, token],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Erro ao editar perfil do usuário.' });
      } else {
        res.json({ message: 'Perfil de usuário editado com sucesso.' });
      }
    }
  );
});


//deletar perfil pelo token
router.delete('/:token', (req, res) => {
  const userToken = req.params.token;
  const query = 'DELETE FROM users WHERE token = ?';

  db.query(query, [userToken], (err, result) => {
      if (err) {
          res.status(500).json({ error: 'Erro ao excluir o perfil do usuário.' });
      } else {
          res.json({ message: 'Perfil de usuário excluído com sucesso.' });
      }
  });
});



//cadastro de usuários
router.post('/signup', async (req, res) => {
  const { nome, email, senha, status, tipo, area_especializacao } = req.body;
  const query = 'INSERT INTO users (nome, email, senha, status, tipo, area_especializacao) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [nome, email, senha, status, tipo, area_especializacao], (err, result) => {
      if (err) {
          res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
      } else {
          res.json({ message: 'Usuário cadastrado com sucesso.' });
      }
  });
});



module.exports = router;

