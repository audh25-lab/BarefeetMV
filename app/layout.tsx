import "./globals.css"

export const metadata = {
  title: "BarefeetMV",
  description: "A playful learning world for kids"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}