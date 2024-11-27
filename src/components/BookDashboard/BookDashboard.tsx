import React, {SetStateAction, useEffect, useRef, useState} from 'react';
import {Box, CardContent, Typography, IconButton, CircularProgress, Pagination} from '@mui/material';
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
  isLoading: boolean;
}

const BookDashboard: React.FC<BookDashboardProps> = ({books, likedBooks, setLikedBooks, isLoading}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const role = localStorage.getItem('userRole');

  const gridRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(12);

  useEffect(() => {
    localStorage.setItem('likedBooks', JSON.stringify(likedBooks));
  }, [likedBooks]);

  useEffect(() => {
    const calculateBooksPerPage = () => {
      if (gridRef.current && itemRef.current) {
        const containerWidth = gridRef.current.offsetWidth;
        const gridItemWidth = itemRef.current.offsetWidth;
        const columns = Math.floor(containerWidth / gridItemWidth);
        const rows = 3;
        setBooksPerPage(columns * rows);
      }
    };

    calculateBooksPerPage();

    const resizeObserver = new ResizeObserver(calculateBooksPerPage);
    if (gridRef.current) {
      resizeObserver.observe(gridRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  const startIndex = (currentPage - 1) * booksPerPage;
  const displayedBooks = books.slice(startIndex, startIndex + booksPerPage);

  const handleLikeToggle = (bookId: number) => {
    setLikedBooks((prevLikedBooks) => 
      prevLikedBooks.includes(bookId) 
      ? prevLikedBooks.filter((id) => id !== bookId) 
      : [...prevLikedBooks, bookId]
    );
  };

  if (isLoading) {
    return (
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <CircularProgress size={50} />
      </Box>
    );
  }

  return (
    <StyledMainContentBox
      className="custom-scrollbar"
      sx={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', minHeight: 'calc(100vh - 4.5rem)'}}
    >
      <StyledGridBox ref={gridRef}>
        {displayedBooks.map((book, index) => (
          <StyledCard key={index} ref={index === 0 ? itemRef : null}>
            <img
              src={book.imageURL}
              alt={`Book ${index + 1}`}
              style={{
                width: '100%',
                height: '60%',
                objectFit: 'cover'
              }}
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', padding: '0.5rem' }}>
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
              <Typography variant="body2" sx={{ color: theme.palette.secondary.main, marginBottom: '0.5rem' }}>
                {book.author}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <StyledMarkedBox>
                  <Typography variant="body2" sx={{ color: theme.palette.secondary.contrastText }}>
                    {book.copiesAvailable > 0 ? 'Available' : 'Rented'}
                  </Typography>
                </StyledMarkedBox>
                {role === 'Admin' && (
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.primary.contrastText, cursor: 'pointer', paddingRight: '20px' }}
                    onClick={() => navigate(`/books/${book.id}`)}
                  >
                    Edit
                  </Typography>
                )}
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.primary.contrastText, cursor: 'pointer', paddingRight: '10px' }}
                  onClick={() => navigate(`/book/${book.id}`)}
                >
                  View
                </Typography>
                {role === 'Reader' && (
                  <IconButton sx={{ color: theme.palette.secondary.main, padding: 0, margin: 0 }} onClick={() => handleLikeToggle(book.id)}>
                    {likedBooks.includes(book.id) ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                )}
              </Box>
            </CardContent>
          </StyledCard>
        ))}
      </StyledGridBox>
      <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
        <Pagination
          count={Math.ceil(books.length / booksPerPage)}
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
          color="primary"
          sx={{
            '& .MuiPaginationItem-text': {
              color: theme.palette.secondary.light
            }
          }}
        />
      </Box>
    </StyledMainContentBox>
  );
};

export default BookDashboard;
