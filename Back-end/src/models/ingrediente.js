const mongoose = require('mongoose');

const IngredienteSchema = new mongoose.Schema({
  nome: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model('Ingrediente', IngredienteSchema);
