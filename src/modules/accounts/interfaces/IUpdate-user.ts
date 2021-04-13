export interface IUpdateUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  cpf?: string;

  address?: {
    street?: string;
    number?: number;
    neighborhood?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };

  password: string;
  profile_picture?: { filename?: string; url?: string };
}
