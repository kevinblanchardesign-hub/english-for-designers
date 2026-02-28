'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface DragItem {
  id: string
  label: string
  targetId: string
}

interface DropZone {
  id: string
  label: string
}

interface DragDropProps {
  items: DragItem[]
  zones: DropZone[]
  onComplete?: (score: number) => void
}

export function DragDrop({ items, zones, onComplete }: DragDropProps) {
  const [placements, setPlacements] = useState<Record<string, string>>({})
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [isChecked, setIsChecked] = useState(false)

  const unplacedItems = items.filter((item) => !Object.values(placements).includes(item.id))

  const handleDrop = (zoneId: string) => {
    if (!draggedItem) return
    setPlacements((prev) => {
      const newPlacements = { ...prev }
      // Remove item from any previous zone
      Object.entries(newPlacements).forEach(([key, val]) => {
        if (val === draggedItem) delete newPlacements[key]
      })
      newPlacements[zoneId] = draggedItem
      return newPlacements
    })
    setDraggedItem(null)
  }

  const checkAnswers = () => {
    const correct = Object.entries(placements).filter(([zoneId, itemId]) => {
      const item = items.find((i) => i.id === itemId)
      return item?.targetId === zoneId
    }).length
    const score = Math.round((correct / items.length) * 100)
    setIsChecked(true)
    onComplete?.(score)
  }

  const allPlaced = Object.keys(placements).length === items.length

  return (
    <div>
      {/* Unplaced items */}
      <div className="mb-6">
        <p className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wide">Éléments à placer</p>
        <div className="flex flex-wrap gap-2">
          {unplacedItems.map((item) => (
            <motion.div
              key={item.id}
              draggable
              onDragStart={() => setDraggedItem(item.id)}
              onDragEnd={() => setDraggedItem(null)}
              className="px-4 py-2 rounded-xl bg-brand-azure border-2 border-brand-navy/20 text-sm font-bold text-brand-navy cursor-grab active:cursor-grabbing select-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.div>
          ))}
          {unplacedItems.length === 0 && (
            <p className="text-sm text-gray-400 italic">Tous les éléments sont placés</p>
          )}
        </div>
      </div>

      {/* Drop zones */}
      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        {zones.map((zone) => {
          const placedItemId = placements[zone.id]
          const placedItem = items.find((i) => i.id === placedItemId)
          const isCorrect = isChecked && placedItem?.targetId === zone.id
          const isWrong = isChecked && placedItem && placedItem.targetId !== zone.id

          return (
            <div
              key={zone.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(zone.id)}
              className={cn(
                'min-h-16 rounded-2xl border-2 border-dashed p-4 transition-all duration-200',
                !placedItem && draggedItem ? 'border-brand-navy bg-brand-azure/40 scale-[1.02]' : 'border-gray-200 bg-white',
                isCorrect && 'border-brand-success bg-green-50',
                isWrong && 'border-brand-error bg-red-50',
              )}
            >
              <p className="text-xs font-bold text-gray-400 mb-2">{zone.label}</p>
              {placedItem && (
                <div
                  className={cn(
                    'px-3 py-2 rounded-xl text-sm font-bold inline-block',
                    isCorrect ? 'bg-brand-success text-white' : isWrong ? 'bg-brand-error text-white' : 'bg-brand-navy text-white',
                  )}
                  onClick={() => {
                    if (!isChecked) {
                      setPlacements((prev) => {
                        const next = { ...prev }
                        delete next[zone.id]
                        return next
                      })
                    }
                  }}
                >
                  {placedItem.label} {isCorrect && '✓'} {isWrong && '✗'}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {!isChecked && (
        <button
          onClick={checkAnswers}
          disabled={!allPlaced}
          className="w-full py-4 rounded-2xl bg-brand-navy text-white font-bold hover:bg-brand-navy-dark disabled:opacity-50 transition-colors"
        >
          Vérifier mes réponses
        </button>
      )}
    </div>
  )
}
