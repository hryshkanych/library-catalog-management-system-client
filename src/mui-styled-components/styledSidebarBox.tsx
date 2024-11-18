import {Box} from '@mui/material';
import {styled} from '@mui/material/styles';

interface StyledSidebarBoxProps {
  isVisible: boolean;
}

export const StyledSidebarBox = styled(Box)<StyledSidebarBoxProps>(({theme, isVisible}) => ({
  width: isVisible ? '16rem' : '0rem',
  padding: isVisible ? '1rem' : '0rem',
  backgroundColor: theme.palette.primary.light,
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out'
}));
