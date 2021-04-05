export interface IUpdateUser {
  _id: string;

  name: string;

  email: string;

  password: string;

  profile_picture?: { filename?: string; url?: string };

  updated_at: Date;
}
