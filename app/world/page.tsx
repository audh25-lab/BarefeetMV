"use client"

import { useEffect, useRef } from "react"
import { WorldEngine } from "@/engine/WorldEngine"

export default function WorldPage() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    new WorldEngine(ref.current)
  }, [])

  return (
    <div
      ref={ref}
      style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
    />
  )
}