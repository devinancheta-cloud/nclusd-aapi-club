"use client"

import { useState } from "react"
import { LatticeFrame, GeometricDivider } from "./lattice-frame"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Plus, 
  Package, 
  DollarSign, 
  Edit2, 
  Trash2, 
  Save,
  X,
  ImagePlus
} from "lucide-react"
import type { ShopItem } from "./club-shop"

interface AdminDashboardProps {
  items: ShopItem[]
  onAddItem: (item: Omit<ShopItem, "id">) => void
  onUpdateItem: (id: string, item: Partial<ShopItem>) => void
  onDeleteItem: (id: string) => void
}

export function AdminDashboard({ 
  items, 
  onAddItem, 
  onUpdateItem, 
  onDeleteItem 
}: AdminDashboardProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl font-semibold flex items-center gap-3">
          <span className="w-1 h-6 bg-accent rounded-sm" />
          Inventory Management
        </h2>
        <Button 
          onClick={() => setShowAddForm(true)} 
          className="gap-2"
          disabled={showAddForm}
        >
          <Plus className="w-4 h-4" />
          Add New Item
        </Button>
      </div>

      {/* Add New Item Form */}
      {showAddForm && (
        <AddItemForm 
          onSubmit={(item) => {
            onAddItem(item)
            setShowAddForm(false)
          }}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Inventory Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          label="Total Items"
          value={items.length.toString()}
          icon={Package}
        />
        <StatCard
          label="In Stock"
          value={items.filter(i => i.inStock).length.toString()}
          icon={Package}
          variant="success"
        />
        <StatCard
          label="Total Value"
          value={`$${items.reduce((sum, i) => sum + i.price, 0).toFixed(0)}`}
          icon={DollarSign}
          variant="gold"
        />
      </div>

      <GeometricDivider />

      {/* Inventory Table */}
      <LatticeFrame variant="default" size="sm">
        <div className="bg-card rounded-sm overflow-hidden">
          {/* Table Header */}
          <div 
            className="grid grid-cols-12 gap-3 px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground"
            style={{
              background: `linear-gradient(90deg, oklch(0.93 0.02 85), oklch(0.95 0.01 85))`
            }}
          >
            <div className="col-span-1">Image</div>
            <div className="col-span-3">Name</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border/50">
            {items.map((item) => (
              <InventoryRow
                key={item.id}
                item={item}
                isEditing={editingId === item.id}
                onEdit={() => setEditingId(item.id)}
                onSave={(updates) => {
                  onUpdateItem(item.id, updates)
                  setEditingId(null)
                }}
                onCancel={() => setEditingId(null)}
                onDelete={() => onDeleteItem(item.id)}
              />
            ))}
          </div>

          {items.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No items in inventory</p>
              <p className="text-sm">Add your first item to get started</p>
            </div>
          )}
        </div>
      </LatticeFrame>
    </section>
  )
}

