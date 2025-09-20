"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="bg-green-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Título largo sin truncate */}
          <div className="flex-shrink-0 font-bold text-lg sm:text-xl md:text-2xl leading-tight">
            Uso de IAs Generativas y Agente GAR - Checkpoint 3 y 7
          </div>

          {/* Links de navegación */}
          <div className="hidden md:flex space-x-6 text-sm md:text-base font-medium">
            <Link href="/" className="hover:text-amber-400 transition">
              Inicio
            </Link>
            <Link href="/memorias" className="hover:text-amber-400 transition">
              Memorias
            </Link>
            <Link href="/chat" className="hover:text-amber-400 transition">
              Chat Archivista
            </Link>
            <Link href="/timeline" className="hover:text-amber-400 transition">
              Línea de Tiempo
            </Link>
            <Link href="/mihistoria" className="hover:text-amber-400 transition">
              Mi historia
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

