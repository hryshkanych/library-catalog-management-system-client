import {TextField} from '@mui/material';
import {styled} from '@mui/material/styles';

export const StyledSearchBox = styled(TextField)(({theme}) => ({
  backgroundColor: theme.palette.primary.light,
  borderRadius: '30px',
  width: '25rem',
  '& .MuiInputBase-root': {
    padding: '4px 16px',
    color: theme.palette.secondary.main
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  '& .MuiInputAdornment-root': {
    color: theme.palette.secondary.main
  },
  '& .MuiInputBase-input': {
    color: theme.palette.secondary.main
  }
}));
