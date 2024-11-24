import {Box, CircularProgress, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import {Action} from 'src/models/action.type';
import {StyledButton} from 'src/mui-styled-components/styledButton';
import {addBorrow, getBorrows, returnBook} from 'src/services/borrow.service';
import {getReservations} from 'src/services/reservation.service';
import theme from 'src/theme/theme';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import {enqueueSnackbar} from 'notistack';

const ReadersActivity: React.FC = () => {
  const [actions, setActions] = useState<Action[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const activeBorrows = (await getBorrows()).filter((b) => !b.isReturned);
      const activeReservations = (await getReservations()).filter((r) => r.isActive);

      const fetchedActions: Action[] = [
        ...activeBorrows.map((b) => ({
          id: b.id,
          userId: b.userId,
          bookId: b.bookId,
          startDate: b.borrowDate,
          type: 'borrow' as const,
          user: b.user,
          book: b.book
        })),
        ...activeReservations.map((r) => ({
          id: r.id,
          userId: r.userId,
          bookId: r.bookId,
          startDate: r.reservationDate,
          endDate: r.expirationDate,
          type: 'reservation' as const,
          user: r.user,
          book: r.book
        }))
      ];

      fetchedActions.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

      setActions(fetchedActions);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBorrow = async (action: Action) => {
    try {
      await addBorrow(action.userId, action.bookId);
      enqueueSnackbar(`Book borrowed successfully: "${action.book?.title}" by ${action.user?.username} (${action.user?.email})`, {
        variant: 'success'
      });
      fetchData();
    } catch (error) {
      console.error('Error borrowing book:', error);
      enqueueSnackbar(`Failed to borrow book for ${action.user?.username}. Please try again.`, {variant: 'error'});
    }
  };

  const handleReturn = async (action: Action) => {
    try {
      await returnBook(action.id);
      enqueueSnackbar(`Book returned successfully: "${action.book?.title}" by ${action.user?.username} (${action.user?.email})`, {
        variant: 'success'
      });
      fetchData();
    } catch (error) {
      console.error('Error returning book:', error);
      enqueueSnackbar(`Failed to return book for ${action.user?.username}. Please try again.`, {variant: 'error'});
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
    <Box
      className="custom-scrollbar"
      sx={{
        color: theme.palette.secondary.light,
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 4.5rem)',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '3rem'
      }}
    >
      {actions.length < 1 && (
        <Typography variant="h6" sx={{textAlign: 'center', marginTop: '2rem'}}>
          No activity available at the moment.
        </Typography>
      )}
      {actions.map((action) => (
        <Box
          key={action.id}
          sx={{
            padding: 2,
            marginBottom: 2,
            borderRadius: 2,
            width: '60%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            backgroundColor: theme.palette.primary.light,
            boxShadow: '0px 0.25rem 0.375rem rgba(0, 0, 0, 0.25)'
          }}
        >
          <Box>
            <Typography variant="h6">Action: {action.type}</Typography>
            <Typography>
              <strong>User:</strong> {action.user?.username} ({action.user?.email})
            </Typography>
            <Typography>
              <strong>Book:</strong> {action.book?.title} by {action.book?.author}
            </Typography>
            <Typography>
              <strong>Start Date:</strong> {new Date(action.startDate).toLocaleDateString()}
            </Typography>
            {action.endDate && (
              <Typography>
                <strong>End Date:</strong> {new Date(action.endDate).toLocaleDateString()}
              </Typography>
            )}
          </Box>
          {action.type === 'reservation' && (
            <StyledButton onClick={() => handleBorrow(action)} variant="outlined" sx={{width: '15rem'}} startIcon={<ImportContactsIcon />}>
              Borrow the book
            </StyledButton>
          )}
          {action.type === 'borrow' && (
            <StyledButton onClick={() => handleReturn(action)} variant="outlined" sx={{width: '15rem'}} startIcon={<ImportContactsIcon />}>
              Return the book
            </StyledButton>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ReadersActivity;
