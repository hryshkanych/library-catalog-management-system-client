import axios from 'axios';

const API_URL = 'https://localhost:7239/books';

export interface Book {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
  isbn: string;
  copiesAvailable: number;
  genre: string;
}

export const getBooks = async (): Promise<Book[]> => {
  try {
    const response = await axios.get<Book[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Failed to fetch books');
  }
};

