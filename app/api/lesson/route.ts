import { NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

type LessonRequest = {
  world: string
  age: number
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LessonRequest
    const { world, age } = body

    if (!world || typeof age !== "number") {
      return NextResponse.json(
        { error: "Missing or invalid world or age" },
        { status: 400 }
      )
    }

    const prompt = `
Create a short educational lesson.

World: ${world}
Age: ${age}

Rules:
- Friendly
- Factual
- Age appropriate
- 3 short sections
- Encourage curiosity
`

    const res = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "user", content: prompt }
          ],
          temperature: 0.7
        })
      }
    )

    if (!res.ok) {
      const err = await res.text()
      return NextResponse.json(
        { error: "LLM request failed", details: err },
        { status: 500 }
      )
    }

    const data = await res.json()
    const lesson =
      data?.choices?.[0]?.message?.content ?? ""

    return NextResponse.json({
      world,
      age,
      lesson
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    )
  }
}