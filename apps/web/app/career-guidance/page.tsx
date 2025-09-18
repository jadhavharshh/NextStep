'use client';

import { useEffect, useState } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, XCircle, Loader2, Send } from 'lucide-react';

interface AssessmentStatus {
  hasCompletedAssessment: boolean;
  userDetailsCompleted: boolean;
  loading: boolean;
}

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface UserProfileData {
  id: string;
  email: string;
  name: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  location?: string;
  profileCompleted: boolean;
  currentEducationLevel?: string;
  currentClass?: string;
  boardOfEducation?: string;
  userInterests?: Array<{
    interest: {
      id: string;
      name: string;
      category: string;
      description?: string;
    };
    strength: number;
  }>;
}

export default function CareerGuidancePage() {
  const [status, setStatus] = useState<AssessmentStatus>({
    hasCompletedAssessment: false,
    userDetailsCompleted: true, // Default to true as requested
    loading: true,
  });

  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    checkAssessmentStatus();
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setProfileLoading(true);
      const response = await fetch('/api/user/profile', {
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        setUserProfile(result.data);
      } else {
        console.error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  const checkAssessmentStatus = async () => {
    try {
      setStatus((prev) => ({ ...prev, loading: true }));

      // Check if user has completed any assessments
      const response = await fetch('/api/assessment?userId=demo-user');
      const data = await response.json();

      const hasCompletedAssessment =
        data.success && data.data && data.data.length > 0;

      setStatus({
        hasCompletedAssessment,
        userDetailsCompleted: true, // Always true as requested
        loading: false,
      });
    } catch (error) {
      console.error('Error checking assessment status:', error);
      setStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setChatLoading(true);

    try {
      // Prepare user context for the AI
      const userContext = userProfile ? {
        name: userProfile.name,
        age: userProfile.dateOfBirth ? Math.floor((new Date().getTime() - new Date(userProfile.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : null,
        location: userProfile.location,
        educationLevel: userProfile.currentEducationLevel,
        currentClass: userProfile.currentClass,
        board: userProfile.boardOfEducation,
        interests: userProfile.userInterests?.map(ui => ({
          name: ui.interest.name,
          category: ui.interest.category,
          strength: ui.strength
        })) || []
      } : null;

      const response = await fetch('http://localhost:7001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          userContext
        }),
      });

      const data = await response.json();

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: data.response || 'Sorry, I could not process your request.',
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, there was an error connecting to the chat service.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setChatLoading(false);
    }
  };

  const startChat = () => {
    setShowChat(true);
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        text: userProfile?.name
          ? `Hi ${userProfile.name.split(' ')[0]}! I am so glad you are here. I have been helping students like you navigate their career journeys for years, and I am excited to work with you. What is on your mind about your future? Any specific concerns or dreams you would like to explore?`
          : "Hi there! I am so glad you are here. I have been helping students navigate their career journeys for years, and I am excited to work with you. What is on your mind about your future? Any specific concerns or dreams you would like to explore?",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  };

  const StatusIcon = ({
    completed,
    loading,
  }: {
    completed: boolean;
    loading: boolean;
  }) => {
    if (loading) {
      return <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />;
    }
    return completed ? (
      <CheckCircle className="h-5 w-5 text-green-600" />
    ) : (
      <XCircle className="h-5 w-5 text-red-600" />
    );
  };

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
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
                <p className="text-muted-foreground">
                  Professional career counseling and advice
                </p>
              </div>

              <div className="px-4 lg:px-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                      <div className="flex-1">
                        <CardTitle className="text-sm font-medium">
                          Assessment Completion
                        </CardTitle>
                        <CardDescription className="text-xs">
                          Complete assessments to get personalized career
                          guidance
                        </CardDescription>
                      </div>
                      <StatusIcon
                        completed={status.hasCompletedAssessment}
                        loading={status.loading}
                      />
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            status.hasCompletedAssessment
                              ? 'default'
                              : 'secondary'
                          }
                        >
                          {status.loading
                            ? 'Checking...'
                            : status.hasCompletedAssessment
                              ? 'Completed'
                              : 'Not Completed'}
                        </Badge>
                      </div>
                      {!status.loading && !status.hasCompletedAssessment && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Visit the Assessment page to complete your aptitude
                          tests
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                      <div className="flex-1">
                        <CardTitle className="text-sm font-medium">
                          User Details
                        </CardTitle>
                        <CardDescription className="text-xs">
                          Complete your profile for better recommendations
                        </CardDescription>
                      </div>
                      <StatusIcon
                        completed={status.userDetailsCompleted}
                        loading={false}
                      />
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        <Badge variant="default">Completed</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Your profile information is complete
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {!status.loading &&
                  status.hasCompletedAssessment &&
                  status.userDetailsCompleted && (
                    <Card className="mt-4">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Ready for Career Guidance
                        </CardTitle>
                        <CardDescription>
                          Great! You&apos;ve completed all prerequisites. You can now
                          access personalized career guidance.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {!showChat ? (
                          <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                              Career guidance features will be available here
                              based on your assessment results.
                            </p>
                            <Button onClick={startChat} className="w-full">
                              Start Career Guidance Chat
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="h-64 border rounded-lg p-4 overflow-y-auto bg-muted/30">
                              {messages.map((message) => (
                                <div
                                  key={message.id}
                                  className={`mb-2 ${
                                    message.isUser ? 'text-right' : 'text-left'
                                  }`}
                                >
                                  <div
                                    className={`inline-block max-w-xs px-3 py-2 rounded-lg ${
                                      message.isUser
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted'
                                    }`}
                                  >
                                    {message.text}
                                  </div>
                                </div>
                              ))}
                              {chatLoading && (
                                <div className="text-left mb-2">
                                  <div className="inline-block bg-muted px-3 py-2 rounded-lg">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type your message..."
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    sendMessage(inputValue);
                                  }
                                }}
                              />
                              <Button
                                onClick={() => sendMessage(inputValue)}
                                disabled={chatLoading || !inputValue.trim()}
                                size="icon"
                              >
                                <Send className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
