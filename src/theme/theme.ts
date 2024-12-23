import {createTheme} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1F3438',
      light: '#263F44',
      dark: '#1B2D31',
      contrastText: '#FFD36A'
    },
    secondary: {
      dark: '#3D5736',
      main: '#7DA7A6',
      light: '#CDEAEE',
      contrastText: '#F2EDDC'
    },
    error: {
      main: '#d32f2f'
    },
    border: {
      main: '#D1D1D1'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: '#1B2D31'
        }
      }
    }
  }
});

export default theme;
