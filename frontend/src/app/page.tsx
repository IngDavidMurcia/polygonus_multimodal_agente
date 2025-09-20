
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-green-900 to-amber-100 text-center px-6">
      {/* Hero Section */}
      <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
        🌳 El Diario de un Árbol Milenario
      </h1>
      <p className="mt-4 text-lg md:text-xl text-amber-200 max-w-2xl">
        Un viaje poético a través de la memoria de un árbol que ha visto mil años de historia.
      </p>

      {/* Botones */}
      <div className="mt-8 flex gap-4">
        <a
          href="/memorias"
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg transition"
        >
          Explorar memorias
        </a>
        <a
          href="/chat"
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-lg transition"
        >
          Hablar con el Árbol
        </a>
      </div>

      {/* Imagen Hero */}
      <div className="mt-12 max-w-3xl">
        <img
          src="/images/renacer.jpg"
          alt="Árbol milenario al amanecer"
          className="rounded-2xl shadow-xl"
        />
      </div>
    </main>
  )
}
