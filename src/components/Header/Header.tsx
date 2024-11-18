import React from 'react';
import {Box, IconButton, Avatar, Typography, InputAdornment} from '@mui/material';
import {Menu, Notifications, Search} from '@mui/icons-material';
import {StyledTabs, StyledTab} from 'src/mui-styled-components/styledTabs';
import {StyledSearchBox} from 'src/mui-styled-components/styledSearch';
import {useTheme} from '@mui/material/styles';
import {StyledAppBar} from 'src/mui-styled-components/styledAppBar';
import {StyledToolbar} from 'src/mui-styled-components/styledToolBar';

interface HeaderProps {
  toggleFilters: () => void;
}

const Header: React.FC<HeaderProps> = ({toggleFilters}) => {
  const theme = useTheme();

  return (
    <StyledAppBar position="static">
      <StyledToolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%'}}>
        <IconButton sx={{color: theme.palette.secondary.light}} onClick={toggleFilters}>
          <Menu />
        </IconButton>
        <Box sx={{display: 'flex'}}>
          <StyledTabs value={0}>
            <StyledTab label="Library" />
            <StyledTab label="Authors" />
            <StyledTab label="Activity" />
          </StyledTabs>
        </Box>
        <StyledSearchBox
          variant="outlined"
          size="small"
          placeholder="Search..."
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
        />
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <IconButton sx={{color: theme.palette.secondary.light}}>
            <Notifications />
          </IconButton>
          <Box sx={{display: 'flex', alignItems: 'center', marginLeft: '1rem'}}>
            <Typography variant="body1" sx={{color: theme.palette.secondary.light}}>
              John Doe
            </Typography>
            <Avatar alt="Profile" src="/avatar.png" sx={{width: '3rem', height: '3rem', marginLeft: '1rem'}} />
          </Box>
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
