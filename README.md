
# Cine API

API REST Express para administración de películas favoritas de empleados de IPLACEX.

## Información académica

- **Asignatura:** Programación Web Services
- **Institución:** IPLACEX
- **Evaluación:** Examen Final
- **Proyecto:** API REST con Express - Unidad III

## Descripción del proyecto

Este proyecto consiste en el desarrollo de una API REST utilizando Node.js, Express y MongoDB Atlas, que permite administrar información de películas y actores.

La aplicación proporciona servicios para registrar, consultar, actualizar y eliminar películas, además de registrar y consultar actores asociados a las películas existentes.

La información se almacena en MongoDB Atlas, utilizando la base de datos `cine-db` y las colecciones `peliculas` y `actores`.

## Tecnologías utilizadas

- JavaScript (ES Modules)
- Node.js
- Express
- MongoDB Atlas
- MongoDB Driver
- CORS
- dotenv
- Postman para pruebas de los servicios REST
- Git y GitHub para control de versiones
- Render para despliegue de la aplicación

## Estructura del proyecto

```text
cine-api/
├── src/
│   ├── common/
│   │   └── db.js
│   ├── pelicula/
│   │   ├── pelicula.js
│   │   ├── controller.js
│   │   └── routes.js
│   └── actor/
│       ├── actor.js
│       ├── controller.js
│       └── routes.js
├── .env
├── .gitignore
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

**Nota:** El archivo `.env` se utiliza únicamente para configurar las variables de entorno y no debe publicarse en GitHub.

## Instalación y ejecución local

### 1. Instalar las dependencias

Ejecutar el siguiente comando desde la carpeta principal del proyecto:

```bash
npm install
```

### 2. Configurar MongoDB Atlas

Crear un archivo `.env` en la raíz del proyecto y configurar la variable de entorno:

```env
MONGODB_URI=mongodb+srv://USUARIO:CONTRASEÑA@CLUSTER.mongodb.net/
```

Reemplazar los valores de ejemplo por las credenciales y la dirección correspondientes al clúster de MongoDB Atlas.

La conexión se administra desde `src/common/db.js`, utilizando la variable `process.env.MONGODB_URI`.

### 3. Iniciar el servidor

Ejecutar:

```bash
npm start
```

La API estará disponible localmente en:

```text
http://localhost:3000
```

## Endpoints de películas

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/pelicula` | Registrar una película |
| GET | `/api/peliculas` | Listar todas las películas |
| GET | `/api/pelicula/:id` | Consultar una película por ID |
| PUT | `/api/pelicula/:id` | Actualizar una película |
| DELETE | `/api/pelicula/:id` | Eliminar una película |

## Endpoints de actores

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/actor` | Registrar un actor |
| GET | `/api/actores` | Listar todos los actores |
| GET | `/api/actor/:id` | Consultar un actor por ID |
| GET | `/api/actores/pelicula/:pelicula` | Consultar actores asociados a una película |

## Ejemplo de registro de película

**Método:** POST

**Ruta:** `/api/pelicula`

**Cuerpo de la solicitud (JSON):**

```json
{
  "nombre": "Titanic",
  "generos": ["Drama", "Romance"],
  "anioEstreno": 1997
}
```

## Ejemplo de registro de actor

**Método:** POST

**Ruta:** `/api/actor`

**Cuerpo de la solicitud (JSON):**

```json
{
  "idPelicula": "Titanic",
  "nombre": "Leonardo DiCaprio",
  "edad": 52,
  "estaRetirado": false,
  "premios": ["Oscar", "Globo de Oro", "BAFTA"]
}
```

Al registrar un actor, la aplicación verifica que la película exista y almacena su identificador en `idPelicula`.

## Pruebas de los servicios REST

Los servicios fueron probados utilizando Postman, verificando las siguientes operaciones:

- Registro de películas.
- Consulta del listado de películas.
- Consulta de películas por identificador.
- Actualización de películas.
- Eliminación de películas.
- Registro de actores.
- Consulta del listado de actores.
- Consulta de actores por identificador.
- Consulta de actores asociados a una película.

Las pruebas permitieron comprobar el funcionamiento de los nueve endpoints implementados y su comunicación con MongoDB Atlas.

## Despliegue en Render

La aplicación está preparada para su despliegue como servicio web en Render, utilizando un repositorio público de GitHub.

**Configuración prevista para el despliegue:**

- **Servicio:** Web Service
- **Repositorio:** `iplacex-cine-api-carlos_jordan`
- **Rama:** `main`
- **Región:** Frankfurt (EU Central)
- **Entorno:** Node.js
- **Build Command:** `npm install`
- **Start Command:** `node server.js`
- **Plan:** Free

La cadena de conexión a MongoDB Atlas debe configurarse en Render mediante la variable de entorno `MONGODB_URI`.

También es necesario autorizar las direcciones IP correspondientes en MongoDB Atlas para permitir la conexión desde Render.

## Repositorio GitHub

Código fuente del proyecto:

https://github.com/jarispe/iplacex-cine-api-carlos_jordan

## Licencia

Este proyecto utiliza la licencia Apache-2.0.
