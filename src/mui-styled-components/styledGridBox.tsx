import {Box} from '@mui/material';
import {styled} from '@mui/system';

export const StyledGridBox = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(14rem, 1fr))',
  gap: '1rem'
});
