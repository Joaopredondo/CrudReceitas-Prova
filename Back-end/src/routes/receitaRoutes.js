const express = require('express');
const router = express.Router();
const {
  getReceitas,
  createReceitas,
  updateReceita,
  deleteReceita,
} = require('../controllers/receitaController');

router.get('/', getReceitas);
router.post('/', createReceitas);
router.put('/:id', updateReceita);
router.delete('/:id', deleteReceita);

module.exports = router;
