import axios from 'axios';
import { Borrow } from 'src/models/borrow.type';

const API_URL = 'https://localhost:7239/borrows';

export const getBorrowsByUserId = async (userId: number): Promise<Borrow[]> => {
  try {
    const response = await axios.get(API_URL + `/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const getBorrowsByBookId = async (bookId: number): Promise<Borrow[]> => {
  try {
    const response = await axios.get(API_URL + `/book/${bookId}`);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const addBorrow = async (userId: number, bookId: number): Promise<Borrow> => {
  try {
    const response = await axios.post(API_URL, {userId, bookId});
    return response.data;
  } catch (error) {
    console.error('Error adding reservation:', error);
    throw error;
  }
};

export const returnBook = async (id: number): Promise<boolean> => {
  try {
    const response = await axios.put(`${API_URL}/return/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error canceling reservation:', error);
    throw error;
  }
};
