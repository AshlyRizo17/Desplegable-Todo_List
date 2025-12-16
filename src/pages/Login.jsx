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
    <div className="min-h-screen flex items-center justify-center bg-black">
      {loading ? (
        <div className="flex flex-col items-center justify-center w-full max-w-sm p-8 rounded-2xl shadow-2xl bg-neutral-900 border border-yellow-600">
          <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <span className="text-yellow-400 font-bold">Cargando...</span>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-full max-w-sm p-8 rounded-2xl shadow-2xl bg-neutral-900 border border-yellow-600"
        >
          <h2 className="text-3xl font-extrabold text-center text-yellow-400 mb-4 drop-shadow">
            Iniciar Sesión
          </h2>

          <label className="font-semibold text-yellow-500" htmlFor=" Nombre o Usuario:">
            Nombre o Usuario:
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border-2 border-yellow-500 rounded-lg bg-neutral-800 text-gray-100 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            type="text"
            id="username"
            placeholder="Ingresa tu usuario"
          />

          <label className="font-semibold text-yellow-500" htmlFor="Contraseña">
            Contraseña:
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border-2 border-yellow-500 rounded-lg bg-neutral-800 text-gray-100 placeholder-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            type="password"
            id="password"
            placeholder="••••••••"
          />

          <button
            className="bg-yellow-500 text-black font-bold rounded-lg p-3 mt-4 hover:bg-yellow-400 transition-colors"
            type="submit"
          >
            Iniciar
          </button>
        </form>
      )}
    </div>
  )
}