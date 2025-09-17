import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password }: SignUpData = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: { message: 'Name, email, and password are required' }
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: { message: 'Password must be at least 6 characters' }
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        error: { message: 'User already exists with this email' }
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      }
    });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ user, token });
  } catch (error) {
    console.error('Sign up error:', error);
    res.status(500).json({
      error: { message: 'Internal server error' }
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password }: SignInData = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: { message: 'Email and password are required' }
      });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || !user.password) {
      return res.status(400).json({
        error: { message: 'Invalid credentials' }
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        error: { message: 'Invalid credentials' }
      });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };

    res.json({ user: userResponse, token });
  } catch (error) {
    console.error('Sign in error:', error);
    res.status(500).json({
      error: { message: 'Internal server error' }
    });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        error: { message: 'No token provided' }
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      }
    });

    if (!user) {
      return res.status(401).json({
        error: { message: 'User not found' }
      });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(401).json({
      error: { message: 'Invalid token' }
    });
  }
};