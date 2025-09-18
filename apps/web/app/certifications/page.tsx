"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { CertificationFilters } from "@/components/certification-filters"
import { CertificationDirectoryTable } from "@/components/certification-directory-table"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { certificationsData } from "./certifications-data"

export default function CertificationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null)

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
                <h1 className="text-2xl font-bold">Certifications Directory</h1>
                <p className="text-muted-foreground">Discover professional certifications and courses to advance your career</p>
              </div>

              <div className="px-4 lg:px-6 space-y-6">
                <CertificationFilters
                  onCategoryChange={setSelectedCategory}
                  onLevelChange={setSelectedLevel}
                  onProviderChange={setSelectedProvider}
                  onPriceRangeChange={setSelectedPriceRange}
                  selectedCategory={selectedCategory}
                  selectedLevel={selectedLevel}
                  selectedProvider={selectedProvider}
                  selectedPriceRange={selectedPriceRange}
                />

                <CertificationDirectoryTable
                  certifications={certificationsData}
                  selectedCategory={selectedCategory}
                  selectedLevel={selectedLevel}
                  selectedProvider={selectedProvider}
                  selectedPriceRange={selectedPriceRange}
                />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}