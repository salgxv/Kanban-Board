import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const secretKey = process.env.JWT_SECRET_KEY || '';

  try {
    let user = await User.findOne({ where: { username } });

    if (!user) {
      // 👇 Create the user if not found
      const hashed = await bcryptjs.hash(password, 10);
      user = await User.create({ username, password: hashed });
      console.log('✅ New user created:', username);
    } else {
      const passwordIsValid = await bcryptjs.compare(password, user.password);
      if (!passwordIsValid) {
        console.log('❌ Wrong password');
        return res.status(401).json({ message: 'Authentication failed' });
      }
    }

    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    console.log('✅ JWT created:', token);
    return res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;