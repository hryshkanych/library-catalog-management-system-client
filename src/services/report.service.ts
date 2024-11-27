import axios from 'axios';
import { ActiveUserReport, BookBorrowFrequency, LibrarianActivityReport } from 'src/models/report.type';

const API_URL = 'https://localhost:7239/reports';

export const getBorrowFrequency = async (startDate: string, endDate: string): Promise<BookBorrowFrequency[]> => {
  try {
    const response = await axios.get(`${API_URL}/borrow-frequency`, {
      params: { startDate, endDate },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching borrow frequency report:', error);
    throw error;
  }
};

export const getActiveUsers = async (startDate: string, endDate: string): Promise<ActiveUserReport[]> => {
  try {
    const response = await axios.get(`${API_URL}/active-users`, {
      params: { startDate, endDate },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching active users report:', error);
    throw error;
  }
};

export const getLibrarianActivity = async (startDate: string, endDate: string): Promise<LibrarianActivityReport[]> => {
  try {
    const response = await axios.get(`${API_URL}/librarian-activity`, {
      params: { startDate, endDate },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching librarian activity report:', error);
    throw error;
  }
};
