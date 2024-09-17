import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Button,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import FormularioReceita from './FormularioReceita';
import axios from 'axios';

const StyledContainer = styled('div')(({ theme }) => ({
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
  }));
  
  const StyledPaper = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    borderRadius: '15px',
    boxShadow: theme.shadows[5],
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
  }));
  
  const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: '25px',
    padding: theme.spacing(1, 3),
    textTransform: 'none',
    fontWeight: 'bold',
    color: theme.palette.getContrastText(theme.palette.primary.main),
  }));

function ListaReceitas() {
  const [receitas, setReceitas] = useState([]);
  const [aberto, setAberto] = useState(false);
  const [receitaAtual, setReceitaAtual] = useState(null);
  const [ingredientesAbertos, setIngredientesAbertos] = useState(false);
  const [ingredientesAtuais, setIngredientesAtuais] = useState([]);

  const fetchReceitas = async () => {
    try {
      console.log('Buscando receitas...');
      const response = await axios.get('http://localhost:5000/api/receitas');
      console.log('Receitas recebidas:', response.data);
      setReceitas(response.data);
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
    }
  };

  useEffect(() => {
    fetchReceitas();
  }, []);

  const abrirFormulario = (receita = null) => {
    setReceitaAtual(receita);
    setAberto(true);
  };

  const fecharFormulario = () => {
    setAberto(false);
    setReceitaAtual(null);
  };

  const abrirIngredientes = (ingredientes) => {
    setIngredientesAtuais(ingredientes);
    setIngredientesAbertos(true);
  };

  const fecharIngredientes = () => {
    setIngredientesAbertos(false);
  };

  const adicionarOuEditarReceita = async (receita) => {
    try {
      let response;
      if (receita._id) {
        // eslint-disable-next-line
        response = await axios.put(`http://localhost:5000/api/receitas/${receita._id}`, receita);
      } else {
        // eslint-disable-next-line
        response = await axios.post('http://localhost:5000/api/receitas', receita);
      }
      await fetchReceitas();
      fecharFormulario();
    } catch (error) {
      console.error('Erro ao adicionar/editar receita:', error);
      const mensagemErro = error.response?.data?.message || 'Erro ao processar a receita. Tente novamente.';
      alert(mensagemErro);
    }
  };

  const excluirReceita = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta receita?')) {
      try {
        await axios.delete(`http://localhost:5000/api/receitas/${id}`);
        setReceitas(receitas.filter((r) => r._id !== id));
      } catch (error) {
        console.error('Erro ao excluir a receita:', error);
      }
    }
  };

  return (
    <StyledContainer>
      <StyledPaper>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Gerenciamento de Receitas
        </Typography>
        <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() => abrirFormulario()}
          >
            Adicionar Receita
          </StyledButton>
        </Stack>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"><strong>Nome</strong></TableCell>
              <TableCell align="center"><strong>Tempo Preparo</strong></TableCell>
              <TableCell align="center"><strong>Custo Aproximado</strong></TableCell>
              <TableCell align="center"><strong>Ingredientes</strong></TableCell>
              <TableCell align="center"><strong>Ações</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receitas.map((receita) => (
              <StyledTableRow key={receita._id}>
                <TableCell align="center">{receita.nome}</TableCell>
                <TableCell align="center">{receita.tempoPreparo} min</TableCell>
                <TableCell align="center">R$ {receita.custoAproximado.toFixed(2)}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => abrirIngredientes(receita.ingredientes)}>
                    <Visibility />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    sx={{ color: '#FFC107' }}
                    onClick={() => abrirFormulario(receita)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    sx={{ color: '#E53935' }}
                    onClick={() => excluirReceita(receita._id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>

        {/* Dialog para exibir ingredientes */}
        <Dialog open={ingredientesAbertos} onClose={fecharIngredientes}>
          <DialogTitle>Ingredientes</DialogTitle>
          <DialogContent>
            <List>
              {ingredientesAtuais.map((ingrediente, index) => (
                <ListItem key={index}>
                  <ListItemText primary={ingrediente.nome} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={fecharIngredientes}>Fechar</Button>
          </DialogActions>
        </Dialog>

      </StyledPaper>
      <FormularioReceita
        aberto={aberto}
        aoFechar={fecharFormulario}
        aoSalvar={adicionarOuEditarReceita}
        receita={receitaAtual}
      />
    </StyledContainer>
  );
}

export default ListaReceitas;
