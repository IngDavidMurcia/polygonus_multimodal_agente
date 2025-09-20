import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="w-full bg-green-950 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Título */}
        <Link href="/" className="text-xl font-bold tracking-wide">
          Árbol Milenario - Uso de IAs generativas - Pieza Creativa Multimodal y Agente GAR
        </Link>

        {/* Links */}
        <div className="flex gap-6">
          <Link href="/" className="hover:text-amber-400 transition">
            Inicio
          </Link>
          <Link href="/memorias" className="hover:text-amber-400 transition">
            Memorias
          </Link>
          <Link href="/chat" className="hover:text-amber-400 transition">
            Chat
          </Link>
          <Link href="/timeline" className="hover:text-amber-400 transition">
  Línea de Tiempo
</Link>

        </div>
      </div>
    </nav>
  )
}
