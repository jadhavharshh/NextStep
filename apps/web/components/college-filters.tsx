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
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconFilter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Filter colleges</span>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <IconX className="h-3 w-3 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Select
          value={selectedCollegeType || undefined}
          onValueChange={(value) => onCollegeTypeChange(value)}
        >
          <SelectTrigger className="w-40 h-9">
            <SelectValue placeholder="College type" />
          </SelectTrigger>
          <SelectContent>
            {collegeTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedDegreeType || undefined}
          onValueChange={(value) => onDegreeTypeChange(value)}
        >
          <SelectTrigger className="w-36 h-9">
            <SelectValue placeholder="Degree type" />
          </SelectTrigger>
          <SelectContent>
            {degreeTypes.map((degree) => (
              <SelectItem key={degree} value={degree}>
                {degree}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedBranch || undefined}
          onValueChange={(value) => onBranchChange(value)}
        >
          <SelectTrigger className="w-60 h-9">
            <SelectValue placeholder="Branch/Stream" />
          </SelectTrigger>
          <SelectContent>
            {branches.map((branch) => (
              <SelectItem key={branch} value={branch}>
                {branch}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <div className="flex items-center gap-2 ml-2">
            {selectedCollegeType && (
              <Badge variant="secondary" className="flex items-center gap-1 h-7">
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
              <Badge variant="secondary" className="flex items-center gap-1 h-7">
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
              <Badge variant="secondary" className="flex items-center gap-1 h-7">
                {selectedBranch.length > 25 ? `${selectedBranch.substring(0, 25)}...` : selectedBranch}
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
        )}
      </div>
    </div>
  )
}