import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  // 1. Intentamos leer el usuario del localStorage al iniciar.
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || null;
  });
  const navigate = useNavigate()

  const login = (username, password) => {
    // Aquí iría la lógica real de autenticación
    if ((username === 'Danna1' && password === 'Danna2007') ||
       (username === 'Ashly1' && password === 'Ashly2007')
    ) {
      const userData = { username };
      // 2. Guardamos el usuario en localStorage y en el estado.
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      toast.success('Inicio de sesión exitoso')
      navigate('/tareas')
    } else {
      toast.error('Credenciales incorrectas')
    }
  };
  const logout = () => {
    // 3. Limpiamos el localStorage al cerrar sesión.
    localStorage.removeItem('user');
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}