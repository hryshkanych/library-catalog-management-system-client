import React, { useEffect, useState } from 'react';
import { Box, TableBody, TableHead, TableRow, Chip, useTheme } from '@mui/material';
import { StyledTable, StyledTableContainer, StyledBaseCell, StyledHeaderCell, StyledRow } from 'src/mui-styled-components/styledTable';
import { getReservationsByUserId } from 'src/services/reservation.service';
import { getBorrowsByUserId } from 'src/services/borrow.service';
import { Borrow } from 'src/models/borrow.type';
import { Reservation } from 'src/models/reservation.type';

interface HistoryData {
  type: string;
  startDate: Date;
  expirationDate: Date;
  isActive: boolean;
  book: {
    title: string;
    author: string;
  };
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
          const reservations: Reservation[] = await getReservationsByUserId(Number(userId));
          const borrows: Borrow[] = await getBorrowsByUserId(Number(userId));

          const reservationsData = reservations.map((r) => ({
            type: 'Reservation',
            startDate: r.reservationDate,
            expirationDate: r.expirationDate,
            isActive: r.isActive,
            book: r.book!,
          }));

          const borrowsData = borrows.map((b) => ({
            type: 'Borrow',
            startDate: b.borrowDate,
            expirationDate: b.returnDate,
            isActive: !b.isReturned,
            book: b.book!,
          }));

          const combined = [...reservationsData, ...borrowsData];
          combined.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

          setHistoryData(combined);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
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
                <StyledBaseCell sx={{ fontWeight: 'bold' }}>{entry.type}</StyledBaseCell>
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
