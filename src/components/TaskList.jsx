import TaskItem from "./TaskItem"

export default function TaskList({ tasks, toggleTask }) {
  if (tasks.length === 0) {
   return (
  <p className="text-slate-500 text-center font-medium mt-8 italic">
    No hay tareas registradas.
  </p>
)

  }

 return (
  <ul className="space-y-4">
    {tasks.map((task) => (
      <li
        key={task.id}
        className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 hover:shadow-md transition"
      >
        <TaskItem task={task} toggleTask={toggleTask} />
      </li>
    ))}
  </ul>
)

}
