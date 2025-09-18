"use client"

import { useEffect, useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

interface AssessmentStatus {
  hasCompletedAssessment: boolean
  userDetailsCompleted: boolean
  loading: boolean
}

export default function CareerGuidancePage() {
  const [status, setStatus] = useState<AssessmentStatus>({
    hasCompletedAssessment: false,
    userDetailsCompleted: true, // Default to true as requested
    loading: true
  })

  useEffect(() => {
    checkAssessmentStatus()
  }, [])

  const checkAssessmentStatus = async () => {
    try {
      setStatus(prev => ({ ...prev, loading: true }))

      // Check if user has completed any assessments
      const response = await fetch('/api/assessment?userId=demo-user')
      const data = await response.json()

      const hasCompletedAssessment = data.success && data.data && data.data.length > 0

      setStatus({
        hasCompletedAssessment,
        userDetailsCompleted: true, // Always true as requested
        loading: false
      })
    } catch (error) {
      console.error('Error checking assessment status:', error)
      setStatus(prev => ({ ...prev, loading: false }))
    }
  }

  const StatusIcon = ({ completed, loading }: { completed: boolean; loading: boolean }) => {
    if (loading) {
      return <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
    }
    return completed ? (
      <CheckCircle className="h-5 w-5 text-green-600" />
    ) : (
      <XCircle className="h-5 w-5 text-red-600" />
    )
  }

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
              <div className="px-4 lg:px-6">
                <h1 className="text-2xl font-bold">Career Guidance</h1>
                <p className="text-muted-foreground">Professional career counseling and advice</p>
              </div>

              <div className="px-4 lg:px-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                      <div className="flex-1">
                        <CardTitle className="text-sm font-medium">Assessment Completion</CardTitle>
                        <CardDescription className="text-xs">
                          Complete assessments to get personalized career guidance
                        </CardDescription>
                      </div>
                      <StatusIcon completed={status.hasCompletedAssessment} loading={status.loading} />
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <Badge variant={status.hasCompletedAssessment ? "default" : "secondary"}>
                          {status.loading ? "Checking..." : status.hasCompletedAssessment ? "Completed" : "Not Completed"}
                        </Badge>
                      </div>
                      {!status.loading && !status.hasCompletedAssessment && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Visit the Assessment page to complete your aptitude tests
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                      <div className="flex-1">
                        <CardTitle className="text-sm font-medium">User Details</CardTitle>
                        <CardDescription className="text-xs">
                          Complete your profile for better recommendations
                        </CardDescription>
                      </div>
                      <StatusIcon completed={status.userDetailsCompleted} loading={false} />
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <Badge variant="default">
                          Completed
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Your profile information is complete
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {!status.loading && status.hasCompletedAssessment && status.userDetailsCompleted && (
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-lg">Ready for Career Guidance</CardTitle>
                      <CardDescription>
                        Great! You've completed all prerequisites. You can now access personalized career guidance.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Career guidance features will be available here based on your assessment results.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}