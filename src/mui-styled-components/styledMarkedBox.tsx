import {Box} from '@mui/material';
import {styled} from '@mui/material/styles';

export const StyledMarkedBox = styled(Box)(({theme}) => ({
  backgroundColor: theme.palette.secondary.dark,
  padding: '0.2rem 1rem',
  borderRadius: '1rem',
  marginRight: 'auto'
}));
