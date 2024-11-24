import {Autocomplete, AutocompleteProps, styled} from '@mui/material';
import {UserOption} from 'src/models/user.type';

interface StyledAutocompleteProps extends AutocompleteProps<UserOption, boolean, boolean, boolean> {}

export const StyledAutocomplete = styled(({ ...props }: StyledAutocompleteProps) => (
  <Autocomplete {...props} />
))(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.contrastText,
    borderRadius: '.5rem',
    '& fieldset': {
      borderColor: theme.palette.border?.main || theme.palette.secondary.main
    },
    '&:hover fieldset': {
      borderColor: theme.palette.secondary.main
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.primary.light,
      '& fieldset': {
        borderColor: theme.palette.secondary.main,
        boxShadow: `0 0 8px ${theme.palette.secondary.main}`
      }
    }
  },
  '& .MuiAutocomplete-option': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
      color: theme.palette.secondary.contrastText
    },
    '&[aria-selected="true"]': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText
    }
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.secondary.contrastText,
    '&.Mui-focused': {
      color: theme.palette.secondary.main
    }
  }
}));
