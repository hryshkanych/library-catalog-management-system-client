import {Tabs, Tab} from '@mui/material';
import {styled} from '@mui/material/styles';

export const StyledTabs = styled(Tabs)(({theme}) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.secondary.light
  }
}));

export const StyledTab = styled(Tab)(({theme}) => ({
  fontWeight: 'bold',
  color: theme.palette.secondary.main,
  '&.Mui-selected': {
    color: theme.palette.secondary.light
  }
}));
