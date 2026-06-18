# Tech Stack

## Frontend

1. Framework y lenguaje
- React 19 + TypeScript + Vite.
- Evidencia: [frontend/package.json](frontend/package.json#L19), [frontend/package.json](frontend/package.json#L39), [frontend/package.json](frontend/package.json#L41).

2. Visualización y UI
- Recharts para gráficos.
- Tailwind CSS v4 vía plugin de Vite.
- Lucide React para iconos.
- Utilidades de clases: clsx, tailwind-merge, class-variance-authority.
- Evidencia: [frontend/package.json](frontend/package.json#L16), [frontend/package.json](frontend/package.json#L18), [frontend/package.json](frontend/package.json#L21), [frontend/vite.config.ts](frontend/vite.config.ts#L3).

3. Calidad y testing frontend
- ESLint con @eslint/js, typescript-eslint, react-hooks, react-refresh.
- Vitest + @vitest/coverage-v8.
- Scripts: dev, build, lint, test, test:watch, test:coverage.
- Evidencia: [frontend/package.json](frontend/package.json#L6), [frontend/package.json](frontend/package.json#L25), [frontend/package.json](frontend/package.json#L31).

4. Configuración de red local
- Proxy de Vite para /api hacia http://backend:8000.
- Evidencia: [frontend/vite.config.ts](frontend/vite.config.ts#L11), [frontend/vite.config.ts](frontend/vite.config.ts#L13).

## Backend

1. Framework y lenguaje
- Python con FastAPI.
- Uvicorn standard como servidor ASGI.
- Evidencia: [backend/requirements.txt](backend/requirements.txt#L1), [backend/requirements.txt](backend/requirements.txt#L2).

2. Modelado y validación
- Pydantic BaseModel para contratos de respuesta.
- Evidencia: [backend/app/routes.py](backend/app/routes.py#L9), [backend/app/routes.py](backend/app/routes.py#L22).

3. Desarrollo y testing backend
- debugpy para depuración remota.
- pytest, pytest-cov, httpx.
- Evidencia: [backend/requirements.txt](backend/requirements.txt#L3), [backend/requirements.txt](backend/requirements.txt#L4), [backend/requirements.txt](backend/requirements.txt#L6).

## Infraestructura y ejecución

1. Orquestación
- Docker Compose con 2 servicios: frontend y backend.
- Dependencia frontend -> backend.
- Puertos publicados: 5173, 8000, 5678.
- Evidencia: [docker-compose.yml](docker-compose.yml#L1), [docker-compose.yml](docker-compose.yml#L11), [docker-compose.yml](docker-compose.yml#L19).

2. Imagen de backend
- Base: python:3.13-slim.
- Instala requirements y ejecuta FastAPI con debugpy + uvicorn --reload.
- Evidencia: [backend/Dockerfile](backend/Dockerfile#L1), [backend/Dockerfile](backend/Dockerfile#L6), [backend/Dockerfile](backend/Dockerfile#L12).

3. Imagen de frontend
- Base: node:24-alpine.
- Instala dependencias con npm install y ejecuta vite dev server.
- Evidencia: [frontend/Dockerfile](frontend/Dockerfile#L1), [frontend/Dockerfile](frontend/Dockerfile#L6), [frontend/Dockerfile](frontend/Dockerfile#L12).

## Dependencias clave observadas

Frontend dependencies
- react, react-dom, recharts, lucide-react, clsx, tailwind-merge, class-variance-authority.
- Evidencia: [frontend/package.json](frontend/package.json#L15).

Frontend devDependencies
- vite, @vitejs/plugin-react, typescript, vitest, @vitest/coverage-v8, eslint, typescript-eslint, tailwindcss, @tailwindcss/vite.
- Evidencia: [frontend/package.json](frontend/package.json#L24).

Backend requirements
- fastapi, uvicorn[standard], debugpy, pytest, pytest-cov, httpx.
- Evidencia: [backend/requirements.txt](backend/requirements.txt#L1).