import { sign } from 'jsonwebtoken';

export const generateToken = (id: string) => {
  return sign({}, process.env.JWT_KEY, {
    subject: id,
    expiresIn: '1d',
  });
};
