import { useEffect, useState, useCallback, useMemo } from "react"
import { useAuth } from "./context/authContext" // Asume la existencia de este context
import { toast } from "react-toastify" // Asume la instalación de react-toastify
import TaskForm from "./components/TaskForm" // Componente para añadir tareas
import TaskList from "./components/TaskList" // Componente para listar tareas
import SearchInput from "./components/SearchInput" // Componente para el input de búsqueda
import axios from "axios"

// Configuración del cliente Axios
const apiClient = axios.create({
  // Lee la URL del backend desde las variables de entorno de Vite
  baseURL: import.meta.env.VITE_API_URL
});

export default function App() {
  const { user, logout } = useAuth() // Obtiene el usuario autenticado y la función de logout
  const [tasks, setTasks] = useState([])
  const [search, setSearch] = useState("")
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [error, setError] = useState(null);

  /**
   * C.R.U.D. - READ (Leer)
   * Carga las tareas al inicio.
   */
  useEffect(() => {
    const controller = new AbortController();
    const fetchTasks = async () => {
      setError(null);
      try {
        const response = await apiClient.get('/tasks', { signal: controller.signal })
        // Ordena las tareas por ID descendente (las más nuevas primero)
        setTasks(response.data.sort((a, b) => b.id - a.id))
      } catch (error) {
        if (axios.isCancel(error)) return
        // Muestra un error más amigable en la UI
        setError("No se pudieron cargar las tareas. Asegúrate de que el backend esté corriendo.");
        console.error("Error al cargar las tareas:", error)
      }
    }
    fetchTasks()

    // Función de limpieza para abortar la solicitud si el componente se desmonta
    return () => {
      controller.abort();
    }
  }, [])

  /**
   * C.R.U.D. - CREATE (Crear)
   * Añade una nueva tarea. Usa useCallback para optimización.
   */
  const addTask = useCallback(async (text) => {
    const newTask = {
      author: user.username,
      text,
      completed: false,
    }
    try {
      const response = await apiClient.post('/tasks', newTask)
      // Actualización optimista: añade la tarea al estado local
      setTasks(prevTasks => [response.data, ...prevTasks])
      toast.success("¡Tarea añadida con éxito!");
    } catch (error) {
      console.error("Error al añadir la tarea:", error)
      toast.error("No se pudo añadir la tarea.");
    }
  }, [user.username]);

  /**
   * C.R.U.D. - UPDATE (Actualizar - Toggle)
   * Cambia el estado 'completed' de una tarea. Usa useCallback para optimización.
   */
  const toggleTask = useCallback(async (id) => {
    const taskToToggle = tasks.find(t => t.id === id);
    if (!taskToToggle) return;

    // Crea el objeto actualizado antes de la solicitud
    const updatedTask = { ...taskToToggle, completed: !taskToToggle.completed };

    try {
      // Petición PUT para actualizar en el backend
      await apiClient.put(`/tasks/${id}`, updatedTask);
      // Actualiza el estado local solo si la petición fue exitosa
      setTasks(prevTasks => prevTasks.map(t => (t.id === id ? updatedTask : t)));
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      toast.error("No se pudo actualizar la tarea.");
    }
  }, [tasks]); // Depende de 'tasks' para encontrar la tarea a actualizar

  /**
   * C.R.U.D. - DELETE (Eliminar)
   * Elimina una tarea. Usa actualización optimista y useCallback.
   */
  const deleteTask = useCallback(async (id) => {
    // 1. Guardamos el estado original para restaurar si falla
    const originalTasks = [...tasks];
    // 2. Actualización optimista: eliminamos la tarea de la UI inmediatamente
    setTasks(prevTasks => prevTasks.filter((t) => t.id !== id));

    try {
      // 3. Petición DELETE
      await apiClient.delete(`/tasks/${id}`);
      toast.success("Tarea eliminada.");
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      toast.error("No se pudo eliminar la tarea.");
      // 4. Si hay un error, restauramos el estado original (rollback)
      setTasks(originalTasks);
    }
  }, [tasks]); // Depende de 'tasks' para el rollback

  // Lógica de Debouncing para la búsqueda (simula un retraso)
  useEffect(() => {
    setLoadingSearch(true);
    const timerId = setTimeout(() => {
      setLoadingSearch(false);
    }, 500); // Espera 500ms

    return () => {
      clearTimeout(timerId);
    };
  }, [search]);

  // Manejador de cambio de búsqueda. Usa useCallback para optimización.
  const handleSearchChange = useCallback((value) => {
    setSearch(value);
  }, []);

  /**
   * Filtrado de tareas. Usa useMemo para evitar recálculos innecesarios.
   */
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
  }, [tasks, search]); // Se recalcula solo si 'tasks' o 'search' cambian

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 p-6 text-slate-800">
      
      {/* Contenedor principal angosto */}
      <div className="max-w-3xl mx-auto">

        {/* Header */}
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

        {/* Mensaje de Error (si existe) */}
        {error && (
          <div className="mb-6 bg-rose-100 border border-rose-300 text-rose-700 p-4 rounded-xl">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Search Input */}
        <div className="mb-6 bg-white p-5 rounded-2xl shadow-sm">
          <SearchInput search={search} setSearch={handleSearchChange} />
        </div>

        {/* Lógica de carga para la búsqueda */}
        {loadingSearch ? (
          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-md">
            <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            <span className="text-sky-600 font-semibold">
              Buscando...
            </span>
          </div>
        ) : (
          <>
            {/* Task Form (CREATE) */}
            <div className="mb-6 bg-white p-6 rounded-2xl shadow-sm">
              <TaskForm addTask={addTask} />
            </div>

            {/* Task List (READ, UPDATE, DELETE) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <TaskList
                tasks={filteredTasks} // Pasa las tareas filtradas
                toggleTask={toggleTask} // Función UPDATE
                deleteTask={deleteTask} // Función DELETE
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}