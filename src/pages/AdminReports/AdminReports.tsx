import React, {useState, useEffect} from 'react';
import {Box, Typography, Select, MenuItem, FormControl, InputLabel, CircularProgress, TextField, SelectChangeEvent} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement} from 'chart.js';
import {getLibrarianActivity, getBorrowFrequency, getActiveUsers} from 'src/services/report.service';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {StyledTab, StyledTabs} from 'src/mui-styled-components/styledTabs';
import {generateBarChart, generateLineChart, generatePieChart} from 'src/utils/charts';
import {ChartData} from 'src/types/chartTypes';
import {convertToChartData} from 'src/utils/convertToChartData';
import {subWeeks} from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

const AdminReports: React.FC = () => {
  const theme = useTheme();
  const [selectedChart, setSelectedChart] = useState('line');
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reservationData, setReservationData] = useState<ChartData | null>(null);
  const [borrowData, setBorrowData] = useState<ChartData | null>(null);
  const [userData, setUserData] = useState<ChartData | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(subWeeks(new Date(), 1));
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  useEffect(() => {
    if (startDate && endDate) {
      const fetchReportData = async () => {
        setIsLoading(true);
        try {
          const [librarians, borrows, users] = await Promise.all([
            getLibrarianActivity(startDate.toDateString(), endDate.toDateString()),
            getBorrowFrequency(startDate.toDateString(), endDate.toDateString()),
            getActiveUsers(startDate.toDateString(), endDate.toDateString())
          ]);
          setReservationData(convertToChartData(librarians, 'librarianName'));
          setBorrowData(convertToChartData(borrows, 'bookName'));
          setUserData(convertToChartData(users, 'userName'));
        } catch (error) {
          console.error('Error fetching report data:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchReportData();
    }
    setIsLoading(false);
  }, [startDate, endDate]);

  const handleChartChange = (event: SelectChangeEvent<string>) => {
    setSelectedChart(event.target.value);
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
      sx={{
        padding: '2rem',
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 4.5rem)'
      }}
      className="custom-scrollbar"
    >
      <Typography variant="h4" sx={{mb: 3, color: theme.palette.primary.contrastText}}>
        Admin Reports
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          slots={{textField: TextField}}
          slotProps={{
            textField: {
              sx: {
                '& .MuiInputLabel-root': {
                  color: theme.palette.primary.contrastText
                },
                backgroundColor: theme.palette.secondary.dark,
                color: theme.palette.primary.contrastText
              }
            }
          }}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          slots={{textField: TextField}}
          slotProps={{
            textField: {
              sx: {
                '& .MuiInputLabel-root': {
                  color: theme.palette.primary.contrastText
                },
                backgroundColor: theme.palette.secondary.dark,
                color: theme.palette.primary.contrastText,
                ml: 3
              }
            }
          }}
        />
      </LocalizationProvider>

      <FormControl sx={{width: 200, mb: 3, ml: 3}}>
        <InputLabel sx={{color: theme.palette.primary.contrastText}}>Chart Type</InputLabel>
        <Select
          value={selectedChart}
          onChange={handleChartChange}
          label="Chart Type"
          sx={{backgroundColor: theme.palette.secondary.dark, color: theme.palette.primary.contrastText}}
        >
          <MenuItem value="line">Line Chart</MenuItem>
          <MenuItem value="bar">Bar Chart</MenuItem>
          <MenuItem value="pie">Pie Chart</MenuItem>
        </Select>
      </FormControl>

      <StyledTabs value={tabValue} onChange={handleTabChange} aria-label="report tabs">
        <StyledTab label="Librarians Activity" />
        <StyledTab label="Books Borrow Frequency" />
        <StyledTab label="Users Activity" />
      </StyledTabs>

      {tabValue === 0 && (
        <Box sx={{mt: 2}}>
          {selectedChart === 'line' && reservationData && generateLineChart(reservationData)}
          {selectedChart === 'bar' && reservationData && generateBarChart(reservationData)}
          {selectedChart === 'pie' && reservationData && generatePieChart(reservationData)}
        </Box>
      )}

      {tabValue === 1 && (
        <Box sx={{mt: 2}}>
          {selectedChart === 'line' && borrowData && generateLineChart(borrowData)}
          {selectedChart === 'bar' && borrowData && generateBarChart(borrowData)}
          {selectedChart === 'pie' && borrowData && generatePieChart(borrowData)}
        </Box>
      )}

      {tabValue === 2 && (
        <Box sx={{mt: 2}}>
          {selectedChart === 'line' && userData && generateLineChart(userData)}
          {selectedChart === 'bar' && userData && generateBarChart(userData)}
          {selectedChart === 'pie' && userData && generatePieChart(userData)}
        </Box>
      )}
    </Box>
  );
};

export default AdminReports;
