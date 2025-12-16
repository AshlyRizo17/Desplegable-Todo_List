   Todo_List_React   Dana y Ashly

##1. README.md (Raíz del Repositorio)#Todo List Fullstack - Ashly & Dana###a.
Descripción del proyecto
Una aplicación integral de gestión de tareas (Todo List) que permite a los usuarios administrar sus pendientes de forma eficiente. El sistema incluye autenticación de usuarios, operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y persistencia de datos en una base de datos en la nube.

###b. Stack Tecnológico* 
*Frontend:** React.js + Vite, TailwindCSS (Estilos), React Router (Navegación).
* **Backend:** Node.js + Express.
* **Despliegue:** Netlify(Front), Railway(Back), backend simulado.

###c. Requisitos Previos* **Node.js** (v18.0.0 o superior)
* **npm**
* **Git**

###d. Ejecución del Frontend (Local)```bash
cd frontend
npm install
npm run dev

```

###e. Ejecución del Backend (Local)```bash
cd backend
npm install
npm run dev

```

###f. Variables de Entorno (.env.example)Crea un archivo `.env` en las carpetas respectivas basándote en lo siguiente:

###g. Links del Proyecto*
**Frontend:**
`https://wonderful-sherbet-83f4c7.netlify.app/`

**Backend:**
`https://backend-production-7043.up.railway.app`
###g. Links del Proyecto*

##2. ARQUITECTURA.md###a. Diagrama de Arquitectura###b. Descripción de Componentes* 
**Frontend (Vercel):** Interfaz de usuario responsiva. Gestiona el estado global de las tareas, el login de usuarios (Ashly/Danna) y las notificaciones con `react-toastify`.
* **Backend (Render):** API REST que procesa la lógica de negocio, valida los tokens de autenticación y gestiona los endpoints de tareas en un backend simuado.
*

###c. Flujo de Operación: "Crear una Tarea"1. **Usuario** escribe el título y hace clic en "Añadir".
2. **Frontend** valida que el título no esté vacío y envía un `POST /tasks` con el token de usuario.
3. **Backend** recibe la petición, verifica identidad y guarda en **DB**.
4. **DB** confirma el guardado.
5. **Frontend** recibe éxito y actualiza la lista visualmente con un toast de confirmación.

###d. Pipeline de CI/CDSe utiliza **GitHub Actions** para:

1. **Linter:** Ejecutar `npm run lint` en cada Pull Request.
2. **Build:** Verificar que el proyecto compile correctamente.
3. **Deploy Automático:** Al hacer merge a `main`, Vercel y Render actualizan las versiones en vivo.

---

##3. API.md (Documentación de API)###Base URL: `https://tu-api.onrender.com/api`| Método | Endpoint | Descripción | Body (JSON) |
| --- | --- | --- | --- |
| **POST** | `/auth/login` | Iniciar sesión | `{"username": "", "password": ""}` |
| **GET** | `/tasks` | Listar tareas del usuario | N/A |
| **POST** | `/tasks` | Crear nueva tarea | `{"title": "...", "description": "..."}` |
| **PUT** | `/tasks/:id` | Editar o completar tarea | `{"completed": true}` |
| **DELETE** | `/tasks/:id` | Eliminar una tarea | N/A |




#Códigos de Estado
200 OK: Operación exitosa.

201 Created: Tarea creada con éxito.

400 Bad Request: Falta el título obligatorio.

401 Unauthorized: Usuario no autenticado.

404 Not Found: La tarea no existe.



Autores: Ashly Rizo y Dana Zarta


Muchas gracias por visualizar nuestro proyecto

