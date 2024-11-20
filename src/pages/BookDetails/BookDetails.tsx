import React from 'react';
import {Box, Typography, Grid} from '@mui/material';
import {StyledButton} from 'src/mui-styled-components/styledButton';
import {StyledDataMarker} from 'src/mui-styled-components/styledDataMarker';
import {useTheme} from '@mui/material/styles';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import {StyledMarkedBoxSecond} from 'src/mui-styled-components/styledMarkedBox';

const BookDetails: React.FC = () => {
  const theme = useTheme();

  const book = {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    language: 'English',
    year: 2023,
    isbn: '123-456-789',
    description:
      'This is a detailed description of the book. It provides an overview of the story, main characters, and themes. This is a detailed description of the book. It provides an overview of the story, main characters, and themes.This is a detailed description of the book. It provides an overview of the story, main characters, and themes.This is a detailed description of the book. It provides an overview of the story, main characters, and themes.This is a detailed description of the book. It provides an overview of the story, main characters, and themes.This is a detailed description of the book. It provides an overview of the story, main characters, and themes.This is a detailed description of the book. It provides an overview of the story, main characters, and themes.This is a detailed description of the book. It provides an overview of the story, main characters, and themes.',
    image: `https://picsum.photos/400/600?random=1`
  };

  return (
    <Box sx={{display: 'flex', flexDirection: 'row', padding: '1.5rem', height: '100%', width: '100%'}}>
      <Box component="img" src={book.image} alt="Book Cover" sx={{objectFit: 'cover', height: '100%', borderRadius: 2}} />
      <Box sx={{flex: 2, ml: 4, mt: 4, display: 'flex', flexDirection: 'column'}}>
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', mb: 4}}>
          <Box sx={{width: '70%'}}>
            <Typography sx={{fontSize: '1.65rem', color: theme.palette.secondary.contrastText, mb: 2}}>{book.title}</Typography>
            <Typography variant="h5" sx={{color: theme.palette.secondary.main, mb: 4}}>
              {book.author}
            </Typography>
            <Grid container spacing={3}>
              {[
                {label: 'Genre', value: book.genre},
                {label: 'Language', value: book.language},
                {label: 'Year', value: book.year},
                {label: 'ISBN', value: book.isbn}
              ].map((attr, index) => (
                <Grid item key={index}>
                  <Typography variant="h6" sx={{display: 'block', color: theme.palette.secondary.main, mb: 0.5}}>
                    {attr.label}
                  </Typography>
                  <StyledDataMarker>
                    <Typography variant="h6" sx={{color: theme.palette.primary.dark, fontWeight: 600}}>
                      {attr.value}
                    </Typography>
                  </StyledDataMarker>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '30%'}}>
            <StyledMarkedBoxSecond>
              <Typography variant="body1" sx={{color: theme.palette.secondary.contrastText}}>
                Avaliable
              </Typography>
            </StyledMarkedBoxSecond>
            <StyledButton variant="outlined" startIcon={<ImportContactsIcon sx={{mr: 1}} />}>
              Reserve Book
            </StyledButton>
          </Box>
        </Box>
        <Box sx={{backgroundColor: theme.palette.primary.light, borderRadius: '1.5rem', padding: 3}}>
          <Typography variant="h5" sx={{color: theme.palette.secondary.light, mb: 1}}>
            Description
          </Typography>
          <Typography variant="body1" sx={{color: theme.palette.secondary.main, lineHeight: 1.5}}>
            {book.description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BookDetails;
