"use client"

import { LatticeFrame } from "./lattice-frame"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star } from "lucide-react"

export interface ShopItem {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  inStock: boolean
  badge?: string
}

interface ClubShopProps {
  items: ShopItem[]
  onAddToCart?: (item: ShopItem) => void
}

export function ClubShop({ items, onAddToCart }: ClubShopProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl font-semibold flex items-center gap-3">
          <span className="w-1 h-6 bg-primary rounded-sm" />
          Club Shop
        </h2>
        <Button variant="outline" size="sm" className="gap-2">
          <ShoppingCart className="w-4 h-4" />
          View Cart
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <ProductCard key={item.id} item={item} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  )
}

function ProductCard({ item, onAddToCart }: { item: ShopItem; onAddToCart?: (item: ShopItem) => void }) {
  const discount = item.originalPrice 
    ? Math.round((1 - item.price / item.originalPrice) * 100) 
    : 0

  return (
    <LatticeFrame variant="gold" size="sm">
      <div className="bg-card rounded-sm overflow-hidden">
        {/* Image area with seal badge */}
        <div className="relative aspect-square bg-muted">
          <div 
            className="absolute inset-0 flex items-center justify-center text-4xl"
            style={{
              background: `
                linear-gradient(135deg, 
                  oklch(0.95 0.01 85) 0%, 
                  oklch(0.90 0.02 85) 100%
                )
              `
            }}
          >
            {item.image}
          </div>
          
          {/* Traditional seal badge for discounts */}
          {item.badge && (
            <div className="absolute top-2 right-2">
              <div 
                className="w-12 h-12 rounded-full bg-primary flex items-center justify-center relative"
                style={{
                  boxShadow: "inset 0 0 0 2px oklch(0.55 0.18 25), inset 0 0 0 4px oklch(0.45 0.18 25)"
                }}
              >
                <span className="text-primary-foreground text-xs font-bold text-center leading-tight">
                  {item.badge}
                </span>
                {/* Seal texture */}
                <div 
                  className="absolute inset-0 rounded-full opacity-20"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 30% 30%, white 0%, transparent 50%),
                      radial-gradient(circle at 70% 70%, black 0%, transparent 30%)
                    `
                  }}
                />
              </div>
            </div>
          )}

          {discount > 0 && !item.badge && (
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-sm">
              {discount}% OFF
            </div>
          )}

          {!item.inStock && (
            <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
              <span className="bg-background text-foreground px-3 py-1 text-sm font-medium rounded-sm">
                Sold Out
              </span>
            </div>
          )}
        </div>

        {/* Product info with red-gold border accent */}
        <div 
          className="p-3 border-t-2"
          style={{
            borderImage: "linear-gradient(90deg, oklch(0.45 0.18 25), oklch(0.70 0.14 80), oklch(0.45 0.18 25)) 1"
          }}
        >
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {item.category}
          </span>
          <h3 className="font-medium text-sm mt-1 line-clamp-1">{item.name}</h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-baseline gap-2">
              <span className="font-serif font-bold text-lg text-primary">
                ${item.price.toFixed(2)}
              </span>
              {item.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  ${item.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            <Button 
              size="sm" 
              disabled={!item.inStock}
              onClick={() => onAddToCart?.(item)}
              className="h-8 px-3 text-xs"
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </LatticeFrame>
  )
}

export function ShopCategories({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: { 
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void 
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-sm text-sm font-medium whitespace-nowrap transition-colors ${
            activeCategory === category
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80 text-muted-foreground"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
