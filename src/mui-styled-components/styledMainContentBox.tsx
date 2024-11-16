import {Box} from '@mui/material';
import {styled} from '@mui/system';

export const StyledMainContentBox = styled(Box)({
  flexGrow: 1,
  padding: '1.5rem',
  overflow: 'auto',
  maxHeight: 'calc(100vh - 4.5rem)'
});
