import {styled} from '@mui/system';
import {Paper} from '@mui/material';

export const StyledDataMarker = styled(Paper)(({theme}) => ({
  display: 'inline-block',
  padding: '0.25rem 1.5rem',
  borderRadius: '1.5rem',
  backgroundColor: theme.palette.primary.contrastText,
  textAlign: 'center'
}));
