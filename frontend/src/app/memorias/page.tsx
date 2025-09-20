import MemoryCard from "@/components/MemoryCard"
import memorias from "@/src/data/memorias.json"

export default function MemoriasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-green-100 py-12 px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-green-900 text-center">
        🌳 Memorias del Árbol
      </h1>
      <p className="text-center text-gray-700 mt-4 max-w-2xl mx-auto">
        Explora los recuerdos del árbol a través de fragmentos narrados y acompañados de imágenes.
      </p>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {memorias.map((m, idx) => (
          <MemoryCard key={idx} {...m} />
        ))}
      </div>
    </div>
  )
}

