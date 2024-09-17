const Receita = require('../models/receitas');
const Ingrediente = require('../models/ingrediente');

// @desc    Obter todos as receitas
// @route   GET /api/receitas
// @access  Público
exports.getReceitas = async (req, res) => {
  try {
    console.log('Buscando receitas...');
    const receitas = await Receita.find().populate('ingredientes').sort({ createdAt: -1 });
    console.log('Receitas buscadas com sucesso:', receitas);
    res.json(receitas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Criar uma nova receitas
// @route   POST /api/receitas
// @access  Público
exports.createReceitas = async (req, res) => {
  const { nome, tempoPreparo, custoAproximado, ingredientes } = req.body;

  try {
    const ingredientesIds = await Promise.all(ingredientes.map(async (ing) => {
      const novoIngrediente = new Ingrediente({ nome: ing.nome });
      await novoIngrediente.save();
      return novoIngrediente._id;
    }));
    const receita = new Receita({ 
      nome, 
      tempoPreparo: parseInt(tempoPreparo), 
      custoAproximado: parseFloat(custoAproximado), 
      ingredientes: ingredientesIds 
    });
    await receita.save();

    res.status(201).json(receita);
  } catch (err) {
    console.error('Erro ao criar receita:', err);
    res.status(400).json({ message: err.message });
  }
};

// @desc    Atualizar uma receita
// @route   PUT /api/receitas/:id
// @access  Público
exports.updateReceita = async (req, res) => {
  const { nome, tempoPreparo, custoAproximado, ingredientes } = req.body;
  console.log('Dados recebidos para atualização:', JSON.stringify(req.body, null, 2));
  console.log('ID da receita:', req.params.id);

  try {
    const ingredientesIds = await Promise.all(ingredientes.map(async (ing) => {
      if (ing._id) {
        await Ingrediente.findByIdAndUpdate(ing._id, { nome: ing.nome });
        return ing._id;
      } else {
        const novoIngrediente = new Ingrediente({ nome: ing.nome });
        await novoIngrediente.save();
        return novoIngrediente._id;
      }
    }));

    const receita = await Receita.findByIdAndUpdate(
      req.params.id,
      { nome, tempoPreparo, custoAproximado, ingredientes: ingredientesIds },
      { new: true, runValidators: true }
    ).populate('ingredientes');

    if (!receita) {
      console.log('Receita não encontrada');
      return res.status(404).json({ message: 'Receita não encontrada' });
    }
    console.log('Receita atualizada com sucesso:', receita);
    res.json(receita);
  } catch (err) {
    console.error('Erro ao atualizar receita:', err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Erro interno do servidor', error: err.message });
  }
};

// @desc    Deletar uma receita
// @route   DELETE /api/receitas/:id
// @access  Público
exports.deleteReceita = async (req, res) => {
  try {
    const receita = await Receita.findByIdAndDelete(req.params.id);
    if (!receita) {
      return res.status(404).json({ message: 'Receita não encontrada' });
    }
    res.json({ message: 'Receita removida' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
