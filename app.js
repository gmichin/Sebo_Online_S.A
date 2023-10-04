const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/users', require('./routes/users')); 
app.use('/admin', require('./routes/admin')); 

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
