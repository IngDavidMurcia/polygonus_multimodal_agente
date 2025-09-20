"use client"

import React, { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"

type Emotion = "Esperanza" | "Alegría" | "Tristeza" | "Resiliencia" | "Miedo" | "Neutral"

interface Props {
  emotion: Emotion
  isThinking?: boolean
}

interface Leaf {
  id: number
  cx: number
  cy: number
  r: number
  state?: "alive" | "falling" | "growing"
}

export default function InteractiveTree({ emotion, isThinking = false }: Props) {
  const controls = useAnimation()
  const [scale, setScale] = useState(1.0)
  const [leaves, setLeaves] = useState<Leaf[]>(() => generateInitialLeaves(12))

  // Mapeo de colores según emoción
  const emotionMap = {
    Esperanza: { leaf: "#C6F6D5", accent: "#34D399" },
    Alegría: { leaf: "#FEF3C7", accent: "#F59E0B" },
    Tristeza: { leaf: "#BFDBFE", accent: "#60A5FA" },
    Resiliencia: { leaf: "#D1FAE5", accent: "#10B981" },
    Miedo: { leaf: "#FCE7F3", accent: "#EC4899" },
    Neutral: { leaf: "#A7F3D0", accent: "#34D399" },
  } as const

  const cfg = emotionMap[emotion]

  // Animación sway global
  useEffect(() => {
    controls.start({
      rotate: [0, -2, 2, 0],
      transition: { duration: 1.4, ease: "easeInOut" },
    })
  }, [emotion, controls])

  // Evolución según emoción
  useEffect(() => {
    if (["Alegría", "Esperanza", "Resiliencia"].includes(emotion)) {
      // Crece y brotan hojas nuevas
      setScale((s) => Math.min(s + 0.05, 1.6)) // límite superior
      setLeaves((prev) => {
        const extra = generateLeaves(3, prev.length, "growing")
        return [...prev, ...extra].slice(0, 40)
      })
    } else if (["Tristeza", "Miedo"].includes(emotion)) {
      // Se encoge y algunas hojas caen
      setScale((s) => Math.max(s - 0.03, 0.6)) // límite inferior
      setLeaves((prev) => {
        if (prev.length <= 5) return prev
        // marcar algunas hojas como "falling"
        const updated = [...prev]
        const toFall = 2
        for (let i = 0; i < toFall; i++) {
          const idx = Math.floor(Math.random() * updated.length)
          if (updated[idx].state !== "falling") {
            updated[idx] = { ...updated[idx], state: "falling" }
          }
        }
        return updated
      })
    }
    // Neutral → no cambia
  }, [emotion])

  // Cuando una hoja termina de caer, la eliminamos
  const handleLeafFallComplete = (id: number) => {
    setLeaves((prev) => prev.filter((leaf) => leaf.id !== id))
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.svg
        width="500"
        height="500"
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
        animate={controls}
        style={{ originX: "50%", originY: "70%", scale }}
      >
        {/* Tronco */}
        <rect
          x="230"
          y="280"
          width="40"
          height="160"
          rx="12"
          fill="#8B5E3C"
          stroke="#7A4F2E"
        />

        {/* Ramas */}
        <path d="M250 280 C200 240, 160 200, 130 160" stroke="#7A4F2E" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M250 280 C300 240, 340 200, 370 160" stroke="#7A4F2E" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M250 280 C220 230, 200 200, 180 170" stroke="#7A4F2E" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M250 280 C280 230, 300 200, 320 170" stroke="#7A4F2E" strokeWidth="6" fill="none" strokeLinecap="round" />

        {/* Hojas dinámicas */}
        {leaves.map((leaf) => (
          <motion.circle
            key={leaf.id}
            cx={leaf.cx}
            cy={leaf.cy}
            r={leaf.r}
            fill={cfg.leaf}
            stroke={cfg.accent}
            strokeWidth={2}
            initial={leaf.state === "growing" ? { scale: 0, opacity: 0 } : undefined}
            animate={
              leaf.state === "falling"
                ? { y: 200, opacity: 0 }
                : { scale: 1, opacity: 1, y: isThinking ? [0, -2, 0] : 0 }
            }
            transition={
              leaf.state === "falling"
                ? { duration: 2, ease: "easeIn" }
                : leaf.state === "growing"
                ? { duration: 1, ease: "easeOut" }
                : { duration: 1.2, repeat: isThinking ? Infinity : 0, repeatType: "reverse", ease: "easeInOut" }
            }
            onAnimationComplete={() => leaf.state === "falling" && handleLeafFallComplete(leaf.id)}
          />
        ))}

        {/* Suelo */}
        <ellipse cx="250" cy="460" rx="180" ry="30" fill="#0F172A" opacity="0.08" />
      </motion.svg>
    </div>
  )
}

/** Generador inicial de hojas */
function generateInitialLeaves(n: number): Leaf[] {
  return Array.from({ length: n }).map((_, i) => ({
    id: i,
    cx: 200 + Math.random() * 100,
    cy: 140 + Math.random() * 100,
    r: 18 + Math.random() * 10,
    state: "alive" as const,
  }))
}

/** Generar hojas nuevas */
function generateLeaves(n: number, offset: number, state: "growing" | "alive"): Leaf[] {
  return Array.from({ length: n }).map((_, i) => ({
    id: offset + i,
    cx: 180 + Math.random() * 140,
    cy: 120 + Math.random() * 120,
    r: 16 + Math.random() * 12,
    state,
  }))
}
