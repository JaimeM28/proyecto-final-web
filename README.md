# Tu Oficio API

Backend de autenticación para la plataforma **Tu Oficio**, desarrollado con NestJS, PostgreSQL, Docker y Swagger.

---

# Requisitos

Antes de iniciar, asegúrate de tener instalado:

- Docker
- Docker Compose
- Git

---

# Clonar el proyecto

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```

---

# Configurar variables de entorno

Copia el archivo `.env-template` y renómbralo como `.env`:

```bash
cp .env-template .env
```

---

# Levantar el proyecto con Docker

```bash
docker compose up --build
```

Si quieres correrlo en segundo plano:

```bash
docker compose up -d --build
```

---

# Ver logs

```bash
docker compose logs -f api
```

---

# Detener contenedores

```bash
docker compose down
```

---

# Reiniciar completamente

```bash
docker compose down
docker compose up --build
```

---

# Documentación de la API

Una vez levantado el proyecto, abre:

```txt
http://localhost:3000/api
http://localhost:5173
```

Ahí podrás visualizar y probar todos los endpoints desde Swagger.

---
