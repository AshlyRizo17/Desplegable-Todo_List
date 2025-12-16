import { useState } from "react"
import { useAuth } from "../context/authContext.jsx"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      login(username, password)
      setLoading(false)
    }, 1000)
  } 

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
    {loading ? (
      <div className="flex flex-col items-center justify-center w-full max-w-sm p-10 rounded-xl bg-white shadow-lg">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <span className="text-blue-600 font-semibold">Cargando...</span>
      </div>
    ) : (
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-10 bg-white rounded-xl shadow-xl flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600">
          Bienvenido
        </h2>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">
            Usuario
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="text"
            placeholder="Ingresa tu usuario"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600">
            Contraseña
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="password"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-indigo-600 text-white font-semibold py-3 rounded-md hover:bg-indigo-500 transition"
        >
          Entrar
        </button>
      </form>
    )}
  </div>
)
}
