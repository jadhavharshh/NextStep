"use client"

import { useState } from "react"
import { IconMapPin, IconLoader } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const indianCities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
  "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur",
  "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad",
  "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik",
  "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivali", "Vasai-Virar", "Varanasi"
]

interface LocationSelectorProps {
  onLocationChange: (location: string) => void
  selectedLocation?: string
}

export function LocationSelector({ onLocationChange, selectedLocation }: LocationSelectorProps) {
  const [currentLocation, setCurrentLocation] = useState<string | null>(selectedLocation || null)
  const [isDetecting, setIsDetecting] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)

  const detectLocation = async () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser")
      return
    }

    setIsDetecting(true)
    setLocationError(null)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
          )
          const data = await response.json()
          const detectedCity = data.city || data.locality || "Unknown"
          setCurrentLocation(detectedCity)
          onLocationChange(detectedCity)
        } catch (error) {
          setLocationError("Failed to detect location")
          console.error("Location detection error:", error)
        } finally {
          setIsDetecting(false)
        }
      },
      (error) => {
        setLocationError("Location access denied")
        setIsDetecting(false)
        console.error("Geolocation error:", error)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    )
  }

  const handleLocationSelect = (location: string) => {
    setCurrentLocation(location)
    onLocationChange(location)
    setLocationError(null)
  }

  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg border bg-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconMapPin className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Select Location</h3>
        </div>
        {currentLocation && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <IconMapPin className="h-3 w-3" />
            {currentLocation}
          </Badge>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          onClick={detectLocation}
          disabled={isDetecting}
          variant="outline"
          className="flex-1"
        >
          {isDetecting ? (
            <>
              <IconLoader className="h-4 w-4 animate-spin" />
              Detecting...
            </>
          ) : (
            <>
              <IconMapPin className="h-4 w-4" />
              Detect Location
            </>
          )}
        </Button>

        <div className="flex-1">
          <Select value={currentLocation || ""} onValueChange={handleLocationSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Or select a city" />
            </SelectTrigger>
            <SelectContent>
              {indianCities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {locationError && (
        <p className="text-sm text-red-500">{locationError}</p>
      )}
    </div>
  )
}