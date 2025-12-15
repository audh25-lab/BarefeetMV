import { setSession } from "./session"
import { UserRole } from "./roles"

export function loginAs(role: UserRole, name: string) {
  setSession({
    id: crypto.randomUUID(),
    role,
    name
  })
}