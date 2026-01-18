const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Mensagem = require('./Mensagem');
require('dotenv').config();

const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

app.use(express.json());
app.use(((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*' /*'https://astigmatismo2.github.io/batata-frita-123/'*/);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}
));

let mensagens = Mensagem.find({mensagem: {$exists: true}}).then(docs => {
  mensagens = docs;
}).catch(err => {
  console.error(err);
});

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.post('/mensagens', (req, res) => {
  const mensagem = req.body;
  mensagens.push(mensagem);
  res.status(201).send(mensagem);
});

app.get('/mensagens', (req, res) => {
  res.send(mensagens);
});

app.listen(port, () => {
  console.log(`Server is running on: ${port}`);
});