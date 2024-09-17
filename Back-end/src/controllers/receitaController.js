const Receita = require('../models/receitas');

// @desc    Obter todos as receitas
// @route   GET /api/receitas
// @access  Público
exports.getReceitas = async (req, res) => {
  try {
    const Receita = await Receita.find().sort({ createdAt: -1 });
    res.json(Receita);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Criar uma nova receitas
// @route   POST /api/receitas
// @access  Público
exports.createReceitas = async (req, res) => {
  const { nome, tempoPreparo, custoAproximado, ingredientes} = req.body;

  try {
    const receita = new Receita({ nome, tempoPreparo, custoAproximado, ingredientes });
    await receita.save();
    res.status(201).json(receita);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Atualizar uma receita
// @route   PUT /api/receitas/:id
// @access  Público
exports.updateReceita = async (req, res) => {
  const { nome, tempoPreparo, custoAproximado, ingredientes } = req.body;

  try {
    const receita = await Receita.findByIdAndUpdate(
      req.params.id,
      { nome, tempoPreparo, custoAproximado, ingredientes },
      { new: true }
    );
    if (!receita) {
      return res.status(404).json({ message: 'Receita não encontrada' });
    }
    res.json(receita);
  } catch (err) {
    res.status(400).json({ message: err.message });
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
