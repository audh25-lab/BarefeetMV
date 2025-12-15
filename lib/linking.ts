export type ChildLink = {
  childId: string
  name: string
}

const KEY = "barefeetmv:links"

export function linkChild(child: ChildLink) {
  const list = JSON.parse(localStorage.getItem(KEY) || "[]")
  list.push(child)
  localStorage.setItem(KEY, JSON.stringify(list))
}

export function getLinkedChildren(): ChildLink[] {
  return JSON.parse(localStorage.getItem(KEY) || "[]")
}