export interface IContactRequest {
  userId: string;
  name: string;
  email: string;
  phone: string;
}

export interface IContactId {
  id: string;
}

export interface IContactUpdate {
  name?: string;
  email?: string;
  phone?: string;
  id: string;
}
