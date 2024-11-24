export type Reservation = {
  id: number;
  userId: number;
  bookId: number;
  reservationDate: Date;
  expirationDate: Date;
  isActive: boolean;
}