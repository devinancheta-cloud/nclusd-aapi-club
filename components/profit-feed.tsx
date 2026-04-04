"use client"

import { useEffect, useState } from "react"
import { LatticeFrame } from "./lattice-frame"
import { TrendingUp, TrendingDown, DollarSign, Package, ShoppingBag } from "lucide-react"

interface SaleEntry {
  id: string
  item: string
  amount: number
  time: string
  buyer?: string
}

interface ProfitFeedProps {
  totalProfit: number
  todayProfit: number
  weeklyGoal: number
  recentSales: SaleEntry[]
}

export function ProfitFeed({ totalProfit, todayProfit, weeklyGoal, recentSales }: ProfitFeedProps) {
  const [animatedTotal, setAnimatedTotal] = useState(totalProfit)
  const progress = Math.min((totalProfit / weeklyGoal) * 100, 100)

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedTotal(prev => prev + Math.random() * 0.5)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <LatticeFrame variant="dark" size="md">
      <div 
        className="rounded-sm p-5"
        style={{
          background: `
            linear-gradient(180deg, 
              oklch(0.12 0.02 30) 0%, 
              oklch(0.15 0.02 30) 100%
            )
          `
        }}
      >
        {/* Header styled like scroll title */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-sm bg-accent/10 border border-accent/20">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-accent text-xs font-medium uppercase tracking-wider">
              Live Ledger
            </span>
          </div>
        </div>

        {/* Main profit display - ledger style */}
        <div 
          className="relative p-4 rounded-sm mb-4"
          style={{
            background: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 23px,
                oklch(0.25 0.02 30) 23px,
                oklch(0.25 0.02 30) 24px
              ),
              linear-gradient(90deg, 
                oklch(0.18 0.015 40) 0%, 
                oklch(0.20 0.01 45) 100%
              )
            `,
            boxShadow: "inset 0 0 20px oklch(0 0 0 / 0.3)"
          }}
        >
          {/* Traditional scroll edge effect */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-3 opacity-50"
            style={{
              background: `linear-gradient(90deg, oklch(0.30 0.02 30), transparent)`
            }}
          />
          <div 
            className="absolute right-0 top-0 bottom-0 w-3 opacity-50"
            style={{
              background: `linear-gradient(-90deg, oklch(0.30 0.02 30), transparent)`
            }}
          />

          <div className="relative text-center">
            <span className="text-white/50 text-xs font-medium uppercase tracking-wider">
              Total Profit
            </span>
            <div className="font-serif text-4xl font-bold text-accent mt-1">
              ${animatedTotal.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 rounded-sm bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
              <TrendingUp className="w-3 h-3" />
              Today
            </div>
            <div className="font-serif font-semibold text-lg text-white">
              +${todayProfit.toFixed(2)}
            </div>
          </div>
          
          <div className="p-3 rounded-sm bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
              <Package className="w-3 h-3" />
              Goal Progress
            </div>
            <div className="font-serif font-semibold text-lg text-white">
              {progress.toFixed(0)}%
            </div>
          </div>
        </div>

        {/* Progress bar styled like traditional pattern */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-white/50 mb-1">
            <span>Weekly Goal</span>
            <span>${weeklyGoal.toFixed(0)}</span>
          </div>
          <div className="h-3 rounded-sm bg-white/10 overflow-hidden relative">
            <div 
              className="h-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: `
                  repeating-linear-gradient(
                    90deg,
                    oklch(0.70 0.14 80),
                    oklch(0.70 0.14 80) 8px,
                    oklch(0.65 0.12 80) 8px,
                    oklch(0.65 0.12 80) 16px
                  )
                `
              }}
            />
            {/* Decorative notches */}
            <div className="absolute inset-0 flex justify-between px-1">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="w-px h-full bg-white/10" />
              ))}
            </div>
          </div>
        </div>

        {/* Recent sales - ledger entries */}
        <div>
          <h4 className="text-white/60 text-xs font-medium uppercase tracking-wider mb-2 flex items-center gap-2">
            <ShoppingBag className="w-3 h-3" />
            Recent Sales
          </h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {recentSales.map((sale, index) => (
              <div 
                key={sale.id}
                className="flex items-center justify-between py-1.5 px-2 rounded-sm text-sm"
                style={{
                  background: index % 2 === 0 ? "oklch(1 0 0 / 0.03)" : "transparent"
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-white/40 text-xs font-mono">{sale.time}</span>
                  <span className="text-white/80">{sale.item}</span>
                </div>
                <span className="text-accent font-medium">+${sale.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LatticeFrame>
  )
}
