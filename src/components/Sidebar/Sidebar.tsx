import React from 'react';
import {Box, Divider, Typography} from '@mui/material';
import {StyledFormControlLabel} from 'src/mui-styled-components/styledCheckbox';
import {StyledCheckbox} from 'src/mui-styled-components/styledCheckbox';
import {StyledSidebarBox} from 'src/mui-styled-components/styledSidebarBox';

interface SideBarProps {
  isVisible: boolean;
  availability: {available: boolean; rented: boolean};
  languages: {english: boolean; spanish: boolean; french: boolean};
  genres: {fiction: boolean; nonFiction: boolean; mystery: boolean; fantasy: boolean; romance: boolean};
  handleAvailabilityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLanguagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGenresChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SideBar: React.FC<SideBarProps> = ({
  isVisible,
  availability,
  languages,
  genres,
  handleAvailabilityChange,
  handleLanguagesChange,
  handleGenresChange
}) => {
  return (
    <StyledSidebarBox isVisible={isVisible}>
      <Box sx={{padding: '1rem'}}>
        <Typography variant="h6" sx={{marginBottom: '1rem', color: 'secondary.light'}}>
          Availability
        </Typography>
        <StyledFormControlLabel
          control={<StyledCheckbox checked={availability.available} onChange={handleAvailabilityChange} name="available" />}
          label="Available"
        />
        <StyledFormControlLabel
          control={<StyledCheckbox checked={availability.rented} onChange={handleAvailabilityChange} name="rented" />}
          label="Rented"
        />
        <Divider sx={{margin: '1rem 0'}} />

        <Typography variant="h6" sx={{marginBottom: '1rem', color: 'secondary.light'}}>
          Languages
        </Typography>
        <StyledFormControlLabel
          control={<StyledCheckbox checked={languages.english} onChange={handleLanguagesChange} name="english" />}
          label="English"
        />
        <StyledFormControlLabel
          control={<StyledCheckbox checked={languages.spanish} onChange={handleLanguagesChange} name="spanish" />}
          label="Spanish"
        />
        <StyledFormControlLabel
          control={<StyledCheckbox checked={languages.french} onChange={handleLanguagesChange} name="french" />}
          label="French"
        />
        <Divider sx={{margin: '1rem 0'}} />

        <Typography variant="h6" sx={{marginBottom: '1rem', color: 'secondary.light'}}>
          Genres
        </Typography>
        <StyledFormControlLabel control={<StyledCheckbox checked={genres.fiction} onChange={handleGenresChange} name="fiction" />} label="Fiction" />
        <StyledFormControlLabel
          control={<StyledCheckbox checked={genres.nonFiction} onChange={handleGenresChange} name="nonFiction" />}
          label="Non-Fiction"
        />
        <StyledFormControlLabel control={<StyledCheckbox checked={genres.mystery} onChange={handleGenresChange} name="mystery" />} label="Mystery" />
        <StyledFormControlLabel control={<StyledCheckbox checked={genres.fantasy} onChange={handleGenresChange} name="fantasy" />} label="Fantasy" />
        <StyledFormControlLabel control={<StyledCheckbox checked={genres.romance} onChange={handleGenresChange} name="romance" />} label="Romance" />
      </Box>
    </StyledSidebarBox>
  );
};

export default SideBar;
