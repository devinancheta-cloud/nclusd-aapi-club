"use client"

import { cn } from "@/lib/utils"

interface LatticeFrameProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "gold" | "red" | "dark"
  size?: "sm" | "md" | "lg"
}

export function LatticeFrame({ 
  children, 
  className, 
  variant = "default",
  size = "md" 
}: LatticeFrameProps) {
  const borderWidth = size === "sm" ? "8px" : size === "md" ? "12px" : "16px"
  const cornerSize = size === "sm" ? "16px" : size === "md" ? "24px" : "32px"
  
  const colors = {
    default: {
      border: "var(--border)",
      pattern: "var(--muted-foreground)",
      corner: "var(--primary)"
    },
    gold: {
      border: "oklch(0.75 0.12 85)",
      pattern: "oklch(0.65 0.10 80)",
      corner: "oklch(0.70 0.14 80)"
    },
    red: {
      border: "var(--primary)",
      pattern: "oklch(0.35 0.15 25)",
      corner: "oklch(0.45 0.18 25)"
    },
    dark: {
      border: "oklch(0.20 0.02 30)",
      pattern: "oklch(0.30 0.02 30)",
      corner: "oklch(0.15 0.02 30)"
    }
  }

  const currentColors = colors[variant]

  return (
    <div className={cn("relative", className)}>
      {/* Lattice pattern border */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          border: `${borderWidth} solid ${currentColors.border}`,
          backgroundImage: `
            linear-gradient(45deg, ${currentColors.pattern} 1px, transparent 1px),
            linear-gradient(-45deg, ${currentColors.pattern} 1px, transparent 1px)
          `,
          backgroundSize: "8px 8px",
          backgroundPosition: "0 0, 4px 0",
          clipPath: `polygon(
            0 0, 100% 0, 100% 100%, 0 100%,
            0 ${borderWidth}, ${borderWidth} ${borderWidth},
            ${borderWidth} calc(100% - ${borderWidth}),
            calc(100% - ${borderWidth}) calc(100% - ${borderWidth}),
            calc(100% - ${borderWidth}) ${borderWidth},
            0 ${borderWidth}
          )`,
        }}
      />
      
      {/* Corner ornaments */}
      <div 
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: cornerSize,
          height: cornerSize,
          background: `
            linear-gradient(135deg, ${currentColors.corner} 50%, transparent 50%),
            linear-gradient(45deg, transparent 50%, ${currentColors.corner} 50%)
          `,
          backgroundSize: "50% 100%",
          backgroundPosition: "0 0, 100% 0",
          backgroundRepeat: "no-repeat"
        }}
      />
      <div 
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: cornerSize,
          height: cornerSize,
          background: `
            linear-gradient(-135deg, ${currentColors.corner} 50%, transparent 50%),
            linear-gradient(-45deg, transparent 50%, ${currentColors.corner} 50%)
          `,
          backgroundSize: "50% 100%",
          backgroundPosition: "100% 0, 0 0",
          backgroundRepeat: "no-repeat"
        }}
      />
      <div 
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{
          width: cornerSize,
          height: cornerSize,
          background: `
            linear-gradient(45deg, ${currentColors.corner} 50%, transparent 50%),
            linear-gradient(135deg, transparent 50%, ${currentColors.corner} 50%)
          `,
          backgroundSize: "50% 100%",
          backgroundPosition: "0 0, 100% 0",
          backgroundRepeat: "no-repeat"
        }}
      />
      <div 
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: cornerSize,
          height: cornerSize,
          background: `
            linear-gradient(-45deg, ${currentColors.corner} 50%, transparent 50%),
            linear-gradient(-135deg, transparent 50%, ${currentColors.corner} 50%)
          `,
          backgroundSize: "50% 100%",
          backgroundPosition: "100% 0, 0 0",
          backgroundRepeat: "no-repeat"
        }}
      />
      
      {/* Content */}
      <div className="relative" style={{ padding: borderWidth }}>
        {children}
      </div>
    </div>
  )
}

export function GeometricDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-2 py-4", className)}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
      <div className="flex gap-1">
        <div className="w-2 h-2 rotate-45 bg-primary/40" />
        <div className="w-3 h-3 rotate-45 bg-primary/60" />
        <div className="w-2 h-2 rotate-45 bg-primary/40" />
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
    </div>
  )
}
