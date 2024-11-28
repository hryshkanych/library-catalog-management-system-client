import { Book } from "./book.type";
import { User } from "./user.type";

export type Action = {
  id: number;
  readerId: number;
  bookId: number;
  startDate: Date;
  endDate?: Date;
  type: 'reservation' | 'borrow';
  isActive: boolean;
  user?: User;
  book?: Book;
};
