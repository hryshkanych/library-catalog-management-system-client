import { Book } from "./book.type";
import { User } from "./user.type";

export type Borrow = {
  id: number;
  userId: number;
  bookId: number;
  librarianId: number;
  borrowDate: Date;
  returnDate: Date;
  isReturned: boolean;
  reader?: User;
  book?: Book;
  librarian?: User;
};
