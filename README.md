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



```

---

## g. Links del Proyecto

### 🌐 Frontend

👉 [https://wonderful-sherbet-83f4c7.netlify.app/](https://wonderful-sherbet-83f4c7.netlify.app/)

### 🔗 Backend

👉 [https://backend-production-7043.up.railway.app](https://backend-production-7043.up.railway.app)

---
### Backend (.env)

```env
PORT=3000
JWT_SECRET=your_jwt_secret
```

## f. Variables de Entorno (.env.example)

Crea un archivo **.env** en las carpetas correspondientes (**frontend** y **backend**) basándote en el siguiente ejemplo:

### Frontend (.env)

```env
VITE_API_URL=https://backend-production-7043.up.railway.app
```
# 🏗️ ARQUITECTURA

## a. Diagrama de Arquitectura

```
[ Usuario ]
     │
     ▼
[ Frontend (React / Netlify) ]
     │  HTTP + JWT
     ▼
[ Backend (Node.js / Railway) ]
     │
     ▼
[ Base de Datos Simulada ]
```

---

## b. Descripción de Componentes

### Frontend (Vercel)

* Interfaz de usuario responsiva
* Gestión del estado global de tareas
* Autenticación de usuarios (Ashly / Danna)
* Notificaciones con **react-toastify**

### Backend (Render)

* API REST
* Lógica de negocio
* Validación de tokens JWT
* Endpoints para gestión de tareas
* Backend simulado (sin DB real)

---

## c. Flujo de Operación: "Crear una Tarea"

1. El usuario escribe el título y hace clic en **"Añadir"**
2. El frontend valida que el título no esté vacío
3. Se envía un **POST /tasks** con el token del usuario
4. El backend valida la identidad
5. La tarea se guarda en la base de datos simulada
6. El backend responde con éxito
7. El frontend actualiza la lista y muestra un toast de confirmación

---

## d. Pipeline de CI/CD

Se utiliza **GitHub Actions** para automatizar:

* 🔍 **Linter**: `npm run lint` en cada Pull Request
* 🏗️ **Build**: Verificación de compilación del proyecto
* 🚀 **Deploy Automático**:

  * Merge a `main`
  * Despliegue automático en **Vercel** (frontend)
  * Despliegue automático en **Render** (backend)

---

# 📡 API Documentation

## Base URL

```
https://tu-api.onrender.com/api
```

---

## Endpoints

| Método | Endpoint    | Descripción               | Body (JSON)                                |
| ------ | ----------- | ------------------------- | ------------------------------------------ |
| POST   | /auth/login | Iniciar sesión            | `{ "username": "", "password": "" }`       |
| GET    | /tasks      | Listar tareas del usuario | N/A                                        |
| POST   | /tasks      | Crear nueva tarea         | `{ "title": "...", "description": "..." }` |
| PUT    | /tasks/:id  | Editar o completar tarea  | `{ "completed": true }`                    |
| DELETE | /tasks/:id  | Eliminar una tarea        | N/A                                        |

---

## Códigos de Estado

* **200 OK** → Operación exitosa
* **201 Created** → Tarea creada con éxito
* **400 Bad Request** → Falta el título obligatorio
* **401 Unauthorized** → Usuario no autenticado
* **404 Not Found** → La tarea no existe

---

📌 *Proyecto académico – Sistema Todo List con arquitectura moderna y despliegue continuo*



Autores: Ashly Rizo y Dana Zarta


Muchas gracias por visualizar nuestro proyecto
