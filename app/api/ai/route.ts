import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { topic, age } = await req.json()

  return NextResponse.json({
    title: `Explore ${topic}`,
    objective: `Learn ${topic} at age ${age}`,
    activities: [
      "Observe environment",
      "Interact with objects",
      "Answer reflection question"
    ]
  })
}