import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.js';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const secretKey = process.env.JWT_SECRET_KEY || 'dev-secret';

  try {
    let user = await User.findOne({ where: { username } });

    if (!user) {
      // ✅ auto-create the user if not found
      const hashed = await bcrypt.hash(password, 10);
      user = await User.create({ username, password: hashed });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Unauthorized' }); // ✅ JSON response
    }

    const token = jwt.sign({ username: user.username, id: user.id }, secretKey, {
      expiresIn: '1h',
    });

    return res.json({ token }); // ✅ returns valid JSON
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' }); // ✅ JSON
  }
});

export default router;