const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const db = require('../db');
const bcrypt = require('bcrypt');



let isAuthenticated = false;

const checkAuthentication = (req, res, next) => {
  if (isAuthenticated) {
    next();
  } else {
    res.status(401).json({ success: false, message: 'Não autorizado' });
  }
};

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
      return { success: true, message: 'Autenticação feita com sucesso!' };
    } else {
      return { success: false, message: 'Autenticação falhou' };
    }
  } catch (error) {
    console.error('Erro:', error.message);
    return { success: false, message: 'Erro interno do servidor' };
  }
};

// Rota de login de users
router.post('/users/login', async (req, res) => {
  const { email, senha } = req.body;
  
  const userLoginResult = await authenticate('http://localhost:3000/path/dataUser', email, senha);
  if (userLoginResult.success) {
    res.status(200).json(userLoginResult);
  } else {
    res.status(401).json({ success: false, message: 'Autenticação falhou' });
  }
});

// Rota de users logout
router.post('/users/logout', (req, res) => {
  res.status(200).json({ success: true, message: 'Logout bem-sucedido' });
});


// Rota de login de admin
router.post('/admin/login', async (req, res) => {
  const { email, senha } = req.body;
  const adminLoginResult = await authenticate('http://localhost:3000/path/dataAdmin', email, senha);
  
  if (adminLoginResult.success) {
    isAuthenticated = true; 
    res.status(200).json(adminLoginResult);
  } else {
    res.status(401).json({ success: false, message: 'Autenticação falhou' });
  }
});

// Rota de admin logout
router.post('/admin/logout', (req, res) => {
  isAuthenticated = false; 
  res.status(200).json({ success: true, message: 'Logout bem-sucedido' });
});

//vizualizar de todos perfis de usuário
router.get('/dataUser', checkAuthentication, (req, res) => {
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


//Rota para edição de usuários e adms
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


//Rota de soft delete de usuários e adms
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



//cadastro de users
router.post('/users/signup', async (req, res) => {
  const { nome, email, senha, status, tipo, area_especializacao } = req.body;
  const hashedPassword = await bcrypt.hash(senha, 10);

  const query = `INSERT INTO users (nome, email, senha, status, tipo, area_especializacao) VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(query, [nome, email, hashedPassword, status, tipo, area_especializacao], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    } else {
      res.json({ message: 'Usuário cadastrado com sucesso.' });
    }
  });
});

//cadastro de admin
router.post('/admin/signup', async (req, res) => {
  const { nome, email, senha, status, tipo, area_especializacao } = req.body;
  const hashedPassword = await bcrypt.hash(senha, 10);

  const query = `INSERT INTO admin (nome, email, senha, status, tipo, area_especializacao) VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(query, [nome, email, hashedPassword, status, tipo, area_especializacao], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    } else {
      res.json({ message: 'Usuário cadastrado com sucesso.' });
    }
  });
});

//Rota de adição de itens
router.post('/items', async (req, res) => {
  const { titulo, autor, categoria, preco, descricao, status, periodicidade, id_vendedor } = req.body;
  if (!titulo || !autor || !categoria || !preco || !descricao || !status || !periodicidade || !id_vendedor) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const query = 'INSERT INTO items (titulo, autor, categoria, preco, descricao, status, periodicidade, id_vendedor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [titulo, autor, categoria, preco, descricao, status, periodicidade, id_vendedor], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Erro ao adicionar novo item.' });
      } else {
        res.json({ message: 'Novo item adicionado com sucesso.' });
      }
    });
  } catch (error) {
    console.error('Erro:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

//Rota de listagem de itens
router.get('/items', (req, res) => {
  const query = 'SELECT * FROM items';
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao obter a lista de itens.' });
    } else {
      res.json(result);
    }
  });
});

//Rota de edição de itens
router.put('/items/edit/:id', (req, res) => {
  const id = req.params.id;
  const { titulo, autor, categoria, preco, descricao, status, periodicidade, id_vendedor } = req.body;
  if (!titulo || !autor || !categoria || !preco || !descricao || !status || !periodicidade || !id_vendedor) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios."});
  }

  const query = 'UPDATE items SET titulo=?, autor=?, categoria=?, preco=?, descricao=?, status=?, periodicidade=?, id_vendedor=? WHERE id=?';
  db.query(query, [titulo, autor, categoria, preco, descricao, status, periodicidade, id_vendedor, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao editar o item.' });
    } else {
      res.json({ message: 'Item editado com sucesso.' });
    }
  });
});

