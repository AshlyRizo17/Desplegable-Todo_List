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
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md mb-6 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
      >
        <input
          type="text"
          placeholder="Escribe una tarea..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-grow p-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        <button
          type="submit"
          className="bg-sky-500 text-white font-semibold px-6 hover:bg-sky-400 transition"
        >
          Agregar
        </button>
      </form>
    </div>
  )
}
