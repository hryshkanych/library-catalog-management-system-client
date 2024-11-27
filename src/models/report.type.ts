export type BookBorrowFrequency = {
  bookName: string;
  borrowCount: number;
}

export type ActiveUserReport = {
  userName: string;
  borrowCount: number;
}

export type LibrarianActivityReport = {
  librarianName: string;
  borrowCount: number;
}