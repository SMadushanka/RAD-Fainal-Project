import jwt, { SignOptions } from 'jsonwebtoken';

export const generateToken = (userId: string): string => {
  const options: SignOptions = {
    expiresIn: String(process.env.JWT_EXPIRE || '7d') as any,
  };
  return jwt.sign({ userId }, process.env.JWT_SECRET!, options);
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    return null;
  }
};

export const decodeToken = (token: string): any => {
  return jwt.decode(token);
};
