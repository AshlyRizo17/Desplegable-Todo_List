# 📝 Team To-Do

Aplicación colaborativa de tareas construida con **React** y **Vite**. Permite a varios usuarios autenticarse y gestionar tareas en equipo, con almacenamiento local o simulación de backend usando JSON Server y una interfaz moderna usando TailwindCSS.

## 🚀 Características

- Autenticación de usuarios (usuarios demo: `User1`/`User1Pass` y `User2`/`User2Pass`)
- Añadir, buscar y marcar tareas como completadas
- Filtrado de tareas por autor o texto
- Persistencia de tareas en `localStorage` o en un backend simulado con JSON Server
- Interfaz responsive y moderna con TailwindCSS
- Notificaciones con `react-toastify`
- Rutas protegidas con React Router
- Consumo de API REST usando `fetch` y `axios`

## 📦 Estructura del proyecto

```
team-to-do/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── PrivateRoute.jsx
│   │   ├── SearchInput.jsx
│   │   ├── TaskForm.jsx
│   │   ├── TaskItem.jsx
│   │   └── TaskList.jsx
│   ├── context/
│   │   └── authContext.jsx
│   ├── pages/
│   │   └── Login.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── db.json
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── README.md
└── vite.config.js
```

## 🛠️ Desarrollo Local

1. **Clona el repositorio:**
   ```sh
   git clone <url-del-repo>
   cd team-to-do
   ```

2. **Instala las dependencias del Frontend:**
   ```sh
   npm install
   ```

3. **Instala las dependencias y ejecuta el Backend:**
   - Navega a la carpeta del backend:
     ```sh
     cd backend
     ```
   - Instala sus dependencias:
     ```sh
     npm install
     ```
   - Inicia el servidor API (se ejecutará en `http://localhost:8000`):
     ```sh
     npm start
     ```

4. **Ejecuta el Frontend:**
   - Vuelve a la carpeta raíz del proyecto.
   - Inicia el servidor de desarrollo de Vite (se ejecutará en `http://localhost:5173`):
   ```sh
   npm run dev
   ```

## ☁️ Despliegue

Esta aplicación está preparada para un despliegue separado del frontend y el backend.

### Backend en Render

1.  Crea un nuevo **Web Service** en Render y conéctalo a tu repositorio de GitHub.
2.  En la configuración:
    -   **Root Directory**: `backend`
    -   **Build Command**: `npm install`
    -   **Start Command**: `npm start`
3.  Despliega el servicio. Render te proporcionará una URL pública para tu API (ej: `https://tu-api.onrender.com`).

### Frontend en Vercel

1.  Crea un nuevo **Project** en Vercel e importa el mismo repositorio de GitHub.
2.  Vercel detectará que es un proyecto Vite.
3.  Ve a la configuración del proyecto y añade una **Variable de Entorno**:
    -   **Name**: `VITE_API_URL`
    -   **Value**: La URL de tu backend desplegado en Render.
4.  Despliega. ¡Tu aplicación estará en línea!

## 👤 Usuarios de prueba

- **Usuario 1:**  
  Usuario: `User1`  
  Contraseña: `User1Pass`

- **Usuario 2:**  
  Usuario: `User2`  
  Contraseña: `User2Pass`

## 🧩 Principales archivos y componentes

- [`src/App.jsx`](src/App.jsx): Componente principal, maneja tareas y autenticación. Consume la API de JSON Server para CRUD de tareas.
- [`src/context/authContext.jsx`](src/context/authContext.jsx): Contexto de autenticación y lógica de login/logout.
- [`src/pages/Login.jsx`](src/pages/Login.jsx): Pantalla de inicio de sesión.
- [`src/components/TaskForm.jsx`](src/components/TaskForm.jsx): Formulario para agregar tareas.
- [`src/components/TaskList.jsx`](src/components/TaskList.jsx): Lista de tareas.
- [`src/components/TaskItem.jsx`](src/components/TaskItem.jsx): Ítem individual de tarea.
- [`src/components/SearchInput.jsx`](src/components/SearchInput.jsx): Barra de búsqueda de tareas.
- [`src/components/PrivateRoute.jsx`](src/components/PrivateRoute.jsx): Ruta protegida para usuarios autenticados.
- [`db.json`](db.json): Archivo de base de datos para JSON Server.

## 🧑‍💻 Tecnologías usadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Router DOM](https://reactrouter.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- [JSON Server](https://github.com/typicode/json-server)
- [Axios](https://axios-http.com/)





Autor: LAURA BURITICA 

¡Contribuciones y sugerencias son bienvenidas!