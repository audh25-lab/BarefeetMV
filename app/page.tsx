import Link from "next/link"

export default function Home() {
  return (
    <main>
      <h1>BarefeetMV 👣</h1>
      <p>A playful learning world for kids.</p>

      <Link href="/play">
        <button>Start Learning</button>
      </Link>
    </main>
  )
}