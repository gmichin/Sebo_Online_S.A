const express = require('express');
const router = express.Router();
const db = require('../db');

const bcrypt = require('bcrypt');

// Cadastro de usuários
router.post('/signup', (req, res) => {
    const { nome, email, senha, tipo } = req.body;
  
    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            console.error('Erro ao criptografar a senha:', err);
            return res.status(500).json({ error: 'Erro interno' });
        }
  
        const sql = 'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)';
        db.query(sql, [nome, email, hash, tipo], (err, result) => {
            if (err) {
                console.error('Erro ao cadastrar usuário:', err);
                return res.status(500).json({ error: 'Erro interno' });
            }
  
            console.log('Usuário cadastrado com sucesso');
            res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
        });
    });
});

// Autenticação (login)
router.post('/login', (req, res) => {
    const { email, senha } = req.body;

    const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
    db.query(sql, [email, senha], (err, result) => {
        if (err) {
            console.error('Erro ao autenticar usuário:', err);
            return res.status(500).json({ error: 'Erro interno' });
        }
  
        if (result.length === 0) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
  
        console.log('Usuário autenticado com sucesso');
        res.status(200).json({ message: 'Usuário autenticado com sucesso' });
    });
});

// Edição de perfil
router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const { nome, email } = req.body;
  
    const sql = 'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?';
    db.query(sql, [nome, email, userId], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar perfil do usuário:', err);
            return res.status(500).json({ error: 'Erro interno' });
        }
  
         console.log('Perfil do usuário atualizado com sucesso');
        res.status(200).json({ message: 'Perfil do usuário atualizado com sucesso' });
    });
});
  
// delete para desativar usuários
router.delete('/:id', (req, res) => {
    const userId = req.params.id;
  
    // Execute o soft delete do usuário no banco de dados
    const sql = 'UPDATE usuarios SET status = "inativo" WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error('Erro ao desativar usuário:', err);
            return res.status(500).json({ error: 'Erro interno' });
        }
  
        console.log('Usuário desativado com sucesso');
        res.status(200).json({ message: 'Usuário desativado com sucesso' });
    });
});
  
module.exports = router;