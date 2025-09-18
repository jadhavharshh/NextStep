"use client"

import * as React from "react"
import { format } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  IconUser,
  IconMail,
  IconPhone,
  IconMapPin,
  IconSchool,
  IconBook,
  IconTarget,
  IconHeart,
  IconCalendar,
  IconGenderMale,
  IconGenderFemale
} from "@tabler/icons-react"

interface UserProfileData {
  id: string
  email: string
  name: string
  phone?: string
  dateOfBirth?: string
  gender?: string
  location?: string
  profileCompleted: boolean
  currentEducationLevel?: string
  currentClass?: string
  boardOfEducation?: string
  createdAt: string
  updatedAt: string
  userInterests?: Array<{
    interest: {
      id: string
      name: string
      category: string
      description?: string
    }
    strength: number
  }>
}

interface UserProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: {
    name: string
    email: string
    avatar: string
  }
}

export function UserProfileDialog({ open, onOpenChange, user }: UserProfileDialogProps) {
  const [profileData, setProfileData] = React.useState<UserProfileData | null>(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (open) {
      fetchUserProfile()
    }
  }, [open])

  const fetchUserProfile = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/user/profile', {
        credentials: 'include',
      })

      if (response.ok) {
        const result = await response.json()
        setProfileData(result.data)
      } else {
        console.error('Failed to fetch user profile')
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatGender = (gender: string) => {
    switch (gender) {
      case 'MALE': return 'Male'
      case 'FEMALE': return 'Female'
      case 'OTHER': return 'Other'
      case 'PREFER_NOT_TO_SAY': return 'Prefer not to say'
      default: return gender
    }
  }

  const formatEducationLevel = (level: string) => {
    switch (level) {
      case 'CLASS_10': return 'Class 10'
      case 'CLASS_12': return 'Class 12'
      case 'UNDERGRADUATE': return 'Undergraduate'
      case 'POSTGRADUATE': return 'Postgraduate'
      default: return level
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
            <DialogDescription>Loading profile information...</DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>
            Complete overview of your profile information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info Header */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-lg font-semibold">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-2xl font-semibold">{profileData?.name || user.name}</h3>
                  <div className="flex items-center text-muted-foreground">
                    <IconMail className="h-4 w-4 mr-2" />
                    {profileData?.email || user.email}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={profileData?.profileCompleted ? "default" : "secondary"}>
                      {profileData?.profileCompleted ? "Profile Complete" : "Profile Incomplete"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <IconUser className="h-5 w-5 mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profileData?.phone && (
                  <div className="flex items-center space-x-3">
                    <IconPhone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{profileData.phone}</p>
                    </div>
                  </div>
                )}

                {profileData?.dateOfBirth && (
                  <div className="flex items-center space-x-3">
                    <IconCalendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Date of Birth</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(profileData.dateOfBirth), 'PPP')}
                      </p>
                    </div>
                  </div>
                )}

                {profileData?.gender && (
                  <div className="flex items-center space-x-3">
                    {profileData.gender === 'MALE' ? (
                      <IconGenderMale className="h-4 w-4 text-muted-foreground" />
                    ) : profileData.gender === 'FEMALE' ? (
                      <IconGenderFemale className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <IconUser className="h-4 w-4 text-muted-foreground" />
                    )}
                    <div>
                      <p className="text-sm font-medium">Gender</p>
                      <p className="text-sm text-muted-foreground">
                        {formatGender(profileData.gender)}
                      </p>
                    </div>
                  </div>
                )}

                {profileData?.location && (
                  <div className="flex items-center space-x-3">
                    <IconMapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{profileData.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Education Information */}
          {(profileData?.currentEducationLevel || profileData?.currentClass || profileData?.boardOfEducation) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <IconSchool className="h-5 w-5 mr-2" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profileData?.currentEducationLevel && (
                    <div className="flex items-center space-x-3">
                      <IconBook className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Education Level</p>
                        <p className="text-sm text-muted-foreground">
                          {formatEducationLevel(profileData.currentEducationLevel)}
                        </p>
                      </div>
                    </div>
                  )}

                  {profileData?.currentClass && (
                    <div className="flex items-center space-x-3">
                      <IconTarget className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Current Class</p>
                        <p className="text-sm text-muted-foreground">{profileData.currentClass}</p>
                      </div>
                    </div>
                  )}

                  {profileData?.boardOfEducation && (
                    <div className="flex items-center space-x-3">
                      <IconSchool className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Board/University</p>
                        <p className="text-sm text-muted-foreground">
                          {profileData.boardOfEducation.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Career Interests */}
          {profileData?.userInterests && profileData.userInterests.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <IconHeart className="h-5 w-5 mr-2" />
                  Career Interests
                </CardTitle>
                <CardDescription>
                  Your selected career interests and their strength levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {profileData.userInterests.map((userInterest) => (
                    <div
                      key={userInterest.interest.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{userInterest.interest.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {userInterest.interest.category}
                        </p>
                      </div>
                      <Badge variant="outline">
                        Level {userInterest.strength}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Account Created</p>
                  <p className="text-sm text-muted-foreground">
                    {profileData?.createdAt ? format(new Date(profileData.createdAt), 'PPP') : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Last Updated</p>
                  <p className="text-sm text-muted-foreground">
                    {profileData?.updatedAt ? format(new Date(profileData.updatedAt), 'PPP') : 'N/A'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}