const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const db = require('../db');
const bcrypt = require('bcrypt');



//vizualizar de todos perfis de usuário
router.get('/dataUser', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao obter dados do banco de dados.' });
    } else {
      res.json(result);
    }
  });
});
//vizualizar de todos perfis de Admins
router.get('/dataAdmin', (req, res) => {
  const query = 'SELECT * FROM admin';
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao obter dados do banco de dados.' });
    } else {
      res.json(result);
    }
  });
});



const authenticate = async (url, email, senha) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Erro ao buscar os dados dos usuários');
    }
    const data = await response.json();
    const user = data.find(user => user.email === email);
    if (user && await bcrypt.compare(senha, user.senha)) {
      const userToken = user.token;
      return { success: true, redirectUrl: `/profile.html?token=${userToken}` };
    } else {
      return { success: false, message: 'Autenticação falhou' };
    }
  } catch (error) {
    console.error('Erro:', error.message);
    return { success: false, message: 'Erro interno do servidor' };
  }
};

// Rota de login de users ou admin
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  
  const userLoginResult = await authenticate('http://localhost:3000/path/dataUser', email, senha);
  if (userLoginResult.success) {
    res.status(200).json(userLoginResult);
  } else {
    const adminLoginResult = await authenticate('http://localhost:3000/path/dataAdmin', email, senha);
    if (adminLoginResult.success) {
      res.status(200).json(adminLoginResult);
    } else {
      res.status(401).json({ success: false, message: 'Autenticação falhou' });
    }
  }
});





router.put('/:tipo/:token', async (req, res) => {
  const token = req.params.token;
  const tipoURL = req.params.tipo;
  const { nome, email, status, tipo, area_especializacao, senha } = req.body;
  if (!nome || !email || !status || !tipo || !area_especializacao || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }
  
  try {
    const hashedPassword = await bcrypt.hash(senha, 10);
    let tableName;
    
    if (tipoURL === 'admin') {
      tableName = 'admin';
    } else {
      tableName = 'users';
    }

    const query = `UPDATE ${tableName} SET nome=?, email=?, status=?, tipo=?, area_especializacao=?, senha= ? WHERE token=?`;

    db.query(
      query,
      [nome, email, status, tipo, area_especializacao, hashedPassword, token],
      (err, result) => {
        if (err) {
          res.status(500).json({ error: `Erro ao editar perfil do ${tipo}.` });
        } else {
          res.json({ message: `Perfil de ${tipo} editado com sucesso.` });
        }
      }
    );
  } catch (error) {
    console.error('Erro:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});



router.delete('/:tipo/:token', (req, res) => {
  const userToken = req.params.token;
  const tipo  = req.params.tipo;

  let tableName;
  if (tipo === 'admin') {
    tableName = 'admin';
  } else if(tipo === 'users'){
    tableName = 'users';
  }

  const query = `DELETE FROM ${tableName} WHERE token = ?`;
  
  db.query(query, [userToken], (err, result) => {
    if (err) {
      res.status(500).json({ error: `Erro ao excluir o perfil do ${tipo}.` });
    } else {
      res.json({ message: `Perfil de ${tipo} excluído com sucesso.` });
    }
  });
});



//cadastro de admin ou users
router.post('/signup', async (req, res) => {
  const { nome, email, senha, status, tipo, area_especializacao } = req.body;
  const hashedPassword = await bcrypt.hash(senha, 10);

  let tableName;
  if (tipo === 'administrador') {
    tableName = 'admin';
  } else {
    tableName = 'users';
  }

  const query = `INSERT INTO ${tableName} (nome, email, senha, status, tipo, area_especializacao) VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(query, [nome, email, hashedPassword, status, tipo, area_especializacao], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao cadastrar usuário ou administrador.' });
    } else {
      res.json({ message: 'Usuário ou administrador cadastrado com sucesso.' });
    }
  });
});




module.exports = router;

