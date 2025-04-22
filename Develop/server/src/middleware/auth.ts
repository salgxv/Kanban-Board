import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Expecting: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' }); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }

    const user = decoded as JwtPayload;
    (req as any).user = user; // Attach user to request

    next(); // Move to next middleware or route
  });
};