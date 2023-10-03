const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const usersRoutes = require('./routes/users');

app.use('/users', usersRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});