"use client"

import * as React from "react"
import { OnboardingForm } from "@/components/onboarding-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function OnboardingDemo() {
  const [showOnboarding, setShowOnboarding] = React.useState(false)
  const [userData, setUserData] = React.useState<any>(null)

  const handleOnboardingComplete = (data: any) => {
    setUserData(data)
    console.log("Onboarding completed with data:", data)
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Onboarding Form Demo</CardTitle>
          <CardDescription>
            Click the button below to trigger the onboarding form popup
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setShowOnboarding(true)} className="w-full">
            Start Onboarding
          </Button>

          {userData && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <h3 className="font-semibold mb-2">Completed! User Data:</h3>
              <pre className="text-xs overflow-auto">
                {JSON.stringify(userData, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>

      <OnboardingForm
        open={showOnboarding}
        onOpenChange={setShowOnboarding}
        onComplete={handleOnboardingComplete}
      />
    </div>
  )
}