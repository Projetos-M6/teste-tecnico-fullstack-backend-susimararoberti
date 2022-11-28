export interface IUser {
  id: string;
  name: string;
  emails: string;
  phones: number;
  created_at: Date;
}

export interface IUserRequest {
  name: string;
  emails: string;
  phones: number;
}
