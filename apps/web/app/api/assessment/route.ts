import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface QuizData {
  topic: string
  questions: Array<{
    question: string
    answer: string
    options: string[]
    explanation: string
  }>
  userAnswers: string[]
  score: number
  totalQuestions: number
  completedAt: string
  userId?: string
}

export async function POST(request: NextRequest) {
  try {
    const data: QuizData = await request.json()

    // Validate required fields
    if (!data.topic || !data.questions || !data.userAnswers || typeof data.score !== 'number') {
      return NextResponse.json(
        { error: 'Missing required fields: topic, questions, userAnswers, score' },
        { status: 400 }
      )
    }

    // First, find or create a quiz for this topic
    let quiz = await prisma.quiz.findFirst({
      where: {
        title: data.topic,
        category: 'APTITUDE'
      }
    })

    if (!quiz) {
      // Create a new quiz for this topic
      quiz = await prisma.quiz.create({
        data: {
          title: data.topic,
          description: `Aptitude quiz for ${data.topic}`,
          category: 'APTITUDE',
          targetLevel: 'CLASS_12', // Default level
          totalQuestions: data.totalQuestions,
          isActive: true
        }
      })

      // Create quiz questions
      for (let i = 0; i < data.questions.length; i++) {
        const question = data.questions[i]
        await prisma.quizQuestion.create({
          data: {
            quizId: quiz.id,
            question: question.question,
            type: 'MULTIPLE_CHOICE',
            options: question.options,
            order: i + 1
          }
        })
      }
    }

    // Ensure the user exists or create a demo user
    const userId = data.userId || 'demo-user'
    let user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      // Create a demo user for testing
      user = await prisma.user.create({
        data: {
          id: userId,
          email: `${userId}@example.com`,
          name: 'Demo User'
        }
      })
    }

    // Save the quiz response (upsert to allow retakes)
    const savedQuizResponse = await prisma.quizResponse.upsert({
      where: {
        userId_quizId: {
          userId: user.id,
          quizId: quiz.id
        }
      },
      update: {
        answers: {
          userAnswers: data.userAnswers,
          correctAnswers: data.questions.map(q => q.answer),
          questions: data.questions
        },
        score: data.score,
        completedAt: new Date()
      },
      create: {
        userId: user.id,
        quizId: quiz.id,
        answers: {
          userAnswers: data.userAnswers,
          correctAnswers: data.questions.map(q => q.answer),
          questions: data.questions
        },
        score: data.score,
        suggestedStreams: [], // Can be calculated based on topic/performance
      }
    })

    const quizResult = {
      id: savedQuizResponse.id,
      topic: data.topic,
      questions: data.questions,
      userAnswers: data.userAnswers,
      score: data.score,
      totalQuestions: data.totalQuestions,
      percentage: Math.round((data.score / data.totalQuestions) * 100),
      completedAt: savedQuizResponse.completedAt.toISOString(),
      userId: data.userId || 'anonymous'
    }

    return NextResponse.json({
      success: true,
      data: quizResult,
      message: 'Quiz data saved successfully'
    })

  } catch (error) {
    console.error('Error saving quiz data:', error)
    return NextResponse.json(
      { error: 'Failed to save quiz data' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || 'anonymous'
    const topic = searchParams.get('topic')

    // Fetch quiz results from database
    const quizResults = await prisma.quizResponse.findMany({
      where: {
        userId: userId,
        ...(topic && { quiz: { title: { contains: topic } } })
      },
      include: {
        quiz: {
          include: {
            questions: true
          }
        }
      },
      orderBy: {
        completedAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      data: quizResults,
      message: 'Quiz history fetched successfully'
    })

  } catch (error) {
    console.error('Error fetching quiz data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch quiz data' },
      { status: 500 }
    )
  }
}