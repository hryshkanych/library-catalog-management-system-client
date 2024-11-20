import {Box} from '@mui/material';
import {styled} from '@mui/material/styles';

export const StyledMarkedBox = styled(Box)(({theme}) => ({
  backgroundColor: theme.palette.secondary.dark,
  padding: '0.2rem 1rem',
  borderRadius: '1rem',
  marginRight: 'auto'
}));

export const StyledMarkedBoxSecond = styled(Box)(({theme}) => ({
  backgroundColor: theme.palette.secondary.dark,
  borderRadius: '1.5rem',
  width: '13rem',
  padding: '0.5rem 1.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));