function StatCard({ 
  label, 
  value, 
  icon: Icon,
  variant = "default"
}: { 
  label: string
  value: string
  icon: React.ElementType
  variant?: "default" | "success" | "gold"
}) {
  const variants = {
    default: "bg-muted/50 border-border/50",
    success: "bg-primary/5 border-primary/20",
    gold: "bg-accent/10 border-accent/30"
  }

  const iconVariants = {
    default: "text-muted-foreground",
    success: "text-primary",
    gold: "text-accent"
  }

  return (
    <div className={`p-4 rounded-sm border ${variants[variant]}`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-sm bg-background flex items-center justify-center ${iconVariants[variant]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="font-serif font-bold text-xl">{value}</p>
        </div>
      </div>
    </div>
  )
}

function AddItemForm({ 
  onSubmit, 
  onCancel 
}: { 
  onSubmit: (item: Omit<ShopItem, "id">) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "Apparel",
    image: "",
    badge: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      category: formData.category,
      image: formData.image || "📦",
      badge: formData.badge || undefined,
      inStock: true
    })
  }

  return (
    <LatticeFrame variant="gold" size="md">
      <form 
        onSubmit={handleSubmit}
        className="p-4 bg-card rounded-sm space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-serif font-semibold text-lg">Add New Item</h3>
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Item Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Club T-Shirt"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full h-9 px-3 rounded-sm border border-input bg-background text-sm"
            >
              <option>Apparel</option>
              <option>Accessories</option>
              <option>Food</option>
              <option>Stationery</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Input
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Comfortable cotton tee with club logo"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Price ($)</label>
            <Input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              placeholder="15.00"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Original Price ($)</label>
            <Input
              type="number"
              step="0.01"
              value={formData.originalPrice}
              onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
              placeholder="20.00"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Badge Text</label>
            <Input
              value={formData.badge}
              onChange={(e) => setFormData(prev => ({ ...prev, badge: e.target.value }))}
              placeholder="NEW"
              maxLength={8}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Image Emoji (placeholder)</label>
          <Input
            value={formData.image}
            onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
            placeholder="👕"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" className="flex-1 gap-2">
            <Save className="w-4 h-4" />
            Save Item
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </LatticeFrame>
  )
}

function InventoryRow({ 
  item, 
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete 
}: { 
  item: ShopItem
  isEditing: boolean
  onEdit: () => void
  onSave: (updates: Partial<ShopItem>) => void
  onCancel: () => void
  onDelete: () => void
}) {
  const [editData, setEditData] = useState({
    price: item.price.toString(),
    inStock: item.inStock
  })

  if (isEditing) {
    return (
      <div className="grid grid-cols-12 gap-3 px-4 py-3 items-center bg-accent/5">
        <div className="col-span-1 text-2xl">{item.image}</div>
        <div className="col-span-3 font-medium">{item.name}</div>
        <div className="col-span-2 text-sm text-muted-foreground">{item.category}</div>
        <div className="col-span-2">
          <Input
            type="number"
            step="0.01"
            value={editData.price}
            onChange={(e) => setEditData(prev => ({ ...prev, price: e.target.value }))}
            className="h-8 w-24"
          />
        </div>
        <div className="col-span-2">
          <button
            type="button"
            onClick={() => setEditData(prev => ({ ...prev, inStock: !prev.inStock }))}
            className={`px-2 py-1 rounded-sm text-xs font-medium ${
              editData.inStock 
                ? "bg-primary/10 text-primary" 
                : "bg-muted text-muted-foreground"
            }`}
          >
            {editData.inStock ? "In Stock" : "Out of Stock"}
          </button>
        </div>
        <div className="col-span-2 flex justify-end gap-2">
          <Button 
            size="sm" 
            variant="ghost"
            onClick={() => onSave({ 
              price: parseFloat(editData.price), 
              inStock: editData.inStock 
            })}
          >
            <Save className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-12 gap-3 px-4 py-3 items-center hover:bg-muted/30 transition-colors">
      <div className="col-span-1 text-2xl">{item.image}</div>
      <div className="col-span-3">
        <p className="font-medium">{item.name}</p>
        {item.badge && (
          <span className="text-xs text-primary">{item.badge}</span>
        )}
      </div>
      <div className="col-span-2 text-sm text-muted-foreground">{item.category}</div>
      <div className="col-span-2">
        <span className="font-medium">${item.price.toFixed(2)}</span>
        {item.originalPrice && (
          <span className="text-xs text-muted-foreground line-through ml-2">
            ${item.originalPrice.toFixed(2)}
          </span>
        )}
      </div>
      <div className="col-span-2">
        <span className={`px-2 py-1 rounded-sm text-xs font-medium ${
          item.inStock 
            ? "bg-primary/10 text-primary" 
            : "bg-destructive/10 text-destructive"
        }`}>
          {item.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>
      <div className="col-span-2 flex justify-end gap-1">
        <Button size="sm" variant="ghost" onClick={onEdit}>
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={onDelete}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
