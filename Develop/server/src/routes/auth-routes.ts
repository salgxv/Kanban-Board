import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  console.log('Login endpoint hit'); // Log when the endpoint is hit

  // Log the request body to see what data is being sent
  console.log('Request body:', req.body);

  const { username, password } = req.body;

  const user = await User.findOne({
    where: { username },
  });

  // Log whether the user was found
  console.log('User found:', user);

  if (!user) {
    console.log('Authentication failed: User not found');
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);

  // Log whether the password is valid
  console.log('Password is valid:', passwordIsValid);

  if (!passwordIsValid) {
    console.log('Authentication failed: Invalid password');
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';

  // Log before generating the JWT token
  console.log('Generating JWT token for user:', username);

  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

  // Log the generated token
  console.log('Generated token:', token);

  return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;