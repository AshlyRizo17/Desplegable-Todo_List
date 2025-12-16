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
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error("Error al cargar las tareas:", error)
        setError("No se pudieron cargar las tareas. Revisa la conexión con el backend.");
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
    <div className="min-h-screen bg-black p-6 text-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-yellow-400 drop-shadow">
          Todo_List
        </h1>
        <div>
          <span className="mr-4 font-semibold text-yellow-300">
            Hola, {user.username}
          </span>
          <button
            onClick={logout}
            className="bg-yellow-500 text-black font-bold rounded-lg p-3 mt-4 hover:bg-yellow-400 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Mostrar el mensaje de error si existe */}
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      <SearchInput search={search} setSearch={handleSearchChange} />

      {loadingSearch ? (
        <div className="flex flex-col items-center justify-center p-6 mt-6 bg-neutral-900 border border-yellow-600 rounded-2xl shadow-xl">
          <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-2"></div>
          <span className="text-yellow-400 font-bold">Buscando...</span>
        </div>
      ) : (
        <>
          <TaskForm addTask={addTask} />
          <TaskList
            tasks={filteredTasks}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        </>
      )}
    </div>
  )
}