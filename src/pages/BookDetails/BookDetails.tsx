import React, {useEffect, useState} from 'react';
import {Box, Typography, Grid} from '@mui/material';
import {StyledButton} from 'src/mui-styled-components/styledButton';
import {StyledDataMarker} from 'src/mui-styled-components/styledDataMarker';
import {useTheme} from '@mui/material/styles';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import {StyledMarkedBoxSecond} from 'src/mui-styled-components/styledMarkedBox';
import {Book} from 'src/models/book.type';
import {getBookById} from 'src/services/book.service';
import {useParams} from 'react-router-dom';
import {addReservation, cancelReservation, getReservationsByUserId} from 'src/services/reservation.service';

const BookDetails: React.FC = () => {
  const theme = useTheme();
  const {id: bookId} = useParams<{id: string}>();
  const [book, setBook] = useState<Book>();
  const [reservationId, setReservationId] = useState<number>();
  const [bookIsReserved, setBookIsReserved] = useState<boolean>(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      const book = await getBookById(parseInt(bookId || ''));
      setBook(book);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchReservations = async () => {
      const userIdNumber = parseInt(userId || '');
      if (userIdNumber) {
        const reservation = (await getReservationsByUserId(userIdNumber)).filter((r) => r.bookId === parseInt(bookId || '') && r.isActive);
        if (reservation[0]) {
          setBookIsReserved(true);
          setReservationId(reservation[0].id);
        }
      }
    };

    fetchReservations();
  });

  const handleReservation = async () => {
    const numberUserId = parseInt(userId || '');
    const numberBookId = parseInt(bookId || '');
    if (numberBookId && numberUserId) {
      const result = await addReservation(numberUserId, numberBookId);
      setBookIsReserved(!!result);
    }
  };

  const handleCancelReservation = async () => {
    if (reservationId) {
      const result = await cancelReservation(reservationId);
      setBookIsReserved(!result);
    }
  };

  return (
    <Box sx={{display: 'flex', flexDirection: 'row', padding: '1.5rem', height: '100%', width: '100%'}}>
      <Box component="img" src="https://picsum.photos/400/600?random=1" alt="Book Cover" sx={{objectFit: 'cover', height: '100%', borderRadius: 2}} />
      <Box sx={{flex: 2, ml: 4, mt: 4, display: 'flex', flexDirection: 'column'}}>
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', mb: 4}}>
          <Box sx={{width: '70%'}}>
            <Typography sx={{fontSize: '1.65rem', color: theme.palette.secondary.contrastText, mb: 2}}>{book?.title}</Typography>
            <Typography variant="h5" sx={{color: theme.palette.secondary.main, mb: 4}}>
              {book?.author}
            </Typography>
            <Grid container spacing={3}>
              {[
                {label: 'Genre', value: book?.genre},
                {label: 'Language', value: 'English'},
                {label: 'Year', value: book?.publishedDate ? new Date(book?.publishedDate).getUTCFullYear() : ''},
                {label: 'ISBN', value: book?.isbn}
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
            <StyledMarkedBoxSecond
              bgColor={!book?.copiesAvailable || book.copiesAvailable < 1 ? theme.palette.error.main : theme.palette.secondary.dark}
            >
              <Typography variant="body1" sx={{color: theme.palette.secondary.contrastText}}>
                {book?.copiesAvailable && book.copiesAvailable > 0 ? 'Available' : 'Unavailable'}
              </Typography>
            </StyledMarkedBoxSecond>
            {book?.copiesAvailable && book?.copiesAvailable > 0 && (
              <StyledButton
                onClick={() => (bookIsReserved ? handleCancelReservation() : handleReservation())}
                variant="outlined"
                startIcon={<ImportContactsIcon sx={{mr: 1}} />}
              >
                {bookIsReserved ? 'Cancel reservation' : 'Reserve Book'}
              </StyledButton>
            )}
          </Box>
        </Box>
        <Box sx={{backgroundColor: theme.palette.primary.light, borderRadius: '1.5rem', padding: 3}}>
          <Typography variant="h5" sx={{color: theme.palette.secondary.light, mb: 1}}>
            Description
          </Typography>
          <Typography variant="body1" sx={{color: theme.palette.secondary.main, lineHeight: 1.5}}>
            This is a detailed description of the book. It provides an overview of the story, main characters, and themes. This is a detailed
            description of the book. It provides an overview of the story, main characters, and themes.This is a detailed description of the book. It
            provides an overview of the story, main characters, and themes.This is a detailed description of the book. It provides an overview of the
            story, main characters, and themes.This is a detailed description of the book. It provides an overview of the story, main characters, and
            themes.This is a detailed description of the book. It provides an overview of the story, main characters, and themes.This is a detailed
            description of the book. It provides an overview of the story, main characters, and themes.This is a detailed description of the book. It
            provides an overview of the story, main characters, and themes.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BookDetails;
