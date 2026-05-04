import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ quiet: true });

const JWT_SECRET = process.env.JWT_SECRET ?? '';
if (!JWT_SECRET) throw new Error('JWT_SECRET is not set');


export const generateToken = (payload: any) => {
  // Generamos el token
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

export const verifyToken = (token: string) => {
  // Verificamos el token
  return jwt.verify(token, JWT_SECRET);
}