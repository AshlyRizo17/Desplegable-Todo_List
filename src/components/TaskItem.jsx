export default function TaskItem({ task, toggleTask }) {
  return (
    <li
  className={`p-5 rounded-2xl flex justify-between items-center transition shadow-sm border ${
    task.completed
      ? "bg-green-50 border-green-300"
      : "bg-white border-slate-200"
  }`}
>
  <div>
    <p
      className={`font-semibold ${
        task.completed
          ? "text-green-700 line-through"
          : "text-slate-800"
      }`}
    >
      {task.text}
    </p>
    <small className="text-slate-500">
      Autor: {task.author}
    </small>
  </div>

  <button
    onClick={() => toggleTask(task.id)}
    className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
      task.completed
        ? "bg-slate-300 text-slate-700 hover:bg-slate-400"
        : "bg-sky-500 text-white hover:bg-sky-400"
    }`}
  >
    {task.completed ? "Desmarcar" : "Completar"}
  </button>
</li>

  )
}
