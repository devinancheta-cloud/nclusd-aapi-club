"use client"

import { cn } from "@/lib/utils"
import { 
  Home, 
  ShoppingBag, 
  Calendar, 
  TrendingUp, 
  Settings,
  Users,
  BookOpen,
  Sparkles
} from "lucide-react"

interface SidebarNavProps {
  activeSection: string
  onSectionChange: (section: string) => void
  isAdmin?: boolean
}

const studentNavItems = [
  { id: "home", label: "Home", icon: Home, description: "Welcome" },
  { id: "shop", label: "Shop", icon: ShoppingBag, description: "Merchandise" },
  { id: "trips", label: "Field Trips", icon: Calendar, description: "Events" },
  { id: "culture", label: "Heritage", icon: BookOpen, description: "Learn" },
]

const adminNavItems = [
  { id: "admin", label: "Dashboard", icon: Settings, description: "Manage" },
  { id: "profit", label: "Profits", icon: TrendingUp, description: "Sales" },
  { id: "members", label: "Members", icon: Users, description: "Students" },
]

export function SidebarNav({ activeSection, onSectionChange, isAdmin = false }: SidebarNavProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-20 lg:w-64 bg-sidebar text-sidebar-foreground flex flex-col z-50">
      {/* Logo area with traditional pattern */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-sm bg-primary flex items-center justify-center relative overflow-hidden">
            <Sparkles className="w-6 h-6 text-primary-foreground relative z-10" />
            {/* Traditional pattern overlay */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, currentColor 1px, transparent 1px),
                  linear-gradient(-45deg, currentColor 1px, transparent 1px)
                `,
                backgroundSize: "6px 6px"
              }}
            />
          </div>
          <div className="hidden lg:block">
            <h1 className="font-serif font-semibold text-lg leading-tight">AAPI Club</h1>
            <p className="text-xs text-sidebar-foreground/60">Lincoln High</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="px-3 mb-2">
          <span className="hidden lg:block text-xs uppercase tracking-wider text-sidebar-foreground/40 font-medium px-3">
            Student
          </span>
        </div>
        
        {studentNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 lg:px-6 py-3 transition-all relative group",
              activeSection === item.id 
                ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                : "hover:bg-sidebar-accent/50"
            )}
          >
            {/* Active indicator - traditional style */}
            {activeSection === item.id && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-sm" />
            )}
            
            <div className={cn(
              "w-10 h-10 rounded-sm flex items-center justify-center transition-colors",
              activeSection === item.id 
                ? "bg-primary text-primary-foreground" 
                : "bg-sidebar-accent/30 group-hover:bg-sidebar-accent"
            )}>
              <item.icon className="w-5 h-5" />
            </div>
            
            <div className="hidden lg:block text-left">
              <span className="block font-medium text-sm">{item.label}</span>
              <span className="block text-xs text-sidebar-foreground/50">{item.description}</span>
            </div>
          </button>
        ))}

        {isAdmin && (
          <>
            <div className="px-3 mt-6 mb-2">
              <span className="hidden lg:block text-xs uppercase tracking-wider text-sidebar-foreground/40 font-medium px-3">
                Admin
              </span>
              <div className="lg:hidden mx-3 h-px bg-sidebar-border my-2" />
            </div>
            
            {adminNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 lg:px-6 py-3 transition-all relative group",
                  activeSection === item.id 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                    : "hover:bg-sidebar-accent/50"
                )}
              >
                {activeSection === item.id && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent rounded-r-sm" />
                )}
                
                <div className={cn(
                  "w-10 h-10 rounded-sm flex items-center justify-center transition-colors",
                  activeSection === item.id 
                    ? "bg-accent text-accent-foreground" 
                    : "bg-sidebar-accent/30 group-hover:bg-sidebar-accent"
                )}>
                  <item.icon className="w-5 h-5" />
                </div>
                
                <div className="hidden lg:block text-left">
                  <span className="block font-medium text-sm">{item.label}</span>
                  <span className="block text-xs text-sidebar-foreground/50">{item.description}</span>
                </div>
              </button>
            ))}
          </>
        )}
      </nav>

      {/* Admin toggle */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={() => onSectionChange(isAdmin ? "home" : "admin")}
          className="w-full flex items-center justify-center lg:justify-start gap-2 px-3 py-2 rounded-sm bg-sidebar-accent/30 hover:bg-sidebar-accent transition-colors text-sm"
        >
          <Settings className="w-4 h-4" />
          <span className="hidden lg:inline">
            {isAdmin ? "Student View" : "Teacher Login"}
          </span>
        </button>
      </div>
    </aside>
  )
}
