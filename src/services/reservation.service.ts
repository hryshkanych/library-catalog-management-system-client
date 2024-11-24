import axios from 'axios';
import {Reservation} from 'src/models/reservation.type';

const API_URL = 'https://localhost:7239/reservations';

export const getReservations = async (): Promise<Reservation[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const getReservationsByUserId = async (userId: number): Promise<Reservation[]> => {
  try {
    const response = await axios.get(API_URL + `/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const getReservationsByBookId = async (userId: number): Promise<Reservation[]> => {
  try {
    const response = await axios.get(API_URL + `/book/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const addReservation = async (userId: number, bookId: number): Promise<Reservation> => {
  try {
    const response = await axios.post(API_URL, {userId, bookId});
    return response.data;
  } catch (error) {
    console.error('Error adding reservation:', error);
    throw error;
  }
};

export const cancelReservation = async (id: number): Promise<boolean> => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error canceling reservation:', error);
    throw error;
  }
};
