import React from 'react';
import {Box, CardContent, Typography, IconButton} from '@mui/material';
import {Favorite} from '@mui/icons-material';
import {StyledGridBox} from 'src/mui-styled-components/styledGridBox';
import {StyledCard} from 'src/mui-styled-components/styledCard';
import {StyledMarkedBox} from 'src/mui-styled-components/styledMarkedBox';
import {useTheme} from '@mui/material/styles';
import {StyledMainContentBox} from 'src/mui-styled-components/styledMainContentBox';
import { Book } from 'src/models/book.type';

interface BookDashboardProps {
  books: Book[];
}

const BookDashboard: React.FC<BookDashboardProps> = ({books}) => {
  const theme = useTheme();

  return (
    <StyledMainContentBox>
      <StyledGridBox>
        {books.map((book, index) => (
          <StyledCard key={index}>
            <img
              src={`https://picsum.photos/200/300?random=${index}`}
              alt={`Book ${index + 1}`}
              style={{
                width: '100%',
                height: '60%',
                objectFit: 'cover'
              }}
            />
            <CardContent sx={{display: 'flex', flexDirection: 'column', padding: '0.5rem'}}>
              <Typography variant="h6" sx={{color: theme.palette.secondary.contrastText, marginBottom: '0.25rem'}}>
                {book.title}
              </Typography>
              <Typography variant="body2" sx={{color: theme.palette.secondary.main, marginBottom: '0.5rem'}}>
                {book.author}
              </Typography>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <StyledMarkedBox>
                  <Typography variant="body2" sx={{color: theme.palette.secondary.contrastText}}>
                    {book.copiesAvailable > 0 ? 'Available' : 'Rented'}
                  </Typography>
                </StyledMarkedBox>
                <Typography variant="body2" sx={{color: theme.palette.primary.contrastText, cursor: 'pointer'}}>
                  View
                </Typography>
                <IconButton sx={{marginLeft: '0.5rem', color: theme.palette.secondary.main}}>
                  <Favorite />
                </IconButton>
              </Box>
            </CardContent>
          </StyledCard>
        ))}
      </StyledGridBox>
    </StyledMainContentBox>
  );
};

export default BookDashboard;
