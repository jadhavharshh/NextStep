"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { signOut, useSession } from "@/lib/auth-client"
import { toast } from "sonner"
import {
  User,
  Settings,
  BarChart3,
  Trophy,
  Target,
  TrendingUp,
  LogOut,
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  Star
} from "lucide-react"

export default function DashboardPage() {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/auth")
    }
  }, [session, isPending, router])

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await signOut()
      toast.success("Signed out successfully")
      router.push("/auth")
    } catch (error) {
      toast.error("Failed to sign out")
    } finally {
      setIsLoading(false)
    }
  }

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const userInitials = session.user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U"

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                NextStep
              </h1>
              <Badge variant="secondary">Dashboard</Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="size-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="size-4" />
              </Button>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={session.user.image || ""} />
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{session.user.name}</p>
                  <p className="text-xs text-muted-foreground">{session.user.email}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                disabled={isLoading}
              >
                <LogOut className="size-4 mr-2" />
                {isLoading ? "Signing out..." : "Sign Out"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {session.user.name?.split(" ")[0]}! 👋
          </h2>
          <p className="text-muted-foreground">
            Here's what's happening with your account today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Progress</CardTitle>
              <TrendingUp className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">73%</div>
              <p className="text-xs text-muted-foreground">+2.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Goals Completed</CardTitle>
              <Target className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+3 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Trophy className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">2 new this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <Star className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15 days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="size-5" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>
                  Your progress over the last 7 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "Monday", progress: 85 },
                    { label: "Tuesday", progress: 92 },
                    { label: "Wednesday", progress: 78 },
                    { label: "Thursday", progress: 88 },
                    { label: "Friday", progress: 95 },
                    { label: "Saturday", progress: 72 },
                    { label: "Sunday", progress: 89 },
                  ].map((day) => (
                    <div key={day.label} className="flex items-center space-x-4">
                      <div className="w-20 text-sm font-medium">{day.label}</div>
                      <Progress value={day.progress} className="flex-1" />
                      <div className="w-12 text-sm text-muted-foreground text-right">
                        {day.progress}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="size-5" />
                  <span>Active Goals</span>
                </CardTitle>
                <CardDescription>
                  Track your progress on current objectives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Complete React Course",
                      description: "Finish all modules and projects",
                      progress: 75,
                      dueDate: "2 days left",
                    },
                    {
                      title: "Build Portfolio Website",
                      description: "Design and develop personal portfolio",
                      progress: 45,
                      dueDate: "1 week left",
                    },
                    {
                      title: "Learn TypeScript",
                      description: "Master TypeScript fundamentals",
                      progress: 90,
                      dueDate: "Almost done!",
                    },
                  ].map((goal, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{goal.title}</h4>
                        <Badge variant="outline">{goal.dueDate}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                      <Progress value={goal.progress} />
                      <div className="text-xs text-muted-foreground text-right">
                        {goal.progress}% complete
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Target className="size-4 mr-2" />
                  Set New Goal
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="size-4 mr-2" />
                  Schedule Task
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="size-4 mr-2" />
                  View Analytics
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <User className="size-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="size-5" />
                  <span>Upcoming</span>
                </CardTitle>
                <CardDescription>
                  Your schedule for today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      time: "9:00 AM",
                      task: "Daily standup meeting",
                      completed: true,
                    },
                    {
                      time: "11:00 AM",
                      task: "Code review session",
                      completed: true,
                    },
                    {
                      time: "2:00 PM",
                      task: "Project planning",
                      completed: false,
                    },
                    {
                      time: "4:00 PM",
                      task: "Design review",
                      completed: false,
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      {item.completed ? (
                        <CheckCircle2 className="size-4 text-green-500" />
                      ) : (
                        <Clock className="size-4 text-muted-foreground" />
                      )}
                      <div className="flex-1">
                        <p className={`text-sm ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {item.task}
                        </p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="size-5" />
                  <span>Recent Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      title: "7 Day Streak",
                      description: "Completed goals for 7 days straight",
                      icon: "🔥",
                    },
                    {
                      title: "Goal Crusher",
                      description: "Completed 10 goals this month",
                      icon: "🎯",
                    },
                    {
                      title: "Early Bird",
                      description: "Completed tasks before deadline",
                      icon: "🌅",
                    },
                  ].map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <p className="font-medium text-sm">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}