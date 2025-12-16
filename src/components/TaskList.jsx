import TaskItem from "./TaskItem"

export default function TaskList({ tasks, toggleTask }) {
  if (tasks.length === 0) {
    return (
      <p className="text-yellow-400 text-center font-semibold mt-6">
        No hay tareas registradas.
      </p>
    )
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} toggleTask={toggleTask} />
      ))}
    </ul>
  )
}
