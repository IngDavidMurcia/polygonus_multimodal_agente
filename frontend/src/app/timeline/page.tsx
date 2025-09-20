"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import memorias from "@/src/data/memorias.json"

// Extraer año numérico de "Año 1025"
const getYear = (fecha: string | undefined) => {
  if (!fecha) return null
  const match = fecha.match(/\d{3,4}/)
  return match ? parseInt(match[0]) : null
}

export default function TimelinePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Refs para scroll automático
  const pointsRef = useRef<(HTMLDivElement | null)[]>([])

  // Orden cronológico
  const memoriasOrdenadas = [...memorias].sort((a, b) => {
    const yearA = getYear(a.date) || 0
    const yearB = getYear(b.date) || 0
    return yearA - yearB
  })

  const toggleOpen = (idx: number) => {
    if (openIndex === idx) {
      setOpenIndex(null)
    } else {
      setOpenIndex(idx)
    }
  }

  // Scroll automático cuando se abre un punto
  useEffect(() => {
    if (openIndex !== null && pointsRef.current[openIndex]) {
      pointsRef.current[openIndex]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      })
    }
  }, [openIndex])

  // Fondo dinámico
  const fondoImagen =
    openIndex !== null && memoriasOrdenadas[openIndex]?.image
      ? `url(${memoriasOrdenadas[openIndex].image})`
      : "none"

  return (
    <div
      className="min-h-screen py-12 px-6 relative"
      style={{
        backgroundImage: fondoImagen,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center drop-shadow-lg">
          📜 Línea de Tiempo del Árbol
        </h1>
        <p className="text-center text-gray-200 mt-4 max-w-2xl mx-auto">
          Haz clic en los puntos de la línea para explorar los recuerdos.
        </p>

        {/* Timeline container */}
        <div className="mt-12 relative">
          {/* Vertical (mobile) */}
          <div className="flex flex-col md:hidden relative">
            <div className="absolute left-5 top-0 bottom-0 w-1 bg-green-300"></div>

            <div className="space-y-10 ml-12">
              {memoriasOrdenadas.map((m, idx) => (
                <div key={idx} className="relative">
                  {/* Punto + Año */}
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => toggleOpen(idx)}
                      className={`w-5 h-5 rounded-full cursor-pointer border-2 border-white transition 
                        ${openIndex === idx ? "bg-amber-400" : "bg-green-300 hover:bg-amber-300"}`}
                      title={`Ver memoria: ${m.title}`}
                    ></div>
                    <span className="text-sm font-semibold text-white drop-shadow">
                      {getYear(m.date) ?? "—"}
                    </span>
                  </div>

                  {/* Contenido expandible */}
                  <AnimatePresence>
                    {openIndex === idx && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="bg-white/90 rounded-xl shadow-lg p-6 mt-4">
                          <h3 className="text-lg font-bold text-green-900">{m.title}</h3>
                          {m.date && <p className="text-sm text-gray-500">📅 {m.date}</p>}
                          {m.location && <p className="text-sm text-gray-500">📍 {m.location}</p>}
                          {m.emotion && <p className="text-sm text-gray-500">💭 {m.emotion}</p>}
                          <p className="mt-3 text-gray-700">{m.text}</p>

                          {m.audio && (
                            <audio controls className="mt-4 w-full">
                              <source src={m.audio} type="audio/mpeg" />
                              Tu navegador no soporta el reproductor de audio.
                            </audio>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Horizontal (desktop) con scroll lateral */}
          <div className="hidden md:block relative">
            <div className="overflow-x-auto">
              <div className="flex items-start space-x-20 min-w-[1000px] relative">
                {/* Línea horizontal */}
                <div className="absolute top-6 left-0 right-0 h-1 bg-green-300"></div>

                {memoriasOrdenadas.map((m, idx) => (
                  <div
                    key={idx}
                    ref={(el) => (pointsRef.current[idx] = el)}
                    className="flex flex-col items-center relative min-w-[120px]"
                  >
                    {/* Punto + Año */}
                    <div
                      onClick={() => toggleOpen(idx)}
                      className={`w-6 h-6 rounded-full cursor-pointer border-2 border-white transition 
                        ${openIndex === idx ? "bg-amber-400" : "bg-green-300 hover:bg-amber-300"}`}
                      title={`Ver memoria: ${m.title}`}
                    ></div>
                    <span className="text-sm font-semibold text-white mt-2 drop-shadow">
                      {getYear(m.date) ?? "—"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tarjeta emergente flotante */}
            <AnimatePresence>
              {openIndex !== null && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-white/95 rounded-xl shadow-lg p-6 w-96 z-50"
                >
                  <h3 className="text-lg font-bold text-green-900">
                    {memoriasOrdenadas[openIndex].title}
                  </h3>
                  {memoriasOrdenadas[openIndex].date && (
                    <p className="text-sm text-gray-500">
                      📅 {memoriasOrdenadas[openIndex].date}
                    </p>
                  )}
                  {memoriasOrdenadas[openIndex].location && (
                    <p className="text-sm text-gray-500">
                      📍 {memoriasOrdenadas[openIndex].location}
                    </p>
                  )}
                  {memoriasOrdenadas[openIndex].emotion && (
                    <p className="text-sm text-gray-500">
                      💭 {memoriasOrdenadas[openIndex].emotion}
                    </p>
                  )}
                  <p className="mt-3 text-gray-700 text-sm">
                    {memoriasOrdenadas[openIndex].text}
                  </p>

                  {memoriasOrdenadas[openIndex].audio && (
                    <audio controls className="mt-4 w-full">
                      <source src={memoriasOrdenadas[openIndex].audio} type="audio/mpeg" />
                      Tu navegador no soporta el reproductor de audio.
                    </audio>
                  )}

                  {/* Botón cerrar */}
                  <button
                    onClick={() => setOpenIndex(null)}
                    className="absolute top-2 right-3 text-gray-500 hover:text-black"
                  >
                    ✖
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
