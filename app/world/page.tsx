"use client"

import { useEffect, useRef } from "react"
import { WorldEngine } from "@/engine/WorldEngine"
import WorldOverlay from "@/ui/WorldOverlay"

export default function WorldPage() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const world = new WorldEngine()
    world.mount(ref.current)
  }, [])

  return (
    <>
      <div ref={ref} style={{ width: "100vw", height: "100vh" }} />
      <WorldOverlay />
    </>
  )
}