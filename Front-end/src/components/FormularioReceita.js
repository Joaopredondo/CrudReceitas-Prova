import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
      padding: theme.spacing(2),
      borderRadius: '15px',
      backgroundColor: theme.palette.background.paper,
    },
  }));
  
  const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: '25px',
    padding: theme.spacing(1, 3),
    textTransform: 'none',
    fontWeight: 'bold',
    color: theme.palette.getContrastText(theme.palette.primary.main),
  }));

function FormularioReceita({ aberto, aoFechar, aoSalvar, receita }) {
  const [nome, setNome] = useState('');
  const [tempoPreparo, setTempoPreparo] = useState('');
  const [custoAproximado, setCustoAproximado] = useState('');
  const [ingredientes , setIngredientes] = useState('');

  useEffect(() => {
    if (aberto) {
      if (receita) {
        setNome(receita.nome);
        setTempoPreparo(receita.tempoPreparo);
        setCustoAproximado(receita.custoAproximado);
        setIngredientes(receita.ingredientes);
      } else {
        setNome('');
        setTempoPreparo('');
        setCustoAproximado('');
        setIngredientes('');
      }
    }
  }, [receita,aberto]);

  const handleSubmit = () => {
    const novaReceita = {
      _id: receita ? receita._id : null,
      nome,
      tempoPreparo,
      custoAproximado,
      ingredientes,
    };
    aoSalvar(novaReceita);
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
          label="Tempo Preparo"
          type="text"
          fullWidth
          variant="outlined"
          value={tempoPreparo}
          onChange={(e) => setTempoPreparo(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          margin="dense"
          label="Custo Aproximado"
          type="text"
          fullWidth
          variant="outlined"
          value={custoAproximado}
          onChange={(e) => setCustoAproximado(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          margin="dense"
          label="Ingredientes"
          type="text"
          fullWidth
          variant="outlined"
          value={ingredientes}
          onChange={(e) => setIngredientes(e.target.value)}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <StyledButton onClick={aoFechar} color="secondary">
          Cancelar
        </StyledButton>
        <StyledButton onClick={handleSubmit} color="primary" variant="contained">
          {receita ? 'Salvar Alterações' : 'Adicionar'}
        </StyledButton>
      </DialogActions>
    </StyledDialog>
  );
}

export default FormularioReceita;