//Rota de busca rápida de itens pelo nome
router.get('/items/:id', (req, res) => {
  const searchTerm = req.params.id; 

  if (!searchTerm) {
    return res.status(400).json({ error: 'O parâmetro "id" é obrigatório na consulta.'});
  }

  const query = 'SELECT * FROM items WHERE id = ?';
  db.query(query, [searchTerm], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao realizar a busca de itens por nome.' });
    } else {
      res.json(result);
    }
  });
});

//Rota de listagem de itens com filtro
router.get('/items/:field/:value', (req, res) => {
  const { field, value } = req.params;
  const validFields = ['titulo', 'autor', 'categoria', 'preco', 'descricao', 'status', 'periodicidade', 'id_vendedor'];

  if (!validFields.includes(field)) {
    res.status(400).json({ error: 'Campo inválido.' });
    return;
  }

  const query = `SELECT * FROM items WHERE ${field} = ?`;

  db.query(query, [value], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao obter a lista de itens.' });
    } else {
      res.json(result);
    }
  });
});


//Deletar itens
router.delete('/items/delete/:id', (req, res) => {
  const id = req.params.id;

  const query = `DELETE FROM items WHERE id = ?`;

  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao realizar o soft delete da item.' });
    } else {
      res.json({ message: 'Item desativado com sucesso.' });
    }
  });
});

//Rora de criação de categorias
router.post('/categories', (req, res) => {
  const { nome, descricao } = req.body;
  if (!nome || !descricao) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  const query = 'INSERT INTO categories (nome, descricao) VALUES (?, ?)';
  db.query(query, [nome, descricao], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao criar nova categoria.' });
    } else {
      res.json({ message: 'Nova categoria criada com sucesso.' });
    }
  });
});

//Rota de listagem de categorias
router.get('/categories', (req, res) => {
  const query = 'SELECT * FROM categories';
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao obter a lista de categorias.' });
    } else {
      res.json(result);
    }
  });
});

//Rota de edição de categorias
router.put('/categories/edit/:id', (req, res) => {
  const id = req.params.id;
  const { nome, descricao } = req.body;
  if (!nome || !descricao) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.'});
  }

  const query = 'UPDATE categories SET nome=?, descricao=?WHERE id=?';
  db.query(query, [nome, descricao, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao editar a categoria.' });
    } else {
      res.json({ message: 'Categoria editada com sucesso.' });
    }
  });
});

//Rota para o soft delete de categorias
router.delete('/categories/delete/:id', (req, res) => {
  const id = req.params.id;

  const query = `DELETE FROM categories WHERE id = ?`;

  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao realizar o soft delete da categoria.' });
    } else {
      res.json({ message: 'Categoria desativada com sucesso.' });
    }
  });
});

//Rota de registro de novas transações
router.post('/transactions', (req, res) => {
  const { id_comprador, id_vendedor, id_item, valor } = req.body;

  if (!id_comprador || !id_vendedor || !id_item || !valor) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  const query = 'INSERT INTO transactions (id_comprador, id_vendedor, id_item, valor) VALUES (?, ?, ?, ?)';

  db.query(query, [id_comprador, id_vendedor, id_item, valor], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao registrar a transação.' });
    } else {
      res.json({ message: 'Transação registrada com sucesso.' });
    }
  });
});

// Visualização de transações para um usuário específico
router.get('/transactions/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = 'SELECT * FROM transactions WHERE id_comprador = ? OR id_vendedor = ?';

  db.query(query, [userId, userId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao obter as transações do usuário.' });
    } else {
      res.json(result);
    }
  });
});

//Deletar transações
router.delete('/transactions/delete/:id', (req, res) => {
  const id = req.params.id;

  const query = `DELETE FROM transactions WHERE id = ?`;

  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao realizar o soft delete da transação.' });
    } else {
      res.json({ message: 'Transação desativada com sucesso.' });
    }
  });
});


module.exports = router;

