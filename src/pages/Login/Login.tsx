import React, {useState} from 'react';
import {Box, Typography, TextField, InputAdornment} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import backgroundImage from 'src/assets/books-background.png';
import {EmailOutlined, LockOutlined} from '@mui/icons-material';
import {useAuth} from 'src/context/AuthContext';
import {useNavigate} from 'react-router-dom';
import {StyledYellowOutlinedButton} from '../../mui-styled-components/styledYellowOutlinedButton';

const Login: React.FC = () => {
  const theme = useTheme();

  const {login} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError(null);
      await login(email, password);
      setTimeout(() => {
        navigate('/');
      }, 0);
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '2rem',
        backgroundImage: `linear-gradient(rgba(27, 45, 49, 0.45), rgba(27, 45, 49, 0.45)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          width: '100%',
          maxWidth: '500px',
          display: 'flex',
          flexDirection: 'column',
          padding: '3rem 4rem',
          borderRadius: '1.5rem'
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: theme.palette.secondary.light,
            textAlign: 'center',
            mb: '3rem'
          }}
        >
          Welcome to Library
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlined sx={{color: '#A5B0B7'}} />
              </InputAdornment>
            ),
            style: {
              backgroundColor: theme.palette.primary.light,
              borderRadius: '1rem',
              color: theme.palette.secondary.light
            }
          }}
          sx={{
            mb: '.5rem',
            '& .MuiInputBase-input': {
              '&:-webkit-autofill': {
                WebkitBoxShadow: `0 0 0 100px ${theme.palette.primary.light} inset`,
                WebkitTextFillColor: theme.palette.secondary.light
              }
            }
          }}
        />

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Password"
          type="password"
          value={password}
          error={!!error}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlined sx={{color: '#A5B0B7'}} />
              </InputAdornment>
            ),
            style: {
              backgroundColor: theme.palette.primary.light,
              borderRadius: '1rem',
              color: theme.palette.secondary.light
            }
          }}
          sx={{
            mb: '.5rem',
            '& .MuiInputBase-input': {
              '&:-webkit-autofill': {
                WebkitBoxShadow: `0 0 0 100px ${theme.palette.primary.light} inset`,
                WebkitTextFillColor: theme.palette.secondary.light
              }
            }
          }}
        />

        <Typography
          sx={{
            color: theme.palette.error.main,
            mb: '2.5rem'
          }}
        >
          {!!error ? error : ''}
        </Typography>

        <StyledYellowOutlinedButton onClick={handleLogin}>Sign in</StyledYellowOutlinedButton>
      </Box>
    </Box>
  );
};

export default Login;
