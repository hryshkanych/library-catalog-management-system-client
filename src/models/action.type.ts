import { Book } from "./book.type";
import { User } from "./user.type";

export type Action = {
  id: number;
  userId: number;
  bookId: number;
  startDate: Date;
  endDate?: Date;
  type: 'reservation' | 'borrow';
  user?: User;
  book?: Book;
};
