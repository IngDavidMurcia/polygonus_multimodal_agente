"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-green-900 text-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / título */}
          <div className="flex-shrink-0 font-bold text-lg sm:text-xl md:text-2xl leading-tight">
          Uso de IAs Generativas y Agente RAG - Checkpoint 3 y 7
          </div>

          {/* Menú Desktop */}
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

          {/* Botón hamburguesa móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-green-800 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay oscuro */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black md:hidden"
              onClick={() => setIsOpen(false)} // cierra si hacen clic afuera
            />

            {/* Menú desplegable móvil con animación */}
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-green-800 px-4 pt-2 pb-4 space-y-2 shadow-lg overflow-hidden relative z-50"
            >
              <Link
                href="/"
                className="block hover:text-amber-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/memorias"
                className="block hover:text-amber-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Memorias
              </Link>
              <Link
                href="/chat"
                className="block hover:text-amber-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Chat Archivista
              </Link>
              <Link
                href="/timeline"
                className="block hover:text-amber-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Línea de Tiempo
              </Link>
              <Link
                href="/mihistoria"
                className="block hover:text-amber-400 transition"
                onClick={() => setIsOpen(false)}
              >
                Mi historia
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
