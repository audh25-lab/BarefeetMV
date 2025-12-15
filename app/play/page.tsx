import Link from "next/link"

export default function PlayHub() {
  return (
    <main>
      <h2>Choose a Game 🎮</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link href="/play/letters">🔤 Letters Game</Link>
        </li>
        <li>
          <Link href="/play/numbers">🔢 Numbers Game</Link>
        </li>
        <li>
          <Link href="/play/colors">🎨 Colors Game</Link>
        </li>
      </ul>
    </main>
  )
}