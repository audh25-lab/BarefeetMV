export function watchOffline(setOffline: (v: boolean) => void) {
  setOffline(!navigator.onLine)

  window.addEventListener("offline", () => setOffline(true))
  window.addEventListener("online", () => setOffline(false))
}