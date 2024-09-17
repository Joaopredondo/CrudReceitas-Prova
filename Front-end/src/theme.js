// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // Define o modo como 'dark' para o tema escuro
    primary: {
      main: '#90caf9', // Azul claro para destacar no modo escuro
    },
    secondary: {
      main: '#f48fb1', // Rosa claro para destacar no modo escuro
    },
    background: {
      default: '#121212', // Cor de fundo típica para o modo escuro
      paper: '#1e1e1e', // Cor dos elementos em papel no modo escuro
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
});

export default theme;
