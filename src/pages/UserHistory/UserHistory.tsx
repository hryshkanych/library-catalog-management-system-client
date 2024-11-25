import React, { useEffect, useState } from 'react';
import { Box, TableBody, TableHead, TableRow, Chip, useTheme } from '@mui/material';
import { StyledTable, StyledTableContainer, StyledBaseCell, StyledHeaderCell, StyledRow } from 'src/mui-styled-components/styledTable';
import { getReservationsByUserId } from 'src/services/reservation.service';
import { getBorrowsByUserId } from 'src/services/borrow.service';
import { getBookById } from 'src/services/book.service'; 
import { Book } from 'src/models/book.type';

interface HistoryData {
    type: string;
    startDate: Date;
    expirationDate: Date;
    isActive: boolean;
    book: Book;
}

const UserHistory: React.FC = () => {
  const [historyData, setHistoryData] = useState<HistoryData[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const userId = localStorage.getItem('userId');
  const theme = useTheme();

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const reservations = await getReservationsByUserId(Number(userId));
          const borrows = await getBorrowsByUserId(Number(userId));

          const reservationsWithBooks = await Promise.all(
            reservations.map(async (r) => {
              const book = await getBookById(r.bookId); 
              return {
                type: 'Reservation',
                startDate: r.reservationDate,
                expirationDate: r.expirationDate,
                isActive: r.isActive,
                book,
              };
            })
          );

          const borrowsWithBooks = await Promise.all(
            borrows.map(async (b) => {
              const book = await getBookById(b.bookId); 
              return {
                type: 'Borrow',
                startDate: b.borrowDate,
                expirationDate: b.returnDate,
                isActive: !b.isReturned,
                book,
              };
            })
          );

          const combined = [
            ...reservationsWithBooks,
            ...borrowsWithBooks,
          ];

          combined.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

          setHistoryData(combined);
          setLoading(false); 
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <Box sx={{ padding: '1.5rem', width: '100%' }}>
      <StyledTableContainer>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledHeaderCell>Type</StyledHeaderCell>
              <StyledHeaderCell>Book</StyledHeaderCell>
              <StyledHeaderCell>Start Date</StyledHeaderCell>
              <StyledHeaderCell>Expiration Date</StyledHeaderCell>
              <StyledHeaderCell>Status</StyledHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyData.map((entry, index) => (
              <StyledRow key={index}>
                <StyledBaseCell sx={{ fontWeight: 'bold'}}>{entry.type}</StyledBaseCell>
                <StyledBaseCell>
                  {entry.book.title} by {entry.book.author}
                </StyledBaseCell>
                <StyledBaseCell>{new Date(entry.startDate).toLocaleDateString()}</StyledBaseCell>
                <StyledBaseCell>{new Date(entry.expirationDate).toLocaleDateString()}</StyledBaseCell>
                <StyledBaseCell>
                  <Chip
                    label={entry.isActive ? 'Active' : 'Not Active'}
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      color: entry.isActive ? theme.palette.secondary.contrastText : theme.palette.primary.light,
                      backgroundColor: entry.isActive ? theme.palette.secondary.dark : theme.palette.primary.contrastText,
                      padding: '0.5rem',
                    }}
                  />
                </StyledBaseCell>
              </StyledRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    </Box>
  );
};

export default UserHistory;
