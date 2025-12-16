# Todo_List_React  
Dana y Ashly

## 1. README.md (Raíz del Repositorio)

# Todo List Fullstack - Ashly & Dana

### a. Descripción del proyecto
Una aplicación integral de gestión de tareas (Todo List) que permite a los usuarios administrar sus pendientes de forma eficiente. El sistema incluye autenticación de usuarios, operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y persistencia de datos en una base de datos en la nube.

### b. Stack Tecnológico
* **Frontend:** React.js + Vite, TailwindCSS (Estilos), React Router (Navegación).
* **Backend:** Node.js + Express.
* **Despliegue:** Netlify(Front), Railway(Back), backend simulado.

### c. Requisitos Previos
* **Node.js** (v18.0.0 o superior)
* **npm**
* **Git**

### d. Ejecución del Frontend (Local)
```bash
cd frontend
npm install
npm run dev

### e. Estructura
team-to-do/
├── public/              # Archivos estáticos
├── src/                 # Código fuente de la aplicación
│   ├── components/      # Componentes reutilizables de React
│   │   ├── PrivateRoute.jsx
│   │   ├── SearchInput.jsx
│   │   ├── TaskForm.jsx
│   │   ├── TaskItem.jsx
│   │   └── TaskList.jsx
│   ├── context/         # Contexto de React (ej. para autenticación)
│   │   └── authContext.jsx
│   ├── pages/           # Componentes que representan páginas completas
│   │   └── Login.jsx
│   ├── App.jsx          # Componente raíz de la aplicación
│   └── main.jsx         # Punto de entrada de la aplicación
├── .env                 # Variables de entorno (local, no versionado)
├── .env.example         # Ejemplo de variables de entorno
├── db.json              # Base de datos para JSON Server
├── package.json         # Dependencias y scripts del proyecto
└── README.md            # Documentación del proyecto

f. Variables de Entorno (.env.example)

Crea un archivo .env en las carpetas respectivas basándote en lo siguiente:

g. Links del Proyecto

Frontend:
https://wonderful-sherbet-83f4c7.netlify.app/

Backend:
https://backend-production-7043.up.railway.app

2. ARQUITECTURA.md
a. Diagrama de Arquitectura
b. Descripción de Componentes

Frontend (Vercel): Interfaz de usuario responsiva. Gestiona el estado global de las tareas, el login de usuarios (Ashly/Danna) y las notificaciones con react-toastify.

Backend (Render): API REST que procesa la lógica de negocio, valida los tokens de autenticación y gestiona los endpoints de tareas en un backend simuado.

c. Flujo de Operación: "Crear una Tarea"

Usuario escribe el título y hace clic en "Añadir".

Frontend valida que el título no esté vacío y envía un POST /tasks con el token de usuario.

Backend recibe la petición, verifica identidad y guarda en DB.

DB confirma el guardado.

Frontend recibe éxito y actualiza la lista visualmente con un toast de confirmación.

d. Pipeline de CI/CD

Se utiliza GitHub Actions para:

Linter: Ejecutar npm run lint en cada Pull Request.

Build: Verificar que el proyecto compile correctamente.

Deploy Automático: Al hacer merge a main, Vercel y Render actualizan las versiones en vivo.

3. API.md (Documentación de API)
Base URL

https://tu-api.onrender.com/api

Método	Endpoint	Descripción	Body (JSON)
POST	/auth/login	Iniciar sesión	{"username": "", "password": ""}
GET	/tasks	Listar tareas del usuario	N/A
POST	/tasks	Crear nueva tarea	{"title": "...", "description": "..."}
PUT	/tasks/:id	Editar o completar tarea	{"completed": true}
DELETE	/tasks/:id	Eliminar una tarea	N/A
Códigos de Estado

200 OK: Operación exitosa.
201 Created: Tarea creada con éxito.
400 Bad Request: Falta el título obligatorio.
401 Unauthorized: Usuario no autenticado.
404 Not Found: La tarea no existe.



Autores: Ashly Rizo y Dana Zarta


Muchas gracias por visualizar nuestro proyecto
