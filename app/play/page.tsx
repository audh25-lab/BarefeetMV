"use client"

import Link from "next/link"
import { getStars } from "../../lib/progress"

export default function PlayHub() {
  const stars = getStars()

  return (
    <main>
      <h2>Choose a Game 🎮</h2>
      <p>⭐ Stars earned: {stars}</p>

      <ul>
        <li><Link href="/play/letters">🔤 Letters</Link></li>
        <li><Link href="/play/numbers">🔢 Numbers</Link></li>
        <li><Link href="/play/colors">🎨 Colors</Link></li>
      </ul>
    </main>
  )
}