"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  IconTrendingUp,
  IconUsers,
  IconSchool,
  IconCertificate,
  IconBrain,
  IconMapPin,
  IconStar,
  IconCalendar,
  IconClock,
  IconTarget,
  IconBook,
  IconUser,
  IconBriefcase,
  IconTrophy,
  IconCheck,
  IconAlertTriangle,
  IconArrowRight,
} from "@tabler/icons-react"
import Link from "next/link"

// Mock data based on your app's features
const DASHBOARD_STATS = {
  totalUsers: 15420,
  newSignups: 342,
  assessmentsCompleted: 8950,
  collegesListed: 450,
  certificationsAvailable: 1200,
  placementRate: 85.2,
}

const RECENT_ASSESSMENTS = [
  {
    id: 1,
    topic: "Aptitude Assessment",
    score: 85,
    totalQuestions: 20,
    completedAt: "2024-01-15T10:30:00Z",
    status: "excellent"
  },
  {
    id: 2,
    topic: "Logical Reasoning",
    score: 72,
    totalQuestions: 15,
    completedAt: "2024-01-14T15:45:00Z",
    status: "good"
  },
  {
    id: 3,
    topic: "Quantitative Aptitude",
    score: 58,
    totalQuestions: 25,
    completedAt: "2024-01-13T09:20:00Z",
    status: "needs-improvement"
  }
]

const POPULAR_COLLEGES = [
  { name: "University of Kashmir", location: "Srinagar", applications: 2540, acceptanceRate: 68 },
  { name: "Jammu University", location: "Jammu", applications: 1890, acceptanceRate: 75 },
  { name: "NIT Srinagar", location: "Srinagar", applications: 3200, acceptanceRate: 12 },
  { name: "IIIM Jammu", location: "Jammu", applications: 1240, acceptanceRate: 45 }
]

const TOP_CERTIFICATIONS = [
  { name: "Google Cloud Professional", category: "Cloud Computing", popularity: 92, avgSalary: 120000 },
  { name: "AWS Solutions Architect", category: "Cloud Computing", popularity: 89, avgSalary: 115000 },
  { name: "Certified Ethical Hacker", category: "Cybersecurity", popularity: 78, avgSalary: 95000 },
  { name: "PMP Certification", category: "Project Management", popularity: 85, avgSalary: 108000 }
]

const CAREER_PATHWAYS = [
  { field: "Engineering", students: 4520, growth: "+15%" },
  { field: "Medical", students: 2890, growth: "+8%" },
  { field: "Commerce", students: 3450, growth: "+12%" },
  { field: "Arts & Humanities", students: 1890, growth: "+5%" }
]

