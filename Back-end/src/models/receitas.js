const mongoose = require('mongoose');

const ReceitaSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    tempoPreparo: {
      type: Number,
      required: true,
      unique: true,
    },
    custoAproximado: {
      type: Number,
      required: true,
      unique: true,
    },
    ingredientes: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Receitas', ReceitaSchema);
