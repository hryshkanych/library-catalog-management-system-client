import React from 'react';
import {Box, Divider, Typography} from '@mui/material';
import {StyledFormControlLabel} from 'src/mui-styled-components/styledCheckbox';
import {StyledCheckbox} from 'src/mui-styled-components/styledCheckbox';
import {StyledSidebarBox} from 'src/mui-styled-components/styledSidebarBox';
import {FilterCategory, Filters} from 'src/types/filterEntities.type';

interface SideBarProps {
  isVisible: boolean;
  filters: Filters;
  handleFilterChange: (category: FilterCategory, name: string, checked: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({isVisible, filters, handleFilterChange}) => {
  return (
    <StyledSidebarBox isVisible={isVisible}>
      <Box sx={{padding: '1rem'}}>
        <Typography variant="h6" sx={{marginBottom: '0.5rem', color: 'secondary.light'}}>
          Availability
        </Typography>
        {Object.entries(filters.availability).map(([key, value]) => (
          <StyledFormControlLabel
            key={key}
            control={<StyledCheckbox checked={value} onChange={(e) => handleFilterChange('availability', key, e.target.checked)} />}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
          />
        ))}
        <Divider sx={{margin: '0.7rem 0'}} />

        <Typography variant="h6" sx={{marginBottom: '0.5rem', color: 'secondary.light'}}>
          Languages
        </Typography>
        {Object.entries(filters.languages).map(([key, value]) => (
          <StyledFormControlLabel
            key={key}
            control={<StyledCheckbox checked={value} onChange={(e) => handleFilterChange('languages', key, e.target.checked)} />}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
          />
        ))}
        <Divider sx={{margin: '0.7rem 0'}} />

        <Typography variant="h6" sx={{marginBottom: '0.5rem', color: 'secondary.light'}}>
          Genres
        </Typography>
        {Object.entries(filters.genres).map(([key, value]) => (
          <StyledFormControlLabel
            key={key}
            control={<StyledCheckbox checked={value} onChange={(e) => handleFilterChange('genres', key, e.target.checked)} />}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
          />
        ))}
      </Box>
    </StyledSidebarBox>
  );
};

export default SideBar;
