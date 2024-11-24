import axios from 'axios';
import {Book} from 'src/models/book.type';

const API_URL = 'https://localhost:7239/books';

export const getBooks = async (): Promise<Book[]> => {
  try {
    const response = await axios.get<Book[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Failed to fetch books');
  }
};

export const getBookById = async (id: number): Promise<Book> => {
  try {
    const response = await axios.get<Book>(API_URL + `/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Failed to fetch books');
  }
};

export const getGenres = async (): Promise<string[]> => {
  try {
    const response = await axios.get<string[]>(API_URL + '/genres');
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Failed to fetch books');
  }
};
