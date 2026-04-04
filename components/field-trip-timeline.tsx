"use client"

import { LatticeFrame } from "./lattice-frame"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Users, Clock, ChevronRight } from "lucide-react"

interface FieldTrip {
  id: string
  title: string
  location: string
  date: string
  time: string
  spotsLeft: number
  totalSpots: number
  description: string
  status: "upcoming" | "registration" | "full" | "completed"
}

interface FieldTripTimelineProps {
  trips: FieldTrip[]
  onRegister?: (tripId: string) => void
}

export function FieldTripTimeline({ trips, onRegister }: FieldTripTimelineProps) {
  return (
    <section className="space-y-6">
      <h2 className="font-serif text-xl font-semibold flex items-center gap-3">
        <span className="w-1 h-6 bg-primary rounded-sm" />
        Field Trip Timeline
      </h2>

      {/* Manuscript-style scroll container */}
      <LatticeFrame variant="default" size="md">
        <div 
          className="p-4 rounded-sm relative"
          style={{
            background: `
              linear-gradient(180deg, 
                oklch(0.97 0.015 80) 0%, 
                oklch(0.95 0.02 75) 100%
              )
            `
          }}
        >
          {/* Decorative scroll edge */}
          <div 
            className="absolute top-0 left-0 right-0 h-4"
            style={{
              background: `
                linear-gradient(180deg, 
                  oklch(0.90 0.02 70) 0%, 
                  transparent 100%
                )
              `
            }}
          />
          
          {/* Timeline */}
          <div className="relative pt-4">
            {/* Central line styled like calligraphy stroke */}
            <div 
              className="absolute left-6 top-0 bottom-0 w-0.5"
              style={{
                background: `
                  linear-gradient(180deg, 
                    oklch(0.45 0.18 25) 0%, 
                    oklch(0.70 0.14 80) 50%,
                    oklch(0.45 0.18 25) 100%
                  )
                `
              }}
            />

            <div className="space-y-6">
              {trips.map((trip, index) => (
                <TimelineEntry 
                  key={trip.id} 
                  trip={trip} 
                  index={index}
                  onRegister={onRegister}
                />
              ))}
            </div>
          </div>

          {/* Decorative scroll bottom */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-4"
            style={{
              background: `
                linear-gradient(0deg, 
                  oklch(0.90 0.02 70) 0%, 
                  transparent 100%
                )
              `
            }}
          />
        </div>
      </LatticeFrame>
    </section>
  )
}

function TimelineEntry({ 
  trip, 
  index,
  onRegister 
}: { 
  trip: FieldTrip
  index: number
  onRegister?: (tripId: string) => void 
}) {
  const statusColors = {
    upcoming: "bg-accent text-accent-foreground",
    registration: "bg-primary text-primary-foreground",
    full: "bg-muted text-muted-foreground",
    completed: "bg-muted/50 text-muted-foreground"
  }

  const statusText = {
    upcoming: "Coming Soon",
    registration: "Register Now",
    full: "Fully Booked",
    completed: "Completed"
  }

  return (
    <div className="relative pl-14">
      {/* Timeline marker - traditional seal style */}
      <div className="absolute left-3 top-2 w-6 h-6 rounded-full border-2 border-primary bg-card flex items-center justify-center z-10">
        <span className="text-xs font-bold text-primary">{index + 1}</span>
      </div>

      {/* Content card styled like manuscript entry */}
      <div 
        className="p-4 rounded-sm border border-border/50 bg-card/50"
        style={{
          boxShadow: "2px 2px 0 oklch(0.85 0.02 70)"
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className={`inline-block px-2 py-0.5 rounded-sm text-xs font-medium ${statusColors[trip.status]}`}>
              {statusText[trip.status]}
            </span>
            <h3 className="font-serif font-semibold text-lg mt-1">{trip.title}</h3>
          </div>
          
          {/* Traditional date seal */}
          <div 
            className="shrink-0 w-14 h-14 rounded-sm flex flex-col items-center justify-center text-center"
            style={{
              background: `linear-gradient(135deg, oklch(0.45 0.18 25), oklch(0.40 0.15 25))`,
              boxShadow: "inset 0 0 0 2px oklch(0.55 0.18 25)"
            }}
          >
            <span className="text-primary-foreground text-xs font-medium">
              {trip.date.split(" ")[0]}
            </span>
            <span className="text-primary-foreground text-lg font-bold leading-none">
              {trip.date.split(" ")[1]}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-3">{trip.description}</p>

        {/* Details grid */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">{trip.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>{trip.time}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="w-3.5 h-3.5" />
            <span>{trip.spotsLeft}/{trip.totalSpots} spots</span>
          </div>
        </div>

        {/* Action */}
        {trip.status === "registration" && (
          <Button 
            size="sm" 
            className="w-full gap-2"
            onClick={() => onRegister?.(trip.id)}
          >
            Register Now
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
