import { Book } from "./book.type";
import { User } from "./user.type";

export type Borrow = {
  id: number;
  userId: number;
  bookId: number;
  borrowDate: Date;
  returnDate: Date;
  isReturned: boolean;
  user?: User;
  book?: Book;
};
