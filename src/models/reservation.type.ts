import { Book } from "./book.type";
import { User } from "./user.type";

export type Reservation = {
  id: number;
  userId: number;
  bookId: number;
  reservationDate: Date;
  expirationDate: Date;
  isActive: boolean;
  book?: Book;
  user?: User;
}