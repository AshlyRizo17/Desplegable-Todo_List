import { useEffect, useState, useCallback, useMemo } from "react"
import { useAuth } from "./context/authContext"
import { toast } from "react-toastify"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import SearchInput from "./components/SearchInput"
import axios from "axios"

const apiClient = axios.create({
  // Leemos la URL del backend desde las variables de entorno de Vite
  baseURL: import.meta.env.VITE_API_URL
});

export default function App() {
  const { user, logout } = useAuth()
  const [tasks, setTasks] = useState([])
  const [search, setSearch] = useState("")
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchTasks = async () => {
      setError(null);
      try {
        const response = await apiClient.get('/tasks', { signal: controller.signal })
        // Ordenamos las tareas por fecha de creación para que las más nuevas aparezcan primero
        setTasks(response.data.sort((a, b) => b.id - a.id))
      }catch (error) {
  if (axios.isCancel(error)) return
  console.error("Error al cargar las tareas:", error)
}

    }
    fetchTasks()

    return () => {
      controller.abort();
    }
  }, [])

  const addTask = useCallback(async (text) => {
    const newTask = {
      author: user.username,
      text,
      completed: false,
    }
    try {
      const response = await apiClient.post('/tasks', newTask)
      setTasks(prevTasks => [response.data, ...prevTasks])
      toast.success("¡Tarea añadida con éxito!");
    } catch (error) {
      console.error("Error al añadir la tarea:", error)
      toast.error("No se pudo añadir la tarea.");
    }
  }, [user.username]);

  const toggleTask = useCallback(async (id) => {
    const taskToToggle = tasks.find(t => t.id === id);
    if (!taskToToggle) return;

    const updatedTask = { ...taskToToggle, completed: !taskToToggle.completed };

    try {
      await apiClient.put(`/tasks/${id}`, updatedTask);
      setTasks(prevTasks => prevTasks.map(t => (t.id === id ? updatedTask : t)));
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      toast.error("No se pudo actualizar la tarea.");
    }
  }, [tasks]);

  const deleteTask = useCallback(async (id) => {
    // Guardamos la tarea por si necesitamos restaurarla
    const originalTasks = [...tasks];
    // Actualización optimista: eliminamos la tarea de la UI inmediatamente
    setTasks(prevTasks => prevTasks.filter((t) => t.id !== id));

    try {
      await apiClient.delete(`/tasks/${id}`);
      toast.success("Tarea eliminada.");
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      toast.error("No se pudo eliminar la tarea.");
      // Si hay un error, restauramos el estado original
      setTasks(originalTasks);
    }
  }, [tasks]);

  // Debounce para la búsqueda
  useEffect(() => {
    setLoadingSearch(true);
    const timerId = setTimeout(() => {
      setLoadingSearch(false);
    }, 500); // Espera 500ms después de que el usuario deja de escribir

    return () => {
      clearTimeout(timerId);
    };
  }, [search]);

  const handleSearchChange = useCallback((value) => {
    setSearch(value);
  }, []);

  const filteredTasks = useMemo(() => {
    if (!search) {
      return tasks;
    }
    const lowercasedSearch = search.toLowerCase();
    return tasks.filter(
      (t) =>
        t.text.toLowerCase().includes(lowercasedSearch) ||
        t.author.toLowerCase().includes(lowercasedSearch)
    );
  }, [tasks, search]);

 return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 p-6 text-slate-800">
    <div className="flex justify-between items-center mb-8 bg-white px-8 py-6 rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-sky-600">
        Todo_List
      </h1>

      <div className="flex items-center gap-4">
        <span className="font-medium text-slate-600">
          Hola, <strong>{user.username}</strong>
        </span>
        <button
          onClick={logout}
          className="bg-sky-500 text-white font-semibold px-5 py-2 rounded-lg hover:bg-sky-400 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </div>

    {/* Error */}
    {error && (
      <div className="mb-6 bg-rose-100 border border-rose-300 text-rose-700 p-4 rounded-xl">
        <strong>Error:</strong> {error}
      </div>
    )}

    <div className="mb-6 bg-white p-5 rounded-2xl shadow-sm">
      <SearchInput search={search} setSearch={handleSearchChange} />
    </div>

    {loadingSearch ? (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-md">
        <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mb-3"></div>
        <span className="text-sky-600 font-semibold">
          Buscando...
        </span>
      </div>
    ) : (
      <>
        <div className="mb-6 bg-white p-6 rounded-2xl shadow-sm">
          <TaskForm addTask={addTask} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <TaskList
            tasks={filteredTasks}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        </div>
      </>
    )}
  </div>
)
}
