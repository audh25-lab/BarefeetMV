export class WorldDataInjector {
  async inject(topic: string) {
    const res = await fetch(`/api/data?topic=${topic}`)
    return res.json()
  }
}