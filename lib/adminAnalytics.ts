export function collectMetric(type: string, value: number) {
  const key = "barefeetmv:analytics"
  const data = JSON.parse(localStorage.getItem(key) || "[]")
  data.push({ type, value, time: Date.now() })
  localStorage.setItem(key, JSON.stringify(data))
}