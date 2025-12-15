"use client"

import { useEffect, useState } from "react"
import { getSession } from "@/lib/session"
import { useRouter } from "next/navigation"

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const session = getSession()
    if (!session) router.push("/login")
    else setReady(true)
  }, [])

  if (!ready) return null
  return <>{children}</>
}