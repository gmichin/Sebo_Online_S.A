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

const usersData = [
  {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@example.com",
    "senha": "senha123",
    "status": "ativo",
    "tipo": "comprador",
    "created_at": "2023-10-04T14:57:50.000Z",
    "updated_at": "2023-10-04T14:57:50.000Z"
  },
  {
    "id": 2,
    "nome": "Maria Santos",
    "email": "maria@example.com",
    "senha": "senha456",
    "status": "ativo",
    "tipo": "vendedor",
    "created_at": "2023-10-04T14:57:50.000Z",
    "updated_at": "2023-10-04T14:57:50.000Z"
  },
  {
    "id": 3,
    "nome": "Admin",
    "email": "admin@example.com",
    "senha": "admin123",
    "status": "ativo",
    "tipo": "administrador",
    "created_at": "2023-10-04T14:57:50.000Z",
    "updated_at": "2023-10-04T14:57:50.000Z"
  }
];
router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  console.log('Email:', email);
  console.log('Senha:', senha);
  const user = usersData.find(user => user.email === email && user.senha === senha);
  if (user) {
    res.send('Autenticação bem-sucedida');
  } else {
    res.status(401).send('Autenticação falhou');
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

