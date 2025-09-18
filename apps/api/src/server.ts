import express from 'express';
import cors from 'cors';
import Groq from 'groq-sdk';
import { signUp, signIn, getMe } from './auth';

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Groq client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

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

// Chat endpoint with Groq integration
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    console.log('Received message:', message);

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Create career advisor prompt
    const systemPrompt = `You are a professional career advisor helping students and professionals with their career development. Your role is to:

1. Provide personalized career guidance based on skills, interests, and goals
2. Suggest relevant educational paths, certifications, and skill development opportunities
3. Offer insights about industry trends and job market conditions
4. Help with resume building, interview preparation, and job search strategies
5. Recommend career transitions and growth opportunities
6. Provide information about different career paths and their requirements

Always be supportive, practical, and encouraging. Provide actionable advice that users can implement. Keep responses focused and relevant to career development.`;

    // Call Groq API
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1000,
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error('No response from Groq API');
    }

    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({
      error: 'Failed to generate response. Please try again later.',
      details:
        process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend service is running on port ${PORT}`);
  console.log(
    `📊 Health check available at: http://localhost:${PORT}/api/health`
  );
});
