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

const adminData = [
  {
    "id": 1,
    "nome": "Admin",
    "email": "admin@example.com",
    "senha": "admin123",
    "data_inicio": "2023-01-01T03:00:00.000Z",
    "area_especializacao": "Tecnologia",
    "created_at": "2023-10-04T14:57:50.000Z",
    "updated_at": "2023-10-04T14:57:50.000Z"
  },
  {
    "id": 2,
    "nome": "Alice Admin",
    "email": "alice@example.com",
    "senha": "admin456",
    "data_inicio": "2022-06-15T03:00:00.000Z",
    "area_especializacao": "Marketing",
    "created_at": "2023-10-04T14:57:50.000Z",
    "updated_at": "2023-10-04T14:57:50.000Z"
  }
];
router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  console.log('Email:', email);
  console.log('Senha:', senha);
  const admin = adminData.find(admin => admin.email === email && admin.senha === senha);
  if (admin) {
    res.send('Autenticação bem-sucedida');
  } else {
    res.status(401).send('Autenticação falhou');
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
