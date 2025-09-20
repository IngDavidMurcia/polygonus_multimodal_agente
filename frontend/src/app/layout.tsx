import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"


export const metadata = {
  title: "El Diario de un Árbol Milenario",
  description: "Un viaje poético a través de la memoria de un árbol que ha visto mil años de historia.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen bg-gradient-to-b from-green-900 to-amber-100">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
