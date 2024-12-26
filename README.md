## README: Proyecto Node.js/Express + React

### Introducción
Este repositorio alberga un proyecto full-stack que combina la potencia de Node.js/Express en el backend con la versatilidad de React en el frontend. Esta estructura permite una clara separación de responsabilidades y facilita el desarrollo y mantenimiento de aplicaciones web modernas.

### Estructura del Proyecto
```
taskManager/
├── task-api/
│   ├── package.json
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.js
|   |   ├── .env
|   |   └── ...
│   └── ...
├── task-app/
│   ├── package.json
│   ├── public/
│   ├── src/
│   │   ├── App.js
|   |   ├── .env
│   │   └── ...
│   └── ...
└── ...
```

* **task-api:** Contiene la lógica del servidor, incluyendo rutas, controladores y modelos de datos.
* **task-app:** Alberga la interfaz de usuario construida con React, gestionando la interacción con el usuario y las solicitudes al backend.
* **package.json:** Archivo raíz que define las dependencias y scripts para ambos proyectos.

### Configuración y Ejecución
#### Requisitos previos
* Node.js (20.12.1)
* MongoDB
* NPM

#### Clonar el repositorio
```bash
git clone [https://github.com/DavidHernandezL/taskManager.git](https://github.com/DavidHernandezL/taskManager.git)
```

#### Configuración backend
Instalar dependencias
```
cd task-api
npm install
```
Configurar variables de entorno
```
MONGO_URI=mongodb://localhost:27017/task-manager
SERVER_PORT=3000
SECRET='una cadena de caracteres'
FRONTEND_URL=http://localhost:5173
```
Ejecutar los proyectos en desarrollo
```
npm run dev
```

#### Configuración frontend
Instalar dependencias
```
cd task-app
npm install
```

Configurar variables de entorno
```
VITE_API_URL=http://localhost:3000/api
```
Ejecutar los proyectos en desarrollo
```
npm run dev
```

Nota: Asegúrate de que los puertos de los servidores de desarrollo no entren en conflicto.
Construir para producción
