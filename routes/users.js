// routes/users.js
const express = require('express');
const router = express.Router();

// Importe as funções de controle de usuário aqui
const { signup, login, updateUser, deleteUser } = require('../controllers/users');

router.post('/signup', signup);
router.post('/login', login);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
