"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { LocationSelector } from "@/components/location-selector"
import { CollegeFilters } from "@/components/college-filters"
import { CollegeDirectoryTable } from "@/components/college-directory-table"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import collegesData from "./colleges-data.json"

export default function CollegeDirectoryPage() {
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null)
  const [selectedDegreeType, setSelectedDegreeType] = useState<string | null>(null)
  const [selectedCollegeType, setSelectedCollegeType] = useState<string | null>(null)

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
          <div className="@container/main flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <h1 className="text-2xl font-bold">College Directory</h1>
                <p className="text-muted-foreground">Find the best colleges and institutions based on your location and preferences</p>
              </div>

              <div className="px-4 lg:px-6">
                <LocationSelector
                  onLocationChange={setSelectedLocation}
                  selectedLocation={selectedLocation}
                />
              </div>

              <div className="px-4 lg:px-6 space-y-6">
                <CollegeFilters
                  onBranchChange={setSelectedBranch}
                  onDegreeTypeChange={setSelectedDegreeType}
                  onCollegeTypeChange={setSelectedCollegeType}
                  selectedBranch={selectedBranch}
                  selectedDegreeType={selectedDegreeType}
                  selectedCollegeType={selectedCollegeType}
                />

                <CollegeDirectoryTable
                  colleges={collegesData as any}
                  selectedLocation={selectedLocation}
                  selectedBranch={selectedBranch}
                  selectedDegreeType={selectedDegreeType}
                  selectedCollegeType={selectedCollegeType}
                />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}