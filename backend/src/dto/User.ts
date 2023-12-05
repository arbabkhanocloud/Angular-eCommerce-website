export type userDto = {
  fullName: string;
  username: string;
  password: string;
  isAdmin: boolean;
};

declare namespace Express {
  interface Request {
    user?: userDto;
  }
}
