"use client"

import { useState } from "react"
import axios from "axios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, CheckCircle, Trophy, RotateCcw } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Question {
  question: string
  answer: string
  options: string[]
  explanation: string
}

interface QuizResult {
  score: number
  totalQuestions: number
  userAnswers: string[]
  correctAnswers: string[]
  questions: Question[]
}

const QUIZ_TOPICS = [
  { key: "Random", label: "Random Questions", description: "Mixed topics from all categories" },
  { key: "MixtureAndAlligation", label: "Mixture and Alligation", description: "Questions on mixtures and alligation" },
  { key: "ProfitAndLoss", label: "Profit and Loss", description: "Business mathematics problems" },
  { key: "PipesAndCistern", label: "Pipes and Cisterns", description: "Time and work with pipes" },
  { key: "Age", label: "Age Problems", description: "Age-related mathematical problems" },
  { key: "PermutationAndCombination", label: "Permutation & Combination", description: "Counting and arrangement problems" },
  { key: "SpeedTimeDistance", label: "Speed, Time & Distance", description: "Motion and travel problems" },
  { key: "SimpleInterest", label: "Simple Interest", description: "Interest calculation problems" },
  { key: "Calendar", label: "Calendar", description: "Date and day problems" }
]

const QUESTIONS_PER_QUIZ = 5

