import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Box, Typography, Grid, TextField, AutocompleteRenderInputParams, CircularProgress} from '@mui/material';
import {StyledButton} from 'src/mui-styled-components/styledButton';
import {StyledDataMarker} from 'src/mui-styled-components/styledDataMarker';
import {useTheme} from '@mui/material/styles';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import {StyledMarkedBoxSecond} from 'src/mui-styled-components/styledMarkedBox';
import {Book} from 'src/models/book.type';
import {getBookById} from 'src/services/book.service';
import {useParams} from 'react-router-dom';
import {addReservation, cancelReservation, getReservationsByBookId, getReservationsByUserId} from 'src/services/reservation.service';
import {UserOption} from 'src/models/user.type';
import {getReaders} from 'src/services/user.service';
import {StyledAutocomplete} from 'src/mui-styled-components/styledAutocomplete';
import {addBorrow, getBorrowsByBookId, returnBook} from 'src/services/borrow.service';
import {Borrow} from 'src/models/borrow.type';

const BookDetails: React.FC = () => {
  const theme = useTheme();
  const {id: bookId} = useParams<{id: string}>();

  const [book, setBook] = useState<Book>();
  const [reservationId, setReservationId] = useState<number>();
  const [reserved, setReserved] = useState<boolean>(false);
  const [availability, setAvailability] = useState<boolean>(false);
  const [borrowsByBookId, setBorrowsByBookId] = useState<Borrow[]>([]);
  const [readersOptions, setReadersOptions] = useState<UserOption[]>([]);
  const [selectedReader, setSelectedReader] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');

  const fetchBookDetails = useCallback(async () => {
    setIsLoading(true);

    if (!bookId) {
      setIsLoading(false);
      return;
    }

    try {
      const book = await getBookById(parseInt(bookId));
      setBook(book);

      const userIdNumber = parseInt(userId || '');
      if (userIdNumber && userRole === 'Reader') {
        const reservations = (await getReservationsByUserId(userIdNumber)).filter((r) => r.bookId === parseInt(bookId) && r.isActive);
        if (reservations[0]) {
          setReserved(true);
          setReservationId(reservations[0].id);
        }
      }

      const bookIdNumber = parseInt(bookId);
      if (bookIdNumber) {
        const reservations = (await getReservationsByBookId(bookIdNumber)).filter((r) => r.isActive);
        setAvailability(book?.copiesAvailable > reservations.length);

        const borrows = (await getBorrowsByBookId(bookIdNumber)).filter((b) => !b.isReturned);
        setBorrowsByBookId(borrows);

        const readers = await getReaders();
        const options: UserOption[] = readers.map((r) => {
          return {
            id: r.id,
            username: r.username,
            reserve: reservations.map((r) => r.userId).includes(r.id),
            borrow: borrows.map((b) => b.userId).includes(r.id)
          };
        });
        setReadersOptions(options);
      }
    } catch (error) {
      console.error('Error fetching book details:', error);
    } finally {
      setIsLoading(false);
    }
  }, [bookId, userId, userRole]);

  useEffect(() => {
    fetchBookDetails();
  }, [fetchBookDetails]);

  const borrowed = useMemo(() => {
    return borrowsByBookId.some((b) => b.userId === selectedReader);
  }, [selectedReader, borrowsByBookId]);

  const handleReservation = async () => {
    const numberUserId = parseInt(userId || '');
    const numberBookId = parseInt(bookId || '');
    if (numberBookId && numberUserId) {
      const result = await addReservation(numberUserId, numberBookId);
      setReserved(!!result);
    }
  };

  const handleCancelReservation = async () => {
    if (reservationId) {
      const result = await cancelReservation(reservationId);
      setReserved(!result);
    }
  };

  const handleBorrow = async () => {
    const numberBookId = parseInt(bookId || '');

    if (numberBookId && selectedReader) {
      await addBorrow(selectedReader, numberBookId);
      fetchBookDetails();
    }
  };

  const handleReturn = async () => {
    const numberBookId = parseInt(bookId || '');
    const borrow = borrowsByBookId.find((b) => b.bookId === numberBookId && b.userId === selectedReader);

    if (!!borrow) {
      await returnBook(borrow.id);
      fetchBookDetails();
    }
  };

  if (isLoading) {
    return (
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <CircularProgress size={50} />
      </Box>
    );
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'row', padding: '1.5rem', height: '100%', width: '100%'}}>
      <Box component="img" src={book?.imageURL} alt="Book Cover" sx={{objectFit: 'cover', height: '100%', borderRadius: 2}} />
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
                {label: 'Language', value: book?.language},
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
          {userRole === 'Reader' ? (
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '30%'}}>
              <StyledMarkedBoxSecond bgColor={availability || borrowed ? theme.palette.secondary.dark : theme.palette.error.main}>
                <Typography variant="body1" sx={{color: theme.palette.secondary.contrastText}}>
                  {borrowed ? 'Borrowed' : availability ? 'Available' : 'Unavailable'}
                </Typography>
              </StyledMarkedBoxSecond>
              {availability && !borrowed && (
                <StyledButton
                  onClick={() => (reserved ? handleCancelReservation() : handleReservation())}
                  variant="outlined"
                  startIcon={<ImportContactsIcon sx={{mr: 1}} />}
                >
                  {reserved ? 'Cancel reservation' : 'Reserve Book'}
                </StyledButton>
              )}
            </Box>
          ) : (
            userRole === 'Librarian' && (
              <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '30%'}}>
                <StyledAutocomplete
                  options={readersOptions}
                  onChange={(_, newValue) => {
                    if (!!newValue && typeof newValue === 'object' && 'id' in newValue) setSelectedReader(newValue.id);
                  }}
                  getOptionLabel={(option) => {
                    if (typeof option !== 'string' && 'reserve' in option) {
                      return option.reserve ? `${option.username} : reserved` : option.username;
                    }
                    return '';
                  }}
                  renderOption={(props, option) => (
                    <li {...props}>
                      {option.username}
                      {option.borrow && ': borrowed'}
                      {option.reserve && ': reserved'}
                    </li>
                  )}
                  renderInput={(params: AutocompleteRenderInputParams) => <TextField {...params} label="Reader" variant="outlined" />}
                  sx={{width: 300}}
                />

                {selectedReader && (
                  <StyledButton
                    disabled={!availability}
                    onClick={() => (borrowed ? handleReturn() : handleBorrow())}
                    variant="outlined"
                    startIcon={<ImportContactsIcon sx={{mr: 1}} />}
                    sx={{width: 250}}
                  >
                    {borrowed ? 'Return the book' : 'Borrow the book'}
                  </StyledButton>
                )}
              </Box>
            )
          )}
        </Box>
        <Box sx={{backgroundColor: theme.palette.primary.light, borderRadius: '1.5rem', padding: 3}}>
          <Typography variant="h5" sx={{color: theme.palette.secondary.light, mb: 1}}>
            Description
          </Typography>
          <Typography variant="body1" sx={{color: theme.palette.secondary.main, lineHeight: 1.5}}>
            {book?.description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BookDetails;
