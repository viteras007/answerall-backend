import {Request, Response, NextFunction} from 'express';
import jwt,  { JsonWebTokenError, TokenExpiredError, NotBeforeError } from 'jsonwebtoken';

function verifyToken(req: any, res: Response, next: NextFunction){
  const token = req?.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  if (!token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid token type' });
  }

  const tokenWithoutBearer = token.slice(7);
  
  jwt.verify(tokenWithoutBearer, 'my-secret-key', (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.decoded = decoded;
    next();
  });
}

export default verifyToken;
