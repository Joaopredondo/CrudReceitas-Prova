const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const connectDB = require('./config/database');
const receitaRoutes = require('./routes/receitaRoutes');

const app = express();

connectDB();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/api/receitas', receitaRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
