import express from 'express';
import cors from 'cors';
import { signUp, signIn, getMe } from './auth';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('Health check accessed - Service is running');
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Authentication routes
app.post('/api/auth/signup', signUp);
app.post('/api/auth/signin', signIn);
app.get('/api/auth/me', getMe);

// Chat endpoint
app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  console.log('Received message:', message);

  res.json({
    response:
      'Message received! This is a fixed response from the backend. The chat functionality is working correctly.',
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend service is running on port ${PORT}`);
  console.log(
    `📊 Health check available at: http://localhost:${PORT}/api/health`
  );
});
