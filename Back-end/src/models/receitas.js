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
    },
    custoAproximado: {
      type: Number,
      required: true,
    },
    ingredientes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingrediente'
      }
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Receita', ReceitaSchema);
