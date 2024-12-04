import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    color: theme.palette.secondary.main, 
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: theme.palette.secondary.light, 
  },
  '& .MuiInputBase-input': {
    color: theme.palette.secondary.light, 
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.secondary.main, 
    },
    '&:hover fieldset': {
      borderColor: theme.palette.secondary.main, 
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.secondary.main, 
    },
  },
  '& .MuiInputAdornment-root .MuiSvgIcon-root': {
    color: theme.palette.secondary.light,
  },
  '& .MuiSelect-icon': {
    color: theme.palette.secondary.light,
  },
}));
