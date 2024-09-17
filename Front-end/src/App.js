import React from 'react';
import { CssBaseline } from '@mui/material';
import ListaReceitas from './components/ListaReceitas';

import '@fontsource/poppins';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';

function App() {
  return (
    <>
      <CssBaseline />
      <ListaReceitas />
    </>
  );
}

export default App;
