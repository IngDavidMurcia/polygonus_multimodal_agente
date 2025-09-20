"use client"

import { useState, useEffect, useRef } from "react"
import InteractiveTree from "@/components/InteractiveTree"

interface Message {
  sender: "user" | "bot"
  text: string
}

/** Heurística ligera para detectar emoción según palabras */
function detectEmotionFromText(text: string): "Esperanza" | "Alegría" | "Tristeza" | "Resiliencia" | "Miedo" | "Neutral" {
  const t = text.toLowerCase()
  if (/\b(esperanz|esperanza|soñar|sueño|futuro|plant)/.test(t)) return "Esperanza"
  if (/\b(alegr|feliz|risa|sonr|gozo|gozar|content)/.test(t)) return "Alegría"
  if (/\b(triste|dolor|llor|lágrima|perdida|tristeza)/.test(t)) return "Tristeza"
  if (/\b(resilien|firme|resist|sobreviv|renacer|renac)/.test(t)) return "Resiliencia"
  if (/\b(mied|temor|horror|peligro|ataque|talad)/.test(t)) return "Miedo"
  return "Neutral"
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "🍃 Hola, soy el Archivista. Agent RAG,  Pregúntame sobre mis memorias. (aun soy un mock, api en desarrollo)" },
  ])
  const [input, setInput] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const chatEndRef = useRef<HTMLDivElement | null>(null)
  const isFirstRender = useRef(true)

  // emotion actual para el árbol (basado en la última respuesta del bot)
  const [treeEmotion, setTreeEmotion] = useState<ReturnType<typeof detectEmotionFromText>>("Neutral")
  const [treeIntensity, setTreeIntensity] = useState(1)

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg: Message = { sender: "user", text: input }
    setMessages((prev) => [...prev, userMsg])
    setInput("")

    // Simular que el bot "piensa"
    setIsThinking(true)
    setTimeout(() => {
      // respuesta mock (aquí en el futuro llamarás a tu API RAG)
      const botText = `He escuchado tus palabras: "${userMsg.text}".`
      setMessages((prev) => [...prev, { sender: "bot", text: botText }])

      // actualizar emoción del árbol según la respuesta del bot (o según input si prefieres)
      const emo = detectEmotionFromText(botText + " " + userMsg.text)
      setTreeEmotion(emo)
      // intensidad basada en longitud del texto (ejemplo simple)
      setTreeIntensity(Math.min(1.4, Math.max(0.9, userMsg.text.length / 80)))
      setIsThinking(false)
    }, 1000)
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isThinking])

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* Panel izquierdo: Chat */}
      <div className="flex flex-col w-1/2 h-full bg-gradient-to-b from-green-50 to-amber-100 border-r">
        {/* Header */}
        <header className="bg-neutral-900 text-white py-3 px-6 text-center font-bold text-lg shadow">
          🌳 Chat con el Árbol Archivista, con análisis de sentimientos 😄😫😭, En construcción...🚧
        </header>

        {/* Chat body */}
        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex items-end gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              {msg.sender === "bot" && <img src="/icons/bot.ico" alt="Bot Avatar" className="w-8 h-8 rounded-full shadow" />}
              <div className={`px-4 py-2 rounded-2xl shadow max-w-xs ${msg.sender === "user" ? "bg-amber-600 text-white rounded-br-none" : "bg-white text-gray-800 rounded-bl-none"}`}>
                {msg.text}
              </div>
              {msg.sender === "user" && <img src="/icons/user.ico" alt="User Avatar" className="w-8 h-8 rounded-full shadow" />}
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-2 text-gray-500 text-sm animate-pulse">
              <img src="/icons/bot.ico" alt="Bot Avatar" className="w-6 h-6 rounded-full shadow" />
              <span>Archivista está pensando...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </main>

        {/* Input */}
        <footer className="p-3 bg-white border-t flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Escribe tu mensaje..."
            className="flex-1 border rounded-xl px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <button onClick={handleSend} className="px-4 py-2 bg-green-700 text-white rounded-xl hover:bg-green-800">
            Enviar
          </button>
        </footer>
      </div>

      {/* Panel derecho: Visualización del árbol */}
      <div className="w-1/2 h-full flex items-center justify-center bg-green-200 relative">
        {/* Overlay / marco */}
        <div className="absolute inset-4 rounded-2xl overflow-hidden shadow-xl">
          <InteractiveTree emotion={treeEmotion} isThinking={isThinking} intensity={treeIntensity} />
        </div>
      </div>
    </div>
  )
}