export default function DashboardPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

              {/* Header Section */}
              <div className="px-4 lg:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground">
                      Welcome to NextStep - Your Career Guidance Platform
                    </p>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <IconCalendar className="h-4 w-4" />
                    {new Date().toLocaleDateString()}
                  </Badge>
                </div>
              </div>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                    <IconUsers className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{DASHBOARD_STATS.totalUsers.toLocaleString()}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <IconTrendingUp className="h-3 w-3 mr-1 text-green-500" />
                      +20.1% from last month
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">New Signups</CardTitle>
                    <IconUser className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+{DASHBOARD_STATS.newSignups}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <IconTrendingUp className="h-3 w-3 mr-1 text-green-500" />
                      +15.3% from last week
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Assessments</CardTitle>
                    <IconBrain className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{DASHBOARD_STATS.assessmentsCompleted.toLocaleString()}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <IconTrendingUp className="h-3 w-3 mr-1 text-green-500" />
                      +8.7% completion rate
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                    <IconTarget className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{DASHBOARD_STATS.placementRate}%</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <IconTrendingUp className="h-3 w-3 mr-1 text-green-500" />
                      +2.3% from last quarter
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IconTarget className="h-5 w-5" />
                      Quick Actions
                    </CardTitle>
                    <CardDescription>
                      Jump into key features of the NextStep platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      <Link href="/assessment">
                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
                          <IconBrain className="h-6 w-6 text-blue-500" />
                          <div className="text-center">
                            <div className="font-medium">Take Assessment</div>
                            <div className="text-xs text-muted-foreground">Test your aptitude</div>
                          </div>
                        </Button>
                      </Link>

                      <Link href="/college-directory">
                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
                          <IconSchool className="h-6 w-6 text-green-500" />
                          <div className="text-center">
                            <div className="font-medium">Find Colleges</div>
                            <div className="text-xs text-muted-foreground">Browse {DASHBOARD_STATS.collegesListed}+ colleges</div>
                          </div>
                        </Button>
                      </Link>

                      <Link href="/certifications">
                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
                          <IconCertificate className="h-6 w-6 text-purple-500" />
                          <div className="text-center">
                            <div className="font-medium">Certifications</div>
                            <div className="text-xs text-muted-foreground">{DASHBOARD_STATS.certificationsAvailable}+ available</div>
                          </div>
                        </Button>
                      </Link>

                      <Link href="/career-guidance">
                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
                          <IconBriefcase className="h-6 w-6 text-orange-500" />
                          <div className="text-center">
                            <div className="font-medium">Career Guidance</div>
                            <div className="text-xs text-muted-foreground">Explore paths</div>
                          </div>
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Content Grid */}
              <div className="grid gap-4 px-4 lg:px-6 md:gap-6 lg:grid-cols-2 xl:grid-cols-3">

                {/* Recent Assessment Results */}
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IconTrophy className="h-5 w-5" />
                      Recent Assessments
                    </CardTitle>
                    <CardDescription>Your latest aptitude test results</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {RECENT_ASSESSMENTS.map((assessment) => {
                      const percentage = Math.round((assessment.score / assessment.totalQuestions) * 100)
                      const getStatusColor = () => {
                        if (percentage >= 80) return "text-green-500"
                        if (percentage >= 60) return "text-yellow-500"
                        return "text-red-500"
                      }
                      const getStatusIcon = () => {
                        if (percentage >= 80) return <IconCheck className="h-4 w-4" />
                        if (percentage >= 60) return <IconClock className="h-4 w-4" />
                        return <IconAlertTriangle className="h-4 w-4" />
                      }

                      return (
                        <div key={assessment.id} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="space-y-1">
                            <div className="font-medium text-sm">{assessment.topic}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(assessment.completedAt).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`text-right ${getStatusColor()}`}>
                              <div className="font-bold text-lg">{percentage}%</div>
                              <div className="text-xs">{assessment.score}/{assessment.totalQuestions}</div>
                            </div>
                            <div className={getStatusColor()}>
                              {getStatusIcon()}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/assessment">
                        Take New Assessment
                        <IconArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Popular Colleges */}
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IconSchool className="h-5 w-5" />
                      Popular Colleges
                    </CardTitle>
                    <CardDescription>Most applied colleges in J&K</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {POPULAR_COLLEGES.map((college, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="space-y-1">
                          <div className="font-medium text-sm">{college.name}</div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <IconMapPin className="h-3 w-3" />
                            {college.location}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-sm">{college.acceptanceRate}%</div>
                          <div className="text-xs text-muted-foreground">
                            {college.applications.toLocaleString()} applications
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/college-directory">
                        View All Colleges
                        <IconArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Top Certifications */}
                <Card className="lg:col-span-2 xl:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IconCertificate className="h-5 w-5" />
                      Top Certifications
                    </CardTitle>
                    <CardDescription>Most popular professional certifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {TOP_CERTIFICATIONS.map((cert, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="font-medium text-sm">{cert.name}</div>
                            <Badge variant="outline" className="text-xs">
                              {cert.category}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <IconStar className="h-3 w-3 text-yellow-500" />
                              <span className="font-bold text-sm">{cert.popularity}%</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ${(cert.avgSalary / 1000)}K avg
                            </div>
                          </div>
                        </div>
                        <Progress value={cert.popularity} className="h-1" />
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/certifications">
                        Explore Certifications
                        <IconArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

              </div>

              {/* Career Pathways Overview */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IconBook className="h-5 w-5" />
                      Career Pathway Trends
                    </CardTitle>
                    <CardDescription>
                      Student enrollment across different fields of study
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {CAREER_PATHWAYS.map((pathway, index) => (
                        <div key={index} className="text-center space-y-2">
                          <div className="text-2xl font-bold">{pathway.students.toLocaleString()}</div>
                          <div className="text-sm font-medium">{pathway.field}</div>
                          <div className="flex items-center justify-center gap-1 text-xs">
                            <IconTrendingUp className="h-3 w-3 text-green-500" />
                            <span className="text-green-500">{pathway.growth}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}