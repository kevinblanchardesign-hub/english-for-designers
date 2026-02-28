'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMagnetic, setIsMagnetic] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 30, stiffness: 400, mass: 0.5 }
  const ringSpringConfig = { damping: 20, stiffness: 200, mass: 0.8 }

  const dotX = useSpring(mouseX, springConfig)
  const dotY = useSpring(mouseY, springConfig)
  const ringX = useSpring(mouseX, ringSpringConfig)
  const ringY = useSpring(mouseY, ringSpringConfig)

  useEffect(() => {
    // Only show on devices with fine pointer (desktop)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const updateCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [role="button"], input, select, textarea, label, [data-cursor="hover"]')
      const isMagneticEl = target.closest('[data-cursor="magnetic"]')
      setIsHovering(!!isInteractive)
      setIsMagnetic(!!isMagneticEl)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', updateCursor)
    window.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', updateCursor)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [mouseX, mouseY, isVisible])

  // Magnetic effect
  useEffect(() => {
    if (!isMagnetic) return

    const handleMagneticMove = (e: MouseEvent) => {
      const magneticEls = document.querySelectorAll('[data-cursor="magnetic"]')
      magneticEls.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const elCenterX = rect.left + rect.width / 2
        const elCenterY = rect.top + rect.height / 2
        const distance = Math.sqrt(
          Math.pow(e.clientX - elCenterX, 2) + Math.pow(e.clientY - elCenterY, 2),
        )

        if (distance < 80) {
          const pull = 0.25
          const pullX = (e.clientX - elCenterX) * pull
          const pullY = (e.clientY - elCenterY) * pull
          ;(el as HTMLElement).style.transform = `translate(${pullX}px, ${pullY}px)`
        } else {
          ;(el as HTMLElement).style.transform = ''
        }
      })
    }

    window.addEventListener('mousemove', handleMagneticMove)
    return () => {
      window.removeEventListener('mousemove', handleMagneticMove)
      document.querySelectorAll('[data-cursor="magnetic"]').forEach((el) => {
        ;(el as HTMLElement).style.transform = ''
      })
    }
  }, [isMagnetic])

  return (
    <>
      {/* Dot cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-multiply"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-3 h-3 rounded-full bg-brand-navy" />
      </motion.div>

      {/* Ring cursor */}
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1 : 1,
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="rounded-full border-2 border-brand-navy w-full h-full"
          style={{ opacity: isHovering ? 0.6 : 0.35 }}
        />
      </motion.div>
    </>
  )
}
