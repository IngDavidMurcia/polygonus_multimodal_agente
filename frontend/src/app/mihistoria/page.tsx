"use client"

import React from "react"

export default function MiHistoriaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-6 text-center">
        🌳 Mi historia
      </h1>
      <p className="text-gray-700 max-w-2xl mb-8 text-center">
        Acompaña al árbol milenario en un viaje narrativo y visual. Aquí podrás ver un corto animado que revive los momentos más importantes de sus memorias.
      </p>
      <div className="w-full max-w-3xl aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
        <video
          controls
          className="w-full h-full object-cover"
          poster="https://res.cloudinary.com/dqmzeguwn/image/upload/f_webp,q_auto/v1758358577/postervideo_opwbdo.jpg"
        >
          <source src="https://res.cloudinary.com/dqmzeguwn/video/upload/f_auto,q_auto/v1758350319/DiarioArbolMilenario_n4nwnz.mp4" type="video/mp4" />
          Tu navegador no soporta video.
        </video>
      </div>
    </div>
  )
}
