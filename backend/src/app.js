const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Mensagem = require('./Mensagem');
require('dotenv').config();

const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

app.use(express.json());
app.use(((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}
));

mongoose.connect(uri)
  .then(() => {
    console.log('MongoDB connected');

  let mensagens = Mensagem.find({mensagem: {$exists: true}}).then(docs => {
    mensagens = docs;
  }).catch(err => {
    console.error(err);
  });
})
  .catch(err => console.error('MongoDB connection error:', err));

app.post('/mensagens', (req, res) => {
  const mensagem = req.body;
  const novaMensagem = new Mensagem(mensagem);

  novaMensagem.save().then(() => {
    console.log(mensagem.mensagem);
  }).catch(err => {
    console.error('Erro ao salvar mensagem:', err);
  });

  res.status(201).send(mensagem);
});

app.get('/mensagens', (req, res) => {
  Mensagem.find({mensagem: {$exists: true}})
    .then(mensagens => {
      res.send(mensagens);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({error: 'Failed to fetch messages'});
    });
});

app.listen(port, () => {
  console.log(`Server is running on: ${port}`);
});