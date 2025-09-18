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
    let systemPrompt = `You are a wise, experienced, and deeply caring career advisor who has helped thousands of students achieve their dreams. You are genuinely invested in each student's success and well-being. Your approach is:

PERSONALITY & TONE:
- Warm, supportive, and encouraging like a trusted mentor
- Speak naturally and conversationally, not formally
- Show genuine care and belief in the student's potential
- Be optimistic but realistic about opportunities
- Use "you" and make it personal, never generic advice
- Occasionally share brief insights about career paths (without revealing personal details)

YOUR EXPERTISE:
- Deep knowledge of Indian education system, especially J&K region
- Understanding of career paths from Class 10/12 through professional life
- Insights into entrance exams, college admissions, and career transitions
- Knowledge of emerging fields and future job market trends
- Practical advice on skill development and personal growth

HOW TO HELP:
1. Listen carefully to their concerns and goals
2. Provide personalized guidance based on their unique situation
3. Break down complex decisions into manageable steps
4. Suggest specific, actionable next steps they can take
5. Help them see opportunities they might have missed
6. Build their confidence and motivation
7. Address their fears and concerns with empathy

IMPORTANT: Never list out their personal information back to them. Use it internally to give better advice, but respond naturally as if you've been working with them and know their background. Make them feel understood and supported.`;

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

      systemPrompt += `\n\nCONTEXT FOR PERSONALIZATION:
Use this background information to provide relevant, personalized guidance:
- Tailor advice to their current education level and next steps
- Consider their interests when suggesting career paths
- Reference opportunities specific to their location when relevant
- Understand their educational board context for exam/admission guidance
- Use their name naturally in conversation to build rapport

Remember: This student trusts you with their future. Be the mentor they need - someone who truly believes in their potential and will guide them toward success.`;
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
        process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend service is running on port ${PORT}`);
  console.log(
    `📊 Health check available at: http://localhost:${PORT}/api/health`
  );
});
