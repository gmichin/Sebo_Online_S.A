// controllers/users.js
const db = require('../db'); // Importe a conexão com o banco de dados aqui

// Implemente as funções de controle de usuário aqui
//const signup = (req, res) => {
  // Implemente o registro de usuário aqui
//};
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
  const { nome, email, senha } = req.body;
  const hashedPassword = await bcrypt.hash(senha, 10); // 10 é o número de rounds de hash

  // Agora, você pode armazenar 'hashedPassword' no banco de dados
};

const login = (req, res) => {
  // Implemente a autenticação do usuário aqui
};

const updateUser = (req, res) => {
  // Implemente a edição do perfil do usuário aqui
};

const deleteUser = (req, res) => {
  // Implemente o soft delete do usuário aqui
};

module.exports = {
  signup,
  login,
  updateUser,
  deleteUser
};
