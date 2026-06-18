# Regla de Ingeniería

## Nombre de la regla
Separación estricta entre frontend y backend por contrato HTTP.

## Alcance
Arquitectura, Frontend, Backend, Docker Compose.

## Razón
Mantener fronteras claras evita acoplamiento accidental y permite evolucionar cada servicio sin romper el otro.

## Ejemplo correcto vs incorrecto
**Correcto (este proyecto):**
- El frontend consume `/api/*` y usa proxy en Vite.
- Evidencia: [frontend/vite.config.ts](frontend/vite.config.ts#L11), [frontend/src/App.tsx](frontend/src/App.tsx#L16), [docker-compose.yml](docker-compose.yml#L11).

**Incorrecto (a evitar):**
- Importar módulos Python del backend dentro del frontend o leer archivos de `backend/` desde `frontend/`.
- Hardcodear URL internas del contenedor en múltiples componentes en lugar de centralizar el acceso API.