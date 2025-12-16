export default function TaskItem({ task, toggleTask }) {
  return (
    <li
      className={`p-4 border rounded-xl flex justify-between items-center shadow-md transition ${
        task.completed
          ? "bg-yellow-950 border-yellow-600 text-white-300 line-through"
          : "bg-neutral-900 border-yellow-600 text-gray-100"
      }`}
    >
      <div>
        <p className="font-bold">{task.text}</p>
        <small className="text-yellow-400">Autor: {task.author}</small>
      </div>
      <button
        onClick={() => toggleTask(task.id)}
        className={`text-sm px-3 py-1 rounded-lg font-semibold ${
          task.completed
            ? "bg-yellow-500 text-black font-bold rounded-lg p-3 mt-4 hover:bg-yellow-400 transition-colors"
            : "bg-yellow-500 text-black font-bold rounded-lg p-3 mt-4 hover:bg-yellow-400 transition-colors"
        }`}
      >
        {task.completed ? "Desmarcar" : "Completar"}
      </button>
    </li>
  )
}
