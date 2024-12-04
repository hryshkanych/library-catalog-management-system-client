export type User = {
  id: number;
  username: string;
  email: string;
  role: string;
}

export type UserOption = {
  id: number;
  username: string;
  reserve: boolean;
  borrow: boolean;
}
