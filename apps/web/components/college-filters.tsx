"use client"

import React from "react"
import { IconFilter, IconX } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface FilterProps {
  onBranchChange: (branch: string | null) => void
  onDegreeTypeChange: (degreeType: string | null) => void
  onCollegeTypeChange: (collegeType: string | null) => void
  selectedBranch?: string | null
  selectedDegreeType?: string | null
  selectedCollegeType?: string | null
}

const branches = [
  "Computer Science and Engineering",
  "Information Technology",
  "Electronics and Communication",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Computer Engineering",
  "Electronics Engineering",
  "Information Science and Engineering",
  "Electronics and Instrumentation",
  "Computer Science and Automation",
  "Electrical Communication Engineering",
  "Information and Communication Technology"
]

const degreeTypes = ["B.Tech", "M.Tech", "PhD"]
const collegeTypes = ["Government", "Private"]

export function CollegeFilters({
  onBranchChange,
  onDegreeTypeChange,
  onCollegeTypeChange,
  selectedBranch,
  selectedDegreeType,
  selectedCollegeType
}: FilterProps) {
  const clearAllFilters = () => {
    onBranchChange(null)
    onDegreeTypeChange(null)
    onCollegeTypeChange(null)
  }

  const hasActiveFilters = selectedBranch || selectedDegreeType || selectedCollegeType

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <IconFilter className="h-5 w-5" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-8 px-2 text-xs"
            >
              <IconX className="h-3 w-3 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">College Type</label>
            {selectedCollegeType && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCollegeTypeChange(null)}
                className="h-6 px-2 text-xs"
              >
                <IconX className="h-3 w-3" />
              </Button>
            )}
          </div>
          <Select
            value={selectedCollegeType || undefined}
            onValueChange={(value) => onCollegeTypeChange(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select college type" />
            </SelectTrigger>
            <SelectContent>
              {collegeTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Degree Type</label>
            {selectedDegreeType && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDegreeTypeChange(null)}
                className="h-6 px-2 text-xs"
              >
                <IconX className="h-3 w-3" />
              </Button>
            )}
          </div>
          <Select
            value={selectedDegreeType || undefined}
            onValueChange={(value) => onDegreeTypeChange(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select degree type" />
            </SelectTrigger>
            <SelectContent>
              {degreeTypes.map((degree) => (
                <SelectItem key={degree} value={degree}>
                  {degree}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Branch/Stream</label>
            {selectedBranch && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onBranchChange(null)}
                className="h-6 px-2 text-xs"
              >
                <IconX className="h-3 w-3" />
              </Button>
            )}
          </div>
          <Select
            value={selectedBranch || undefined}
            onValueChange={(value) => onBranchChange(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select branch" />
            </SelectTrigger>
            <SelectContent>
              {branches.map((branch) => (
                <SelectItem key={branch} value={branch}>
                  {branch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters && (
          <>
            <Separator />
            <div className="space-y-2">
              <label className="text-sm font-medium">Active Filters</label>
              <div className="flex flex-wrap gap-2">
                {selectedCollegeType && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {selectedCollegeType}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 hover:bg-transparent"
                      onClick={() => onCollegeTypeChange(null)}
                    >
                      <IconX className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                {selectedDegreeType && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {selectedDegreeType}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 hover:bg-transparent"
                      onClick={() => onDegreeTypeChange(null)}
                    >
                      <IconX className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                {selectedBranch && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {selectedBranch.length > 20 ? `${selectedBranch.substring(0, 20)}...` : selectedBranch}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 hover:bg-transparent"
                      onClick={() => onBranchChange(null)}
                    >
                      <IconX className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}