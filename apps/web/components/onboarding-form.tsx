"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"]),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  district: z.string().min(1, "District is required"),
  tehsil: z.string().min(1, "Tehsil is required"),
})

const educationSchema = z.object({
  currentClass: z.enum(["class-10", "class-12", "undergraduate", "postgraduate", "other"]),
  currentSchoolCollege: z.string().min(1, "School/College name is required"),
  board: z.enum(["jkbose", "cbse", "icse", "other"]),
  stream: z.enum(["science", "commerce", "arts", "vocational", "not-applicable"]).optional(),
  previousMarks: z.string().min(1, "Previous marks are required"),
  hasAppearForEntrance: z.boolean(),
  entranceExams: z.array(z.string()).optional(),
})

const preferencesSchema = z.object({
  careerInterests: z.array(z.string()).min(1, "Select at least one career interest"),
  preferredFieldOfStudy: z.array(z.string()).min(1, "Select at least one field of study"),
  studyPreference: z.enum(["government-college", "private-college", "distance-learning", "no-preference"]),
  locationPreference: z.enum(["same-district", "same-region", "anywhere-in-jk", "outside-jk"]),
  budgetRange: z.enum(["under-50k", "50k-1lakh", "1lakh-2lakh", "above-2lakh"]),
  additionalInfo: z.string().optional(),
})

const formSchema = personalInfoSchema.merge(educationSchema).merge(preferencesSchema)

type FormData = z.infer<typeof formSchema>

interface OnboardingFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete: (data: FormData) => void
}

const STEPS = [
  { id: 1, title: "Personal Information", description: "Tell us about yourself" },
  { id: 2, title: "Education Details", description: "Your academic background" },
  { id: 3, title: "Preferences", description: "Your career and study preferences" },
]

const CAREER_INTERESTS = [
  "Engineering & Technology",
  "Medical & Healthcare",
  "Business & Commerce",
  "Arts & Design",
  "Education & Teaching",
  "Law & Legal Services",
  "Government Services",
  "Agriculture & Allied",
  "Media & Communication",
  "Sports & Fitness",
  "Tourism & Hospitality",
  "Social Work",
]

const FIELDS_OF_STUDY = [
  "Computer Science & IT",
  "Medical Sciences",
  "Engineering",
  "Business Administration",
  "Economics",
  "Literature & Languages",
  "History & Political Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Psychology",
  "Sociology",
  "Fine Arts",
  "Music",
  "Law",
  "Agriculture",
  "Education",
]

const ENTRANCE_EXAMS = [
  "JEE Main",
  "JEE Advanced",
  "NEET",
  "CUET",
  "JKCET",
  "CLAT",
  "CAT",
  "GATE",
  "Other",
]

export function OnboardingForm({ open, onOpenChange, onComplete }: OnboardingFormProps) {
  const [currentStep, setCurrentStep] = React.useState(1)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      dateOfBirth: "",
      gender: "prefer-not-to-say",
      phoneNumber: "",
      district: "",
      tehsil: "",
      currentClass: "class-10",
      currentSchoolCollege: "",
      board: "jkbose",
      stream: "not-applicable",
      previousMarks: "",
      hasAppearForEntrance: false,
      entranceExams: [],
      careerInterests: [],
      preferredFieldOfStudy: [],
      studyPreference: "no-preference",
      locationPreference: "same-district",
      budgetRange: "under-50k",
      additionalInfo: "",
    },
  })

  const progress = (currentStep / STEPS.length) * 100

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = (data: FormData) => {
    onComplete(data)
    onOpenChange(false)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <label htmlFor="male">Male</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <label htmlFor="female">Female</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <label htmlFor="other">Other</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                        <label htmlFor="prefer-not-to-say">Prefer not to say</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your district" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tehsil"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tehsil</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your tehsil" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="currentClass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Class/Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your current class/level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="class-10">Class 10</SelectItem>
                      <SelectItem value="class-12">Class 12</SelectItem>
                      <SelectItem value="undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="postgraduate">Postgraduate</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currentSchoolCollege"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current School/College</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your school/college name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="board"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Board/University</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your board" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="jkbose">JKBOSE</SelectItem>
                      <SelectItem value="cbse">CBSE</SelectItem>
                      <SelectItem value="icse">ICSE</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stream"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stream (if applicable)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your stream" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="commerce">Commerce</SelectItem>
                      <SelectItem value="arts">Arts</SelectItem>
                      <SelectItem value="vocational">Vocational</SelectItem>
                      <SelectItem value="not-applicable">Not Applicable</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="previousMarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Previous Class Marks/Percentage</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your marks/percentage" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hasAppearForEntrance"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Have you appeared for any entrance exams?
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {form.watch("hasAppearForEntrance") && (
              <FormField
                control={form.control}
                name="entranceExams"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entrance Exams</FormLabel>
                    <FormDescription>
                      Select all the entrance exams you have appeared for
                    </FormDescription>
                    <div className="grid grid-cols-2 gap-2">
                      {ENTRANCE_EXAMS.map((exam) => (
                        <div key={exam} className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value?.includes(exam)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...(field.value || []), exam])
                              } else {
                                field.onChange(
                                  field.value?.filter((value) => value !== exam)
                                )
                              }
                            }}
                          />
                          <label className="text-sm">{exam}</label>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="careerInterests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Career Interests</FormLabel>
                  <FormDescription>
                    Select all areas you are interested in (minimum 1)
                  </FormDescription>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {CAREER_INTERESTS.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes(interest)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...(field.value || []), interest])
                            } else {
                              field.onChange(
                                field.value?.filter((value) => value !== interest)
                              )
                            }
                          }}
                        />
                        <label className="text-sm">{interest}</label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredFieldOfStudy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Fields of Study</FormLabel>
                  <FormDescription>
                    Select subjects you want to study (minimum 1)
                  </FormDescription>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {FIELDS_OF_STUDY.map((fieldOfStudy) => (
                      <div key={fieldOfStudy} className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes(fieldOfStudy)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...(field.value || []), fieldOfStudy])
                            } else {
                              field.onChange(
                                field.value?.filter((value) => value !== fieldOfStudy)
                              )
                            }
                          }}
                        />
                        <label className="text-sm">{fieldOfStudy}</label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="studyPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Study Preference</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your study preference" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="government-college">Government College</SelectItem>
                      <SelectItem value="private-college">Private College</SelectItem>
                      <SelectItem value="distance-learning">Distance Learning</SelectItem>
                      <SelectItem value="no-preference">No Preference</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="locationPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location Preference</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your location preference" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="same-district">Same District</SelectItem>
                      <SelectItem value="same-region">Same Region</SelectItem>
                      <SelectItem value="anywhere-in-jk">Anywhere in J&K</SelectItem>
                      <SelectItem value="outside-jk">Outside J&K</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budgetRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Range (Annual)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your budget range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="under-50k">Under ₹50,000</SelectItem>
                      <SelectItem value="50k-1lakh">₹50,000 - ₹1,00,000</SelectItem>
                      <SelectItem value="1lakh-2lakh">₹1,00,000 - ₹2,00,000</SelectItem>
                      <SelectItem value="above-2lakh">Above ₹2,00,000</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional information you'd like to share..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Welcome to NextStep!</DialogTitle>
          <DialogDescription>
            Let's get to know you better to provide personalized career guidance.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {STEPS.map((step) => (
                <div
                  key={step.id}
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium ${
                    step.id === currentStep
                      ? "bg-primary text-primary-foreground"
                      : step.id < currentStep
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.id}
                </div>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {STEPS.length}
            </div>
          </div>

          <Progress value={progress} className="w-full" />

          <Card>
            <CardHeader>
              <CardTitle>{STEPS[currentStep - 1]?.title}</CardTitle>
              <CardDescription>{STEPS[currentStep - 1]?.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {renderStep()}

                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                    >
                      Previous
                    </Button>

                    {currentStep < STEPS.length ? (
                      <Button type="button" onClick={nextStep}>
                        Next
                      </Button>
                    ) : (
                      <Button type="submit">Complete</Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}