export function AptitudeQuiz() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)
  const [quizStarted, setQuizStarted] = useState(false)

  const fetchQuestions = async (topic: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const questionsToFetch = []
      for (let i = 0; i < QUESTIONS_PER_QUIZ; i++) {
        const response = await axios.get(`https://aptitude-api.vercel.app/${topic}`)
        questionsToFetch.push(response.data)
      }
      setQuestions(questionsToFetch)
      setUserAnswers(new Array(QUESTIONS_PER_QUIZ).fill(""))
      setCurrentQuestionIndex(0)
      setSelectedAnswer("")
      setQuizStarted(true)
    } catch (err) {
      setError("Failed to fetch questions. Please try again.")
      console.error("Error fetching questions:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleNextQuestion = () => {
    const newUserAnswers = [...userAnswers]
    newUserAnswers[currentQuestionIndex] = selectedAnswer
    setUserAnswers(newUserAnswers)

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(newUserAnswers[currentQuestionIndex + 1] || "")
    } else {
      // Quiz completed, calculate results
      finishQuiz(newUserAnswers)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setSelectedAnswer(userAnswers[currentQuestionIndex - 1] || "")
    }
  }

  const finishQuiz = async (finalAnswers: string[]) => {
    const correctAnswers = questions.map(q => q.answer)
    const score = finalAnswers.reduce((acc, answer, index) => {
      return acc + (answer === correctAnswers[index] ? 1 : 0)
    }, 0)

    const quizResult = {
      score,
      totalQuestions: questions.length,
      userAnswers: finalAnswers,
      correctAnswers,
      questions
    }

    setQuizResult(quizResult)

    // Save quiz data to API
    try {
      const response = await axios.post('/api/assessment', {
        topic: selectedTopic,
        questions: questions,
        userAnswers: finalAnswers,
        score: score,
        totalQuestions: questions.length,
        completedAt: new Date().toISOString()
      })

      if (response.data.success) {
        console.log('Quiz data saved successfully:', response.data.data)
      }
    } catch (error) {
      console.error('Failed to save quiz data:', error)
      // Don't block the user experience if saving fails
    }
  }

  const resetQuiz = () => {
    setSelectedTopic(null)
    setQuestions([])
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setSelectedAnswer("")
    setQuizResult(null)
    setQuizStarted(false)
    setError(null)
  }

  const startNewQuiz = () => {
    setQuestions([])
    setCurrentQuestionIndex(0)
    setUserAnswers([])
    setSelectedAnswer("")
    setQuizResult(null)
    setQuizStarted(false)
  }

  // Topic Selection Screen
  if (!selectedTopic || !quizStarted) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Aptitude Quiz
            </CardTitle>
            <CardDescription>
              Choose a topic and test your aptitude skills with multiple-choice questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {QUIZ_TOPICS.map((topic) => (
                <Card
                  key={topic.key}
                  className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedTopic === topic.key ? "border-primary bg-muted/50" : ""
                  }`}
                  onClick={() => setSelectedTopic(topic.key)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{topic.label}</CardTitle>
                    <CardDescription className="text-sm">
                      {topic.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {selectedTopic && (
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={() => fetchQuestions(selectedTopic)}
                  disabled={isLoading}
                  size="lg"
                >
                  {isLoading ? "Loading Questions..." : `Start ${QUESTIONS_PER_QUIZ} Question Quiz`}
                </Button>
              </div>
            )}

            {error && (
              <Alert className="mt-4" variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  // Quiz Results Screen
  if (quizResult) {
    const percentage = Math.round((quizResult.score / quizResult.totalQuestions) * 100)
    const getScoreColor = () => {
      if (percentage >= 80) return "text-green-600"
      if (percentage >= 60) return "text-yellow-600"
      return "text-red-600"
    }

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Trophy className="h-6 w-6" />
              Quiz Complete!
            </CardTitle>
            <CardDescription>
              Here are your results for {QUIZ_TOPICS.find(t => t.key === selectedTopic)?.label}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <div className={`text-4xl font-bold ${getScoreColor()}`}>
                {quizResult.score}/{quizResult.totalQuestions}
              </div>
              <div className={`text-2xl font-semibold ${getScoreColor()}`}>
                {percentage}%
              </div>
              <Badge variant={percentage >= 80 ? "default" : percentage >= 60 ? "secondary" : "destructive"}>
                {percentage >= 80 ? "Excellent!" : percentage >= 60 ? "Good Job!" : "Keep Practicing!"}
              </Badge>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-semibold">Question Review:</h3>
              {quizResult.questions.map((question, index) => {
                const userAnswer = quizResult.userAnswers[index]
                const correctAnswer = quizResult.correctAnswers[index]
                const isCorrect = userAnswer === correctAnswer

                return (
                  <Card key={index} className={`border-l-4 ${isCorrect ? "border-l-green-500" : "border-l-red-500"}`}>
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          {isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="space-y-2 flex-1">
                            <p className="font-medium">Q{index + 1}: {question.question}</p>
                            <div className="space-y-1 text-sm">
                              <p>
                                <span className="font-medium">Your answer:</span>{" "}
                                <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                                  {userAnswer || "No answer selected"}
                                </span>
                              </p>
                              {!isCorrect && (
                                <p>
                                  <span className="font-medium">Correct answer:</span>{" "}
                                  <span className="text-green-600">{correctAnswer}</span>
                                </p>
                              )}
                              <p className="text-muted-foreground">
                                <span className="font-medium">Explanation:</span> {question.explanation}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="flex gap-3 justify-center">
              <Button onClick={startNewQuiz} variant="outline">
                Try Another Topic
              </Button>
              <Button onClick={() => fetchQuestions(selectedTopic!)}>
                Retake Quiz
              </Button>
              <Button onClick={resetQuiz} variant="secondary">
                <RotateCcw className="h-4 w-4 mr-2" />
                Back to Topics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Quiz Question Screen
  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {QUIZ_TOPICS.find(t => t.key === selectedTopic)?.label} Quiz
              </CardTitle>
              <CardDescription>
                Question {currentQuestionIndex + 1} of {questions.length}
              </CardDescription>
            </div>
            <Badge variant="outline">
              {userAnswers.filter(answer => answer !== "").length}/{questions.length} answered
            </Badge>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {currentQuestion?.question}
            </h3>

            <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
              {currentQuestion?.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer p-3 rounded border hover:bg-muted/50"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-between">
            <Button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              variant="outline"
            >
              Previous
            </Button>

            <Button
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
            >
              {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}