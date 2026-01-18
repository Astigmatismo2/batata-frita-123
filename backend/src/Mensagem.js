const mongoose = require('mongoose');

const mensagemSchema = new mongoose.Schema({
  mensagem: {
    type: String,
    required: true,
    maxlength: 500
  }
});

const Mensagem = mongoose.model('Mensagens', mensagemSchema);
module.exports = Mensagem;