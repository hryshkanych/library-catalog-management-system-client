import {styled} from '@mui/system';
import {Card} from '@mui/material';

export const StyledCard = styled(Card)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '20rem',
  boxShadow: '0px 0.25rem 0.375rem rgba(0, 0, 0, 0.25)',
  backgroundColor: theme.palette.primary.main
}));
