
import { verifyToken } from '../utils/jwt.js';


export function requireAuth(req, res, next) {
  
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({
      data: null,
      error: { code: 'UNAUTHORIZED', message: 'Authentication required. Please sign in.' }
    });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({
      data: null,
      error: { code: 'INVALID_TOKEN', message: 'Session expired or invalid token. Please sign in again.' }
    });
  }

  
  req.user = decoded;
  next();
}


export function optionalAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : null;

  if (token) {
    const decoded = verifyToken(token);
    if (decoded) req.user = decoded;
  }

  next();
}