"use client"

import { LatticeFrame } from "./lattice-frame"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Users, BookOpen, MapPin, Sparkles, Heart } from "lucide-react"

const quickLinks = [
  {
    title: "Join Club",
    description: "Sign up for membership",
    icon: Users,
    href: "#",
    color: "bg-primary/10 hover:bg-primary/20 border-primary/20"
  },
  {
    title: "Field Trips",
    description: "Upcoming cultural visits",
    icon: MapPin,
    href: "#",
    color: "bg-accent/10 hover:bg-accent/20 border-accent/30"
  },
  {
    title: "Events",
    description: "Lunar New Year & more",
    icon: Calendar,
    href: "#",
    color: "bg-primary/10 hover:bg-primary/20 border-primary/20"
  },
  {
    title: "Resources",
    description: "Learn about AAPI culture",
    icon: BookOpen,
    href: "#",
    color: "bg-accent/10 hover:bg-accent/20 border-accent/30"
  },
  {
    title: "Volunteer",
    description: "Community service hours",
    icon: Heart,
    href: "#",
    color: "bg-primary/10 hover:bg-primary/20 border-primary/20"
  },
  {
    title: "Club Shop",
    description: "Merch & fundraising",
    icon: Sparkles,
    href: "#",
    color: "bg-accent/10 hover:bg-accent/20 border-accent/30"
  },
]

export function HeroSection() {
  return (
    <section className="space-y-6">
      {/* Hero Banner with ink-wash style background */}
      <LatticeFrame variant="red" size="lg">
        <div
          className="relative overflow-hidden rounded-sm min-h-[280px] flex items-center"
          style={{
            background: `
              linear-gradient(135deg, 
                oklch(0.15 0.02 30 / 0.95) 0%, 
                oklch(0.20 0.03 25 / 0.90) 30%,
                oklch(0.25 0.04 30 / 0.85) 60%,
                oklch(0.18 0.02 30 / 0.95) 100%
              )
            `
          }}
        >
          {/* Ink wash texture overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                radial-gradient(ellipse at 20% 30%, oklch(0.40 0.02 30 / 0.4) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 70%, oklch(0.35 0.02 30 / 0.3) 0%, transparent 40%),
                radial-gradient(ellipse at 50% 50%, oklch(0.30 0.02 30 / 0.2) 0%, transparent 60%)
              `
            }}
          />

          {/* Decorative cloud/mountain silhouette */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24 opacity-20"
            style={{
              background: `
                url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath d='M0,60 Q150,20 300,50 T600,40 T900,55 T1200,30 L1200,120 L0,120 Z' fill='%23000'/%3E%3C/svg%3E") bottom/cover no-repeat
              `
            }}
          />

          {/* Content */}
          <div className="relative z-10 p-8 lg:p-12 text-white max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-accent" />
              <span className="text-accent text-sm font-medium tracking-wider uppercase">
                Asian American Pacific Islander
              </span>
            </div>

            <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4 leading-tight text-balance">
              Heritage Club
            </h1>

            <p className="text-white/80 text-lg mb-6 leading-relaxed max-w-lg">
              Celebrating culture, building community, and honoring our diverse Asian American
              and Pacific Islander traditions at Orestimba High School.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                Join Us Today
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                Learn More
              </Button>
            </div>
          </div>

          {/* Decorative seal */}
          <div className="absolute right-8 top-8 w-20 h-20 opacity-30 hidden lg:block">
            <div
              className="w-full h-full rounded-full border-2 border-accent flex items-center justify-center"
              style={{
                backgroundImage: `
                  radial-gradient(circle, transparent 40%, oklch(0.70 0.14 80 / 0.3) 41%, oklch(0.70 0.14 80 / 0.3) 50%, transparent 51%)
                `
              }}
            >
              <span className="text-accent font-serif text-xs text-center leading-tight">
                Est.<br />2024
              </span>
            </div>
          </div>
        </div>
      </LatticeFrame>

      {/* Quick Links Grid */}
      <div>
        <h2 className="font-serif text-xl font-semibold mb-4 flex items-center gap-3">
          <span className="w-1 h-6 bg-primary rounded-sm" />
          Quick Links
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {quickLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className={`group p-4 rounded-sm border transition-all ${link.color}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-sm bg-background/50 flex items-center justify-center shrink-0">
                  <link.icon className="w-5 h-5 text-foreground/70" />
                </div>
                <div>
                  <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {link.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
