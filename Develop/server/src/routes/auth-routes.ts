import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  console.log('Login endpoint hit'); 

  console.log('Request body:', req.body);

  const { username, password } = req.body;

  const user = await User.findOne({
    where: { username },
  });

  console.log('User found:', user);

  if (!user) {
    console.log('User not found — creating one.');
    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashed });
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    return res.json({ token });
  }
  const passwordIsValid = await bcrypt.compare(password, user.password);

  console.log('Password is valid:', passwordIsValid);

  if (!passwordIsValid) {
    console.log('Authentication failed: Invalid password');
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';

  
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