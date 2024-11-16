import React from 'react';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from 'src/theme/theme';
import 'src/styles/global.css';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="flex w-screen h-screen" style={{backgroundColor: theme.palette.primary.dark}}></div>
    </ThemeProvider>
  );
};

export default App;
