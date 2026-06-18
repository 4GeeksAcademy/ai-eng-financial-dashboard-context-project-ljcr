# Regla de Ingeniería

## Nombre de la regla
Build reproducible y runtime estable por defecto.

## Alcance
Developer Experience, Docker, CI/CD.

## Razón
Evita diferencias entre entornos y reduce fallos por dependencias flotantes o arranques en modo desarrollo en producción.

## Ejemplo correcto vs incorrecto
**Correcto (objetivo del proyecto):**
- Versionar dependencias críticas en backend.
- Usar `npm ci` en imágenes de build cuando exista lockfile.
- Separar comando de desarrollo y producción (sin `--reload` ni `debugpy` por defecto).

**Incorrecto (estado actual a corregir):**
- Dependencias Python sin pinning.
- `npm install` en Dockerfile.
- Backend arrancando con `debugpy` y `--reload` como comando base.
- Evidencia: [backend/requirements.txt](backend/requirements.txt#L1), [frontend/Dockerfile](frontend/Dockerfile#L6), [backend/Dockerfile](backend/Dockerfile#L12).