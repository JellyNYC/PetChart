const express = require('express');
const path = require('path');
// const db = require('../database/database.js');
const accountsRouter = require('./routes/accountsRouter');
const petsRouter = require('./routes/petsRouter');

const app = express();

const PORT = 3000;

// db.query('SELECT * FROM pets', (err, res) => {
//   console.log('this is the db response: ', res.rows);
// });

app.use('/accounts', accountsRouter);

app.use('/pets', petsRouter);

app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../client/index.html')));

app.all('*', (req, res) => {
  res.status(404).send('Page not found assholes!');
});

app.use('/', (err, req, res, next) => {
  const defaultError = {
    status: 500,
    message: 'express error caught unknown middleware error'
  };
  const newError = { ...defaultError, ...err };
  console.log('This is global error handler: ', newError.message);
  res.status(newError.status).send(newError.message);
});

app.listen(PORT, () => console.log(`you are being heard on port ${PORT}`));
