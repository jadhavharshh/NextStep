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
    const { message, userContext } = req.body;
    console.log('Received message:', message);
    console.log('User context:', userContext);

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Create career advisor prompt with user context
    let systemPrompt = `You are a professional career advisor helping students and professionals with their career development. Your role is to:

1. Provide personalized career guidance based on skills, interests, and goals
2. Suggest relevant educational paths, certifications, and skill development opportunities
3. Offer insights about industry trends and job market conditions
4. Help with resume building, interview preparation, and job search strategies
5. Recommend career transitions and growth opportunities
6. Provide information about different career paths and their requirements

Always be supportive, practical, and encouraging. Provide actionable advice that users can implement. Keep responses focused and relevant to career development.`;

    // Add user context to the system prompt if available
    if (userContext) {
      systemPrompt += `\n\nUser Profile Information:`;

      if (userContext.name) {
        systemPrompt += `\n- Name: ${userContext.name}`;
      }

      if (userContext.age) {
        systemPrompt += `\n- Age: ${userContext.age} years old`;
      }

      if (userContext.location) {
        systemPrompt += `\n- Location: ${userContext.location}`;
      }

      if (userContext.educationLevel) {
        systemPrompt += `\n- Current Education Level: ${userContext.educationLevel}`;
      }

      if (userContext.currentClass) {
        systemPrompt += `\n- Current Class: ${userContext.currentClass}`;
      }

      if (userContext.board) {
        systemPrompt += `\n- Educational Board: ${userContext.board.toUpperCase()}`;
      }

      if (userContext.interests && userContext.interests.length > 0) {
        systemPrompt += `\n- Career Interests:`;
        userContext.interests.forEach(interest => {
          systemPrompt += `\n  • ${interest.name} (${interest.category}, Strength: ${interest.strength}/5)`;
        });
      }

      systemPrompt += `\n\nUse this information to provide personalized, relevant career guidance. Address the user by name when appropriate and tailor your advice to their education level, interests, and background. Be specific about opportunities available in their location (${userContext.location || 'their region'}) when relevant.`;
    }

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
