import React from 'react';
import {AppBar, Toolbar, Box, IconButton, Avatar, Typography, InputAdornment} from '@mui/material';
import {Notifications, Search} from '@mui/icons-material';
import { StyledTabs, StyledTab } from 'src/mui-styled-components/styledTabs';
import { StyledSearchBox } from 'src/mui-styled-components/styledSearch';
import {useTheme} from '@mui/material/styles';

const BookCatalog: React.FC = () => {
    const theme = useTheme();

  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      <AppBar position="static" color="transparent" elevation={0} sx={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.25)' }}>
        <Toolbar className="flex justify-between items-center py-4">
          <Box className="flex">
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
                ),
              }}
            />
          <Box className="flex items-center">
            <IconButton color="inherit">
              <Notifications />
            </IconButton>
            <Box className="flex items-center ml-4">
              <Typography variant="body1" sx={{ color: theme.palette.secondary.light}}>John Doe</Typography>
              <Avatar className="ml-4" alt="Profile" src="/avatar.png" sx={{ width: 62, height: 62 }} />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <main className="flex flex-col flex-grow p-4">
        <h2>Content goes here</h2>
      </main>
      <footer></footer>
    </div>
  );
};

export default BookCatalog;