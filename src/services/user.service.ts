import axios from 'axios';
import { User } from 'src/models/user.type';

const API_URL = 'https://localhost:7239/users';

export const registerUser = async (username: string, password: string, role: string) => {
  try {
    const response = await axios.post(API_URL + '/register', {username, password, role});
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(API_URL + '/login', {username, password}, {withCredentials: true});
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const getReaders = async (): Promise<User[]> => {
  try {
    const response = await axios.get(API_URL + '/readers');
    return response.data;
  } catch (error) {
    console.error('Error fetching readers.', error);
    throw error;
  }
}
