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

  const userId = localStorage.getItem('userId');

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const activeBorrows = await getBorrows();
      const activeReservations = await getReservations();

      const fetchedActions: Action[] = [
        ...activeBorrows.map((b) => ({
          id: b.id,
          readerId: b.readerId,
          bookId: b.bookId,
          startDate: b.borrowDate,
          type: 'borrow' as const,
          isActive: !b.isReturned,
          user: b.reader,
          book: b.book
        })),
        ...activeReservations.map((r) => ({
          id: r.id,
          readerId: r.readerId,
          bookId: r.bookId,
          startDate: r.reservationDate,
          endDate: r.expirationDate,
          type: 'reservation' as const,
          isActive: r.isActive,
          user: r.user,
          book: r.book
        }))
      ];

      const activeActions = fetchedActions.filter((action) => action.isActive);
      const inactiveActions = fetchedActions.filter((action) => !action.isActive);

      activeActions.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
      inactiveActions.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

      const sortedActions = [...activeActions, ...inactiveActions];

      setActions(sortedActions);
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
      const librarianId = parseInt(userId || '');

      await addBorrow(action.readerId, action.bookId, librarianId);
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
            <Typography variant="h6">{action.type.toUpperCase()}</Typography>
            <Typography>
              <strong>User:</strong> {action.user?.username} ({action.user?.email})
            </Typography>
            <Typography>
              <strong>Book:</strong> {action.book?.title} by {action.book?.author}
            </Typography>
            <Typography>
              <strong>Start Date:</strong> {new Date(action.startDate).toLocaleDateString()}{' '}
              {new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', hour12: true}).format(new Date(action.startDate))}
            </Typography>
            {action.endDate && (
              <Typography>
                <strong>End Date:</strong> {new Date(action.endDate).toLocaleDateString()}{' '}
                {new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', hour12: true}).format(new Date(action.endDate))}
              </Typography>
            )}
          </Box>
          {action.type === 'reservation' && action.isActive && (
            <StyledButton onClick={() => handleBorrow(action)} variant="outlined" sx={{minWidth: '15rem'}} startIcon={<ImportContactsIcon />}>
              Borrow the book
            </StyledButton>
          )}
          {action.type === 'borrow' && action.isActive && (
            <StyledButton onClick={() => handleReturn(action)} variant="outlined" sx={{minWidth: '15rem'}} startIcon={<ImportContactsIcon />}>
              Return the book
            </StyledButton>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ReadersActivity;
