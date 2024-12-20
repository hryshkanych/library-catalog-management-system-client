import { Book } from "./book.type";
import { User } from "./user.type";

export type Reservation = {
  id: number;
  readerId: number;
  bookId: number;
  reservationDate: Date;
  expirationDate: Date;
  isActive: boolean;
  user?: User;
  book?: Book;
}