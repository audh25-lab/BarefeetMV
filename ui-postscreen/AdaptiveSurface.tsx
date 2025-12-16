"use client"

import { useEffect, useRef, useState } from "react"
import { AmbientField } from "./AmbientField"

export default function AdaptiveSurface() {
  const fieldRef = useRef<AmbientField | null>(null)
  const rafRef = useRef<number | null>(null)
  const [state, setState] = useState({
    glow: 0.2,
    motion: 0
  })

  useEffect(() => {
    fieldRef.current = new AmbientField()

    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const loop = () => {
      if (!fieldRef.current) return
      setState(fieldRef.current.state())
      rafRef.current = requestAnimationFrame(loop)
    }

    if (!prefersReducedMotion) {
      loop()
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      rafRef.current = null
      fieldRef.current = null
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",

        background: `radial-gradient(circle,
          rgba(0,229,255,${state.glow}) 0%,
          #001 70%)`,

        transform: `translateY(${state.motion}px)`,
        transition: "background 0.2s ease"
      }}
    />
  )
}