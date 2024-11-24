export type Borrow = {
  id: number;
  userId: number;
  bookId: number;
  borrowDate: Date;
  returnDate: Date;
  isReturned: boolean;
};
