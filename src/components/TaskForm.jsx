import { useState } from "react"

export default function TaskForm({ addTask }) {
  const [text, setText] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim() === "") return
    addTask(text)
    setText("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex mb-6 bg-neutral-900 border border-yellow-600 rounded-xl overflow-hidden shadow-xl"
    >
      <input
        type="text"
        placeholder="Escribe una tarea..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-grow p-3 bg-neutral-800 text-gray-100 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      <button
        type="submit"
        className="bg-yellow-500 text-black font-bold px-6 hover:bg-yellow-400 transition-colors"
      >
        Agregar
      </button>
    </form>
  )
}
