export class LLMLessonService {
  async generate(world: string, age: number) {
    try {
      const res = await fetch("/api/lesson", {
        method: "POST",
        body: JSON.stringify({ world, age })
      })
      return await res.text()
    } catch {
      return this.fallback(world, age)
    }
  }

  fallback(world: string, age: number) {
    return age < 8
      ? `Let’s explore ${world} with a story and pictures.`
      : `Let’s analyze how ${world} shaped civilization.`
  }
}