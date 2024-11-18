import {Checkbox, FormControlLabel, styled} from '@mui/material';

export const StyledCheckbox = styled(Checkbox)(({theme}) => ({
  '&.Mui-checked': {
    color: theme.palette.primary.contrastText
  },
  '&.MuiCheckbox-root': {
    color: theme.palette.secondary.main
  }
}));

export const StyledFormControlLabel = styled(FormControlLabel)(({theme}) => ({
  '& .MuiTypography-root': {
    color: theme.palette.secondary.main
  }
}));
