import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'cafe-default-secret-key';
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export function generateToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null; // Agar token fake ya expired hua to null
  }
}
