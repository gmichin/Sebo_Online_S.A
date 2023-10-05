const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '127.0.0.1', //host da sua conexão no MySQL Workbench
  user: 'gustavo', //Seu user da conexão MySQL Workbench
  password: 'juliemei2014', //sua senha da conexão MySQL Workbench
  database: 'sebo_online', //Sua database do MySQL Workbench
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

module.exports = db;