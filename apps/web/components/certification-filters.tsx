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
  onCategoryChange: (category: string | null) => void
  onLevelChange: (level: string | null) => void
  onProviderChange: (provider: string | null) => void
  onPriceRangeChange: (priceRange: string | null) => void
  selectedCategory?: string | null
  selectedLevel?: string | null
  selectedProvider?: string | null
  selectedPriceRange?: string | null
}

const categories = [
  "Cloud Computing",
  "Cybersecurity",
  "Networking",
  "Programming",
  "Development",
  "Cloud Administration",
  "Container Orchestration",
  "CRM Platform",
  "Containerization",
  "Infrastructure as Code"
]

const levels = ["Fundamental", "Entry Level", "Associate", "Professional", "Administrator"]

const providers = [
  "Amazon Web Services",
  "Microsoft",
  "Google Cloud",
  "Cisco",
  "Oracle",
  "CompTIA",
  "Cloud Native Computing Foundation",
  "Salesforce",
  "Docker",
  "HashiCorp"
]

const priceRanges = [
  { label: "Under $100", value: "0-100" },
  { label: "$100 - $200", value: "100-200" },
  { label: "$200 - $300", value: "200-300" },
  { label: "Over $300", value: "300+" }
]

export function CertificationFilters({
  onCategoryChange,
  onLevelChange,
  onProviderChange,
  onPriceRangeChange,
  selectedCategory,
  selectedLevel,
  selectedProvider,
  selectedPriceRange
}: FilterProps) {
  const clearAllFilters = () => {
    onCategoryChange(null)
    onLevelChange(null)
    onProviderChange(null)
    onPriceRangeChange(null)
  }

  const hasActiveFilters = selectedCategory || selectedLevel || selectedProvider || selectedPriceRange

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconFilter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Filter certifications</span>
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
          value={selectedCategory || undefined}
          onValueChange={(value) => onCategoryChange(value)}
        >
          <SelectTrigger className="w-48 h-9">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedLevel || undefined}
          onValueChange={(value) => onLevelChange(value)}
        >
          <SelectTrigger className="w-40 h-9">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            {levels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedProvider || undefined}
          onValueChange={(value) => onProviderChange(value)}
        >
          <SelectTrigger className="w-52 h-9">
            <SelectValue placeholder="Provider" />
          </SelectTrigger>
          <SelectContent>
            {providers.map((provider) => (
              <SelectItem key={provider} value={provider}>
                {provider}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedPriceRange || undefined}
          onValueChange={(value) => onPriceRangeChange(value)}
        >
          <SelectTrigger className="w-40 h-9">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            {priceRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <div className="flex items-center gap-2 ml-2">
            {selectedCategory && (
              <Badge variant="secondary" className="flex items-center gap-1 h-7">
                {selectedCategory}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 hover:bg-transparent"
                  onClick={() => onCategoryChange(null)}
                >
                  <IconX className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {selectedLevel && (
              <Badge variant="secondary" className="flex items-center gap-1 h-7">
                {selectedLevel}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 hover:bg-transparent"
                  onClick={() => onLevelChange(null)}
                >
                  <IconX className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {selectedProvider && (
              <Badge variant="secondary" className="flex items-center gap-1 h-7">
                {selectedProvider.length > 20 ? `${selectedProvider.substring(0, 20)}...` : selectedProvider}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 hover:bg-transparent"
                  onClick={() => onProviderChange(null)}
                >
                  <IconX className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {selectedPriceRange && (
              <Badge variant="secondary" className="flex items-center gap-1 h-7">
                {priceRanges.find(r => r.value === selectedPriceRange)?.label}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 hover:bg-transparent"
                  onClick={() => onPriceRangeChange(null)}
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