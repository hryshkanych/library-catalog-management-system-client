import React, {SetStateAction, useEffect} from 'react';
import {Box, CardContent, Typography, IconButton} from '@mui/material';
import {Favorite, FavoriteBorder} from '@mui/icons-material';
import {StyledGridBox} from 'src/mui-styled-components/styledGridBox';
import {StyledCard} from 'src/mui-styled-components/styledCard';
import {StyledMarkedBox} from 'src/mui-styled-components/styledMarkedBox';
import {useTheme} from '@mui/material/styles';
import {StyledMainContentBox} from 'src/mui-styled-components/styledMainContentBox';
import {useNavigate} from 'react-router-dom';
import {Book} from 'src/models/book.type';

interface BookDashboardProps {
  books: Book[];
  likedBooks: number[];
  setLikedBooks: React.Dispatch<SetStateAction<number[]>>;
}

const BookDashboard: React.FC<BookDashboardProps> = ({books, likedBooks, setLikedBooks}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const role = localStorage.getItem('userRole');

  useEffect(() => {
    localStorage.setItem('likedBooks', JSON.stringify(likedBooks));
  }, [likedBooks]);

  const handleLikeToggle = (bookId: number) => {
    setLikedBooks((prevLikedBooks) => (prevLikedBooks.includes(bookId) ? prevLikedBooks.filter((id) => id !== bookId) : [...prevLikedBooks, bookId]));
  };

  return (
    <StyledMainContentBox className="custom-scrollbar">
      <StyledGridBox>
        {books.map((book, index) => (
          <StyledCard key={index}>
            <img
              src={book.imageURL}
              alt={`Book ${index + 1}`}
              style={{
                width: '100%',
                height: '60%',
                objectFit: 'cover'
              }}
            />
            <CardContent sx={{display: 'flex', flexDirection: 'column', padding: '0.5rem'}}>
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.secondary.contrastText,
                  marginBottom: '0.25rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%'
                }}
              >
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
                <Typography
                  variant="body2"
                  sx={{color: theme.palette.primary.contrastText, cursor: 'pointer'}}
                  onClick={() => navigate(`/book/${book.id}`)}
                >
                  View
                </Typography>
                {role === 'Reader' && (
                  <IconButton sx={{marginLeft: '0.5rem', color: theme.palette.secondary.main}} onClick={() => handleLikeToggle(book.id)}>
                    {likedBooks.includes(book.id) ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                )}
              </Box>
            </CardContent>
          </StyledCard>
        ))}
      </StyledGridBox>
    </StyledMainContentBox>
  );
};

export default BookDashboard;
