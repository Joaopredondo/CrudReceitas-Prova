import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Delete } from '@mui/icons-material';

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
      padding: theme.spacing(2),
      borderRadius: '15px',
      backgroundColor: theme.palette.background.paper,
    },
  }));

function FormularioReceita({ aberto, aoFechar, aoSalvar, receita }) {
  const [nome, setNome] = useState('');
  const [tempoPreparo, setTempoPreparo] = useState('');
  const [custoAproximado, setCustoAproximado] = useState('');
  const [ingredientes, setIngredientes] = useState([]);
  const [novoIngrediente, setNovoIngrediente] = useState('');

  useEffect(() => {
    if (aberto) {
      if (receita) {
        setNome(receita.nome);
        setTempoPreparo(receita.tempoPreparo);
        setCustoAproximado(receita.custoAproximado);
        setIngredientes(receita.ingredientes || []);
      } else {
        setNome('');
        setTempoPreparo('');
        setCustoAproximado('');
        setIngredientes([]);
      }
    }
  }, [receita, aberto]);

  const handleSubmit = () => {
    if (!nome.trim() || !tempoPreparo || !custoAproximado || ingredientes.length === 0) {
      alert('Por favor, preencha todos os campos e adicione pelo menos um ingrediente.');
      return;
    }

    const ingredientesValidos = ingredientes.filter(ing => ing.nome && ing.nome.trim() !== '');
    if (ingredientesValidos.length === 0) {
      alert('Por favor, adicione pelo menos um ingrediente válido.');
      return;
    }

    const novaReceita = {
      _id: receita ? receita._id : null,
      nome: nome.trim(),
      tempoPreparo: parseInt(tempoPreparo),
      custoAproximado: parseFloat(custoAproximado),
      ingredientes: ingredientesValidos,
    };
    console.log('Enviando receita:', JSON.stringify(novaReceita, null, 2));
    aoSalvar(novaReceita);
  };

  const addIngrediente = () => {
    if (novoIngrediente.trim()) {
      setIngredientes([...ingredientes, { nome: novoIngrediente.trim() }]);
      setNovoIngrediente('');
    }
  };

  const removeIngrediente = (index) => {
    setIngredientes(ingredientes.filter((_, i) => i !== index));
  };

  return (
    <StyledDialog open={aberto} onClose={aoFechar}>
      <DialogTitle sx={{ fontWeight: 'bold' }}>
        {receita ? 'Editar Receita' : 'Adicionar Receita'}
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Nome"
          type="text"
          fullWidth
          variant="outlined"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Tempo Preparo (minutos)"
          type="number"
          fullWidth
          variant="outlined"
          value={tempoPreparo}
          onChange={(e) => setTempoPreparo(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          margin="dense"
          label="Custo Aproximado"
          type="number"
          fullWidth
          variant="outlined"
          value={custoAproximado}
          onChange={(e) => setCustoAproximado(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Typography variant="h6" sx={{ mt: 2 }}>Ingredientes</Typography>
        {ingredientes.map((ingrediente, index) => (
          <Box key={index} display="flex" alignItems="center" sx={{ mt: 1 }}>
            <Typography>{ingrediente.nome}</Typography>
            <IconButton onClick={() => removeIngrediente(index)}>
              <Delete />
            </IconButton>
          </Box>
        ))}
        <Box display="flex" sx={{ mt: 2 }}>
          <TextField
            label="Novo Ingrediente"
            value={novoIngrediente}
            onChange={(e) => setNovoIngrediente(e.target.value)}
            fullWidth
          />
          <Button onClick={addIngrediente} sx={{ ml: 1 }}>Adicionar</Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={aoFechar}>Cancelar</Button>
        <Button onClick={handleSubmit}>Salvar</Button>
      </DialogActions>
    </StyledDialog>
  );
}

export default FormularioReceita;
