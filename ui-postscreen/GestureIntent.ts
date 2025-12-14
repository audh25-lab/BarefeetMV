export class GestureIntent {
  interpret(deltaX: number, deltaY: number) {
    if (deltaY < -50) return "explore"
    if (deltaY > 50) return "rest"
    if (deltaX > 50) return "advance"
    if (deltaX < -50) return "reflect"
    return "neutral"
  }
}
