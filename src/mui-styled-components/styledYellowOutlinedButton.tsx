import { styled } from "@mui/material";

export const StyledYellowOutlinedButton = styled('button')({
  padding: '.625rem 1.25rem',
  borderRadius: '1rem',
  border: '2px solid #D4AF37',
  backgroundColor: 'transparent',
  color: '#D4AF37',
  fontSize: '16px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  cursor: 'pointer',
  transition: '0.3s ease',
  '&:hover': {
    backgroundColor: '#D4AF37',
    color: '#1B2D31'
  }
});