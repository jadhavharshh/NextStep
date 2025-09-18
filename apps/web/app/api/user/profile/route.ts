import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

interface OnboardingData {
  fullName: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say'
  phoneNumber: string
  district: string
  tehsil: string
  currentClass: 'class-10' | 'class-12' | 'undergraduate' | 'postgraduate' | 'other'
  currentSchoolCollege: string
  board: 'jkbose' | 'cbse' | 'icse' | 'other'
  stream?: 'science' | 'commerce' | 'arts' | 'vocational' | 'not-applicable'
  previousMarks: string
  hasAppearForEntrance: boolean
  entranceExams?: string[]
  careerInterests: string[]
  preferredFieldOfStudy: string[]
  studyPreference: 'government-college' | 'private-college' | 'distance-learning' | 'no-preference'
  locationPreference: 'same-district' | 'same-region' | 'anywhere-in-jk' | 'outside-jk'
  budgetRange: 'under-50k' | '50k-1lakh' | '1lakh-2lakh' | 'above-2lakh'
  additionalInfo?: string
}

export async function PUT(request: NextRequest) {
  try {
    // Get the session from Better Auth
    const session = await auth.api.getSession({
      headers: request.headers
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id
    const onboardingData: OnboardingData = await request.json()

    // Validate required fields
    if (!onboardingData.fullName || !onboardingData.dateOfBirth || !onboardingData.gender) {
      return NextResponse.json(
        { error: 'Missing required fields: fullName, dateOfBirth, gender' },
        { status: 400 }
      )
    }

    // Map gender to Prisma enum
    const genderMapping: Record<string, any> = {
      'male': 'MALE',
      'female': 'FEMALE',
      'other': 'OTHER',
      'prefer-not-to-say': 'PREFER_NOT_TO_SAY'
    }

    // Map education level to Prisma enum
    const educationMapping: Record<string, any> = {
      'class-10': 'CLASS_10',
      'class-12': 'CLASS_12',
      'undergraduate': 'UNDERGRADUATE',
      'postgraduate': 'POSTGRADUATE'
    }

    // Check if user exists in Prisma User table, if not create one
    let user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      // Create user in Prisma User table
      user = await prisma.user.create({
        data: {
          id: userId,
          email: session.user.email,
          name: onboardingData.fullName,
          phone: onboardingData.phoneNumber,
          dateOfBirth: new Date(onboardingData.dateOfBirth),
          gender: genderMapping[onboardingData.gender] || 'PREFER_NOT_TO_SAY',
          location: `${onboardingData.district}, ${onboardingData.tehsil}`,
          currentEducationLevel: educationMapping[onboardingData.currentClass],
          currentClass: onboardingData.currentClass,
          boardOfEducation: onboardingData.board,
          profileCompleted: true
        }
      })
    } else {
      // Update existing user
      user = await prisma.user.update({
        where: { id: userId },
        data: {
          name: onboardingData.fullName,
          phone: onboardingData.phoneNumber,
          dateOfBirth: new Date(onboardingData.dateOfBirth),
          gender: genderMapping[onboardingData.gender] || 'PREFER_NOT_TO_SAY',
          location: `${onboardingData.district}, ${onboardingData.tehsil}`,
          currentEducationLevel: educationMapping[onboardingData.currentClass],
          currentClass: onboardingData.currentClass,
          boardOfEducation: onboardingData.board,
          profileCompleted: true,
          updatedAt: new Date()
        }
      })
    }

    // Create user interests
    if (onboardingData.careerInterests && onboardingData.careerInterests.length > 0) {
      // First, clear existing interests
      await prisma.userInterest.deleteMany({
        where: { userId }
      })

      // Create interests if they don't exist and link them to user
      for (const interestName of onboardingData.careerInterests) {
        let interest = await prisma.interest.findFirst({
          where: { name: interestName }
        })

        if (!interest) {
          // Create new interest
          interest = await prisma.interest.create({
            data: {
              name: interestName,
              category: 'SERVICE', // Default category, can be improved later
              description: `Interest in ${interestName}`
            }
          })
        }

        // Create user interest relationship
        await prisma.userInterest.create({
          data: {
            userId,
            interestId: interest.id,
            strength: 3 // Default strength
          }
        })
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        user: user,
        onboardingData
      },
      message: 'User profile updated successfully'
    })

  } catch (error) {
    console.error('Error updating user profile:', error)
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get the session from Better Auth
    const session = await auth.api.getSession({
      headers: request.headers
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id

    // Fetch user profile with interests
    const userProfile = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userInterests: {
          include: {
            interest: true
          }
        }
      }
    })

    if (!userProfile) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: userProfile,
      message: 'User profile fetched successfully'
    })

  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    )
  }
}