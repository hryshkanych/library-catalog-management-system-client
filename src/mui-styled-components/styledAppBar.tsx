import {styled} from '@mui/system';
import {AppBar} from '@mui/material';

export const StyledAppBar = styled(AppBar)(() => ({
  boxShadow: '0px 0.25rem 0.375rem rgba(0, 0, 0, 0.35)',
  zIndex: 10,
  height: '4.5rem',
  backgroundColor: 'transparent'
}));
