export class LessonEngine {
  generate(world: string, age: number) {
    if (world === "roman") {
      return age < 8
        ? "Romans built roads to help people travel."
        : "Roman infrastructure enabled trade and empire control."
    }

    if (world === "china") {
      return age < 8
        ? "Ancient China made paper!"
        : "Imperial China advanced bureaucracy and science."
    }

    return "Let’s explore!"
  }
}