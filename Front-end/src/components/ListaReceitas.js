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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Edit, Delete } from '@mui/icons-material';
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

  const fetchReceitas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/receitas');
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

  const adicionarOuEditarReceita = async (receita) => {
    if (receita._id) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/receitas/${receita._id}`,
          receita
        );
        setReceitas(
          receitas.map((r) => (r._id === response.data._id ? response.data : r))
        );
      } catch (error) {
        console.error('Erro ao atualizar a receita:', error);
      }
    } else {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/receitas',
          receita
        );
        setReceitas([response.data, ...receitas]);
      } catch (error) {
        console.error('Erro ao adicionar uma receita:', error);
      }
    }
    fecharFormulario();
  };

  const excluirReceita = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta receita?')) {
      try {
        await axios.delete(`http://localhost:5000/api/receitas/${id}`);
        setReceitas(receitas.filter((u) => u._id !== id));
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
            Adicionar Receitas
          </StyledButton>
        </Stack>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Nome</strong>
              </TableCell>
              <TableCell>
                <strong>Tempo Preparo</strong>
              </TableCell>
              <TableCell>
                <strong>Custo Aproximado</strong>
              </TableCell>
              <TableCell align = "center">
                <strong>Ingredientes</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receitas.map((receita) => (
              <StyledTableRow key={receita.id}>
                <TableCell>{receita.nome}</TableCell>
                <TableCell>{receita.email}</TableCell>
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
        <FormularioReceita
          aberto={aberto}
          aoFechar={fecharFormulario}
          aoSalvar={adicionarOuEditarReceita}
          receita={receitaAtual}
        />
      </StyledPaper>
    </StyledContainer>
  );
}

export default ListaReceitas;
