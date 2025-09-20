const fs = require("fs")
const path = require("path")

// Paths
const inputFile = path.join(__dirname, "../src/data/memorias_raw.md")
const outputFile = path.join(__dirname, "../src/data/memorias.json")

// Leer archivo
const rawData = fs.readFileSync(inputFile, "utf-8")

// Separar en bloques por doble salto de línea
const bloques = rawData.trim().split(/\n\s*\n/)

const memorias = bloques.map((bloque) => {
  const lineas = bloque.split("\n")
  const memoria = {}

  lineas.forEach((linea) => {
    if (linea.startsWith("[Título]")) memoria.title = linea.replace("[Título]", "").trim()
    if (linea.startsWith("[Texto]")) memoria.text = linea.replace("[Texto]", "").trim()
    if (linea.startsWith("[Imagen]")) memoria.image = linea.replace("[Imagen]", "").trim()
    if (linea.startsWith("[Audio]")) memoria.audio = linea.replace("[Audio]", "").trim()
    if (linea.startsWith("[Fecha]")) memoria.date = linea.replace("[Fecha]", "").trim()
    if (linea.startsWith("[Ubicación]")) memoria.location = linea.replace("[Ubicación]", "").trim()
    if (linea.startsWith("[Emoción]")) memoria.emotion = linea.replace("[Emoción]", "").trim()
  })

  return memoria
})

// Guardar JSON
fs.writeFileSync(outputFile, JSON.stringify(memorias, null, 2), "utf-8")

console.log(`✅ Archivo generado con ${memorias.length} memorias: ${outputFile}`)
