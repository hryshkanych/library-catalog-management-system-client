import { Table, TableCell, TableRow, TableContainer, styled } from '@mui/material';

export const StyledTable = styled(Table)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
}));

export const StyledTableContainer = styled(TableContainer)(() => ({
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', 
  borderRadius: '5px',
}));

export const StyledBaseCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.secondary.main,
  border: 'none',
}));

export const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.secondary.light,
}));

export const StyledRow = styled(TableRow)(({ theme }) => ({
  borderTop: `2px solid ${theme.palette.primary.main}`,
  borderBottom: `2px solid ${theme.palette.primary.main}`,
  '&:last-child': {
    borderBottom: 'none',
  },
}));
