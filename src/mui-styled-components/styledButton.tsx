import {Button, styled} from '@mui/material';

export const StyledButton = styled(Button)(({theme}) => ({
  color: theme.palette.primary.contrastText,
  borderColor: '#FFD700',
  borderRadius: '1.5rem',
  width: '13rem',
  padding: '0.5rem 1.5rem',
  marginTop: '0.8rem',
  '& .MuiSvgIcon-root': {
    marginRight: '1rem'
  }
}));
