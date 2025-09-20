"use client"

import { useState, useRef } from "react"

interface MemoryCardProps {
  title: string
  text: string
  image: string
  audio: string
  date?: string
  location?: string
  emotion?: string
}

export default function MemoryCard({ title, text, image, audio, date, location, emotion }: MemoryCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
    }
  }

  return (
    <>
      {/* Tarjeta pequeña */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-sm mx-auto">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-bold text-green-900">{title}</h3>
          <p className="text-gray-700 text-sm mt-2 line-clamp-3">{text}</p>

          {/* Metadatos */}
          <div className="mt-3 text-xs text-gray-500 space-y-1">
            {date && <p>📅 <span className="italic">{date}</span></p>}
            {location && <p>📍 <span className="italic">{location}</span></p>}
            {emotion && <p>💭 <span className="italic">{emotion}</span></p>}
          </div>

          {/* Botón abrir modal */}
          <button
            onClick={() => setIsOpen(true)}
            className="mt-4 w-full px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition"
          >
            ▶️ Escuchar
          </button>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 relative">
            {/* Botón cerrar */}
            <button
              onClick={() => {
                setIsOpen(false)
                if (audioRef.current) audioRef.current.pause()
              }}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              ✖
            </button>

            {/* Contenido modal */}
            <h2 className="text-2xl font-bold text-green-900 mb-2">{title}</h2>
            {date && <p className="text-sm text-gray-500">📅 {date}</p>}
            {location && <p className="text-sm text-gray-500">📍 {location}</p>}
            {emotion && <p className="text-sm text-gray-500">💭 {emotion}</p>}

            <img src={image} alt={title} className="mt-4 w-full max-h-96 object-cover rounded-lg" />
            <p className="mt-4 text-gray-700">{text}</p>

            {/* Audio player */}
            <audio
              ref={audioRef}
              controls
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              className="mt-6 w-full"
            >
              <source src={audio} type="audio/mpeg" />
              Tu navegador no soporta audio.
            </audio>
          </div>
        </div>
      )}
    </>
  )
}
