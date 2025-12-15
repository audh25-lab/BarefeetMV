export function enableXR(renderer: any) {
  if ("xr" in navigator) {
    renderer.xr.enabled = true
    return "XR ENABLED"
  }
  return "SCREEN MODE"
}