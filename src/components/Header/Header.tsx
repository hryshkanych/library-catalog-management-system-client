import React, {useState} from 'react';
import {Box, IconButton, Avatar, Typography, InputAdornment, Popover, List, ListItem, ListItemIcon, ListItemText, Divider} from '@mui/material';
import {ExitToApp, Menu, Notifications, Search} from '@mui/icons-material';
import {StyledTabs, StyledTab} from 'src/mui-styled-components/styledTabs';
import {StyledSearchBox} from 'src/mui-styled-components/styledSearch';
import {useTheme} from '@mui/material/styles';
import {StyledAppBar} from 'src/mui-styled-components/styledAppBar';
import {StyledToolbar} from 'src/mui-styled-components/styledToolBar';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from 'src/context/AuthContext';

interface HeaderProps {
  toggleFilters: () => void;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({toggleFilters, onSearch}) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const isRootPath = location.pathname === '/';
  const role = localStorage.getItem('userRole');
  const username = localStorage.getItem('user');

  const tabs = [
    {label: 'Library', path: '', roles: ['Admin', 'Reader', 'Librarian']},
    {label: 'Activity', path: '/activity', roles: ['Reader']},
    {label: 'Users', path: '/users', roles: ['Librarian']},
    {label: 'Readers Activity', path: '/readers-activity', roles: ['Librarian']},
    {label: 'Books Management', path: '/books', roles: ['Admin']},
    {label: 'Reports', path: '/reports', roles: ['Admin']}
  ];

  const visibleTabs = tabs.filter((tab) => tab.roles.includes(role || ''));
  const [selectedTab, setSelectedTab] = useState(() => {
    const currentTab = visibleTabs.findIndex((tab) => tab.path === location.pathname);
    return currentTab !== -1 ? currentTab : 0;
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const {logout} = useAuth();

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    navigate(visibleTabs[newValue].path);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="static">
      <StyledToolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
            opacity: isRootPath ? 1 : 0,
            visibility: isRootPath ? 'visible' : 'hidden'
          }}
        >
          <IconButton sx={{color: theme.palette.secondary.light}} onClick={toggleFilters}>
            <Menu />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'center',
            transition: 'margin 0.3s ease-in-out',
            marginLeft: isRootPath ? 0 : '2rem'
          }}
        >
          <StyledTabs value={selectedTab} onChange={handleTabChange}>
            {visibleTabs.map((tab, index) => (
              <StyledTab
                key={index}
                label={
                  <Box
                    sx={{
                      textDecoration: 'none',
                      color: 'inherit',
                      textAlign: 'center'
                    }}
                  >
                    {tab.label}
                  </Box>
                }
              />
            ))}
          </StyledTabs>
        </Box>

        <StyledSearchBox
          variant="outlined"
          size="small"
          placeholder="Search..."
          fullWidth
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
          sx={{
            transition: 'max-width 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
            maxWidth: isRootPath ? '300px' : '0',
            opacity: isRootPath ? 1 : 0,
            visibility: isRootPath ? 'visible' : 'hidden',
            overflow: 'hidden'
          }}
        />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            transition: 'margin 0.3s ease-in-out',
            marginLeft: isRootPath ? '1rem' : 0
          }}
        >
          <IconButton sx={{color: theme.palette.secondary.light, ml: 2}}>
            <Notifications />
          </IconButton>
          <Box sx={{display: 'flex', alignItems: 'center', marginLeft: '1rem'}}>
            <Typography variant="body1" sx={{color: theme.palette.secondary.light}}>
              {username}
            </Typography>
            <Box sx={{display: 'flex', alignItems: 'center', marginLeft: '1rem'}}>
              <Avatar
                alt="Profile"
                src="/avatar.png"
                sx={{width: '3rem', height: '3rem', marginLeft: '1rem', cursor: 'pointer'}}
                onClick={handleAvatarClick}
              />
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
              >
                <List sx={{width: 200}}>
                  <ListItem>
                    <ListItemText primary={`You are ${role}`} />
                  </ListItem>
                  <Divider />
                  <ListItem component="button" onClick={handleLogout} sx={{cursor: 'pointer'}}>
                    <ListItemIcon>
                      <ExitToApp />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </List>
              </Popover>
            </Box>
          </Box>
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
