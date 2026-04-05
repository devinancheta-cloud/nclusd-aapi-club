
"use client"

import { useState, useCallback } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { HeroSection } from "@/components/hero-section"
import { ClubShop, ShopCategories, type ShopItem } from "@/components/club-shop"
import { ProfitFeed } from "@/components/profit-feed"
import { FieldTripTimeline } from "@/components/field-trip-timeline"
import { AdminDashboard } from "@/components/admin-dashboard"
import { LatticeFrame, GeometricDivider } from "@/components/lattice-frame"
import { Bell, Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Initial shop items data
const initialShopItems: ShopItem[] = [
  {
    id: "1",
    name: "AAPI Heritage Tee",
    description: "Soft cotton t-shirt with traditional pattern design",
    price: 18.00,
    originalPrice: 25.00,
    image: "👕",
    category: "Apparel",
    inStock: true,
    badge: "SALE"
  },
  {
    id: "2",
    name: "Hello Panda",
    description: "Bite-sized, crunchy cookies with a creamy filling; available in chocolate",
    price: 1.00,
    image: "🐼",
    category: "Food",
    inStock: true,
    badge: null
  },
  {
    id: "3",
    name: "Pocky",
    description: "Crispy biscuit sticks coated in a sweet, creamy frosting; available in chocolate, strawberry, and cookies & cream",
    price: 2.00,
    image: "🍫",
    category: "Food",
    inStock: true,
    badge: null
  },
  {
    id: "4",
    name: "Maruchan Instant Ramen",
    description: "Instant ramen in a cup; available in chicken flavor",
    price: 2.00,
    image: "🍜",
    category: "Food",
    inStock: true,
  },
]

const fieldTrips = [
  {
    id: "1",
    title: "Asian Art Museum Tour",
    location: "Downtown Art District",
    date: "Apr 15",
    time: "10:00 AM",
    spotsLeft: 8,
    totalSpots: 25,
    description: "Explore the rich heritage of Asian art through centuries of masterpieces. Guided tour included.",
    status: "registration" as const
  },
  {
    id: "2",
    title: "Lunar New Year Festival",
    location: "Chinatown Square",
    date: "Feb 10",
    time: "11:00 AM",
    spotsLeft: 0,
    totalSpots: 40,
    description: "Join us for dragon dances, traditional food, and cultural performances.",
    status: "completed" as const
  },
  {
    id: "3",
    title: "Japanese Garden Visit",
    location: "Botanical Gardens",
    date: "May 5",
    time: "9:30 AM",
    spotsLeft: 20,
    totalSpots: 30,
    description: "Experience the tranquility of traditional Japanese garden design and tea ceremony.",
    status: "upcoming" as const
  },
  {
    id: "4",
    title: "K-Town Food Tour",
    location: "Koreatown",
    date: "Jun 8",
    time: "12:00 PM",
    spotsLeft: 15,
    totalSpots: 20,
    description: "Taste authentic Korean cuisine from bibimbap to Korean BBQ.",
    status: "registration" as const
  },
]

const recentSales = [
  { id: "1", item: "Heritage Tee", amount: 18.00, time: "2:34 PM" },
  { id: "2", item: "Sticker Pack", amount: 5.00, time: "2:15 PM" },
  { id: "3", item: "Club Hoodie", amount: 35.00, time: "1:52 PM" },
  { id: "4", item: "Red Envelopes", amount: 8.00, time: "1:30 PM" },
  { id: "5", item: "Pin Set", amount: 10.00, time: "12:45 PM" },
]

const categories = ["All", "Apparel", "Accessories", "Stationery", "Food"]

export default function AAPIClubPage() {
  const [activeSection, setActiveSection] = useState("home")
  const [shopItems, setShopItems] = useState<ShopItem[]>(initialShopItems)
  const [activeCategory, setActiveCategory] = useState("All")
  
  const isAdmin = ["admin", "profit", "members"].includes(activeSection)

  const filteredItems = activeCategory === "All" 
    ? shopItems 
    : shopItems.filter(item => item.category === activeCategory)

  const handleAddItem = useCallback((newItem: Omit<ShopItem, "id">) => {
    const item: ShopItem = {
      ...newItem,
      id: Date.now().toString()
    }
    setShopItems(prev => [...prev, item])
  }, [])

  const handleUpdateItem = useCallback((id: string, updates: Partial<ShopItem>) => {
    setShopItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ))
  }, [])

  const handleDeleteItem = useCallback((id: string) => {
    setShopItems(prev => prev.filter(item => item.id !== id))
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar Navigation */}
      <SidebarNav 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        isAdmin={isAdmin}
      />

      {/* Main Content Area */}
      <main className="ml-20 lg:ml-64 min-h-screen">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search events, merchandise..." 
                className="pl-10 bg-muted/50 border-0"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </Button>
              
              <div className="flex items-center gap-2 pl-3 border-l border-border">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium hidden md:inline">Student</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {/* Student Home View */}
          {activeSection === "home" && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 space-y-6">
                <HeroSection />
                
                <GeometricDivider />
                
                {/* Featured Shop Items */}
                <div>
                  <ShopCategories 
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                  />
                  <div className="mt-4">
                    <ClubShop items={filteredItems.slice(0, 4)} />
                  </div>
                </div>
              </div>
              
              {/* Sidebar Widgets */}
              <div className="space-y-6">
                <ProfitFeed 
                  totalProfit={1247.50}
                  todayProfit={86.00}
                  weeklyGoal={500}
                  recentSales={recentSales}
                />
                
                {/* Upcoming Event Widget */}
                <LatticeFrame variant="gold" size="sm">
                  <div className="p-4 bg-card rounded-sm">
                    <h3 className="font-serif font-semibold mb-3">Next Event</h3>
                    <div className="flex gap-3">
                      <div 
                        className="w-12 h-12 rounded-sm flex flex-col items-center justify-center text-center shrink-0"
                        style={{
                          background: `linear-gradient(135deg, oklch(0.45 0.18 25), oklch(0.40 0.15 25))`
                        }}
                      >
                        <span className="text-primary-foreground text-xs">APR</span>
                        <span className="text-primary-foreground text-lg font-bold leading-none">15</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Asian Art Museum Tour</p>
                        <p className="text-xs text-muted-foreground mt-0.5">10:00 AM - 8 spots left</p>
                        <Button size="sm" className="mt-2 h-7 text-xs">
                          Register Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </LatticeFrame>

                {/* Club Stats Widget */}
                <LatticeFrame variant="default" size="sm">
                  <div className="p-4 bg-card rounded-sm">
                    <h3 className="font-serif font-semibold mb-3">Club Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Members</span>
                        <span className="font-medium">127</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Events This Year</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Service Hours</span>
                        <span className="font-medium">450+</span>
                      </div>
                    </div>
                  </div>
                </LatticeFrame>
              </div>
            </div>
          )}

          {/* Shop View */}
          {activeSection === "shop" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="font-serif text-2xl font-bold">Club Shop</h1>
              </div>
              
              <ShopCategories 
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
              
              <ClubShop items={filteredItems} />
            </div>
          )}

          {/* Field Trips View */}
          {activeSection === "trips" && (
            <div className="max-w-3xl">
              <FieldTripTimeline trips={fieldTrips} />
            </div>
          )}

          {/* Heritage/Culture View */}
          {activeSection === "culture" && (
            <div className="space-y-6">
              <h1 className="font-serif text-2xl font-bold flex items-center gap-3">
                <span className="w-1 h-8 bg-primary rounded-sm" />
                AAPI Heritage Resources
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "East Asian Heritage", regions: "China, Japan, Korea", icon: "🏯" },
                  { title: "Southeast Asian Heritage", regions: "Vietnam, Philippines, Thailand", icon: "🛕" },
                  { title: "South Asian Heritage", regions: "India, Pakistan, Bangladesh", icon: "🕌" },
                  { title: "Pacific Islander Heritage", regions: "Hawaii, Samoa, Fiji", icon: "🏝️" },
                  { title: "Central Asian Heritage", regions: "Kazakhstan, Uzbekistan", icon: "⛺" },
                  { title: "AAPI History", regions: "Immigration & Civil Rights", icon: "📚" },
                ].map((resource) => (
                  <LatticeFrame key={resource.title} variant="default" size="sm">
                    <div className="p-4 bg-card rounded-sm hover:bg-muted/30 transition-colors cursor-pointer">
                      <div className="text-3xl mb-3">{resource.icon}</div>
                      <h3 className="font-serif font-semibold">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{resource.regions}</p>
                    </div>
                  </LatticeFrame>
                ))}
              </div>
            </div>
          )}

          {/* Admin Dashboard View */}
          {activeSection === "admin" && (
            <AdminDashboard
              items={shopItems}
              onAddItem={handleAddItem}
              onUpdateItem={handleUpdateItem}
              onDeleteItem={handleDeleteItem}
            />
          )}

          {/* Profit View */}
          {activeSection === "profit" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h1 className="font-serif text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 bg-accent rounded-sm" />
                  Sales Dashboard
                </h1>
                <ProfitFeed 
                  totalProfit={1247.50}
                  todayProfit={86.00}
                  weeklyGoal={500}
                  recentSales={recentSales}
                />
              </div>
              
              {/* Sales breakdown */}
              <LatticeFrame variant="default" size="md">
                <div className="p-4 bg-card rounded-sm">
                  <h3 className="font-serif font-semibold mb-4">Sales by Category</h3>
                  <div className="space-y-3">
                    {[
                      { category: "Apparel", amount: 645, percentage: 52 },
                      { category: "Accessories", amount: 312, percentage: 25 },
                      { category: "Stationery", amount: 198, percentage: 16 },
                      { category: "Food", amount: 92, percentage: 7 },
                    ].map((cat) => (
                      <div key={cat.category}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{cat.category}</span>
                          <span className="font-medium">${cat.amount}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-sm overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-sm"
                            style={{ width: `${cat.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </LatticeFrame>
            </div>
          )}

          {/* Members View */}
          {activeSection === "members" && (
            <div className="space-y-6">
              <h1 className="font-serif text-2xl font-bold flex items-center gap-3">
                <span className="w-1 h-8 bg-accent rounded-sm" />
                Club Members
              </h1>
              
              <div className="grid grid-cols-3 gap-4">
                <LatticeFrame variant="default" size="sm">
                  <div className="p-4 bg-card rounded-sm text-center">
                    <p className="font-serif text-3xl font-bold text-primary">127</p>
                    <p className="text-sm text-muted-foreground">Active Members</p>
                  </div>
                </LatticeFrame>
                <LatticeFrame variant="gold" size="sm">
                  <div className="p-4 bg-card rounded-sm text-center">
                    <p className="font-serif text-3xl font-bold text-accent">23</p>
                    <p className="text-sm text-muted-foreground">New This Month</p>
                  </div>
                </LatticeFrame>
                <LatticeFrame variant="default" size="sm">
                  <div className="p-4 bg-card rounded-sm text-center">
                    <p className="font-serif text-3xl font-bold">8</p>
                    <p className="text-sm text-muted-foreground">Officers</p>
                  </div>
                </LatticeFrame>
              </div>
              
              <p className="text-muted-foreground">Member management interface coming soon...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
