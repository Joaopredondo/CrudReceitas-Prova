const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/crud', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB');

    // Verificar e remover índices únicos nos campos tempoPreparo e custoAproximado
    const db = mongoose.connection;
    const collection = db.collection('receitas');
    const indexes = await collection.indexes();

    const tempoPreparoIndex = indexes.find(index => index.name === 'tempoPreparo_1');
    if (tempoPreparoIndex) {
      await collection.dropIndex('tempoPreparo_1');
      console.log('Índice único no campo tempoPreparo removido');
    }

    const custoAproximadoIndex = indexes.find(index => index.name === 'custoAproximado_1');
    if (custoAproximadoIndex) {
      await collection.dropIndex('custoAproximado_1');
      console.log('Índice único no campo custoAproximado removido');
    }
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB', err);
    process.exit(1);
  }
};

module.exports = connectDB;