# Regla de Ingeniería

## Nombre de la regla
No mezclar rutas HTTP, modelos, generación de datos y analítica en un solo archivo.

## Alcance
Arquitectura backend.

## Razón
Reducir archivos monolíticos mejora mantenibilidad, legibilidad y capacidad de prueba unitaria.

## Ejemplo correcto vs incorrecto
**Correcto (objetivo del proyecto):**
- Separar en módulos: `schemas.py`, `services/metrics_service.py`, `routers/metrics.py`.
- Mantener `main.py` como bootstrap liviano.

**Incorrecto (estado actual a corregir):**
- Concentrar múltiples responsabilidades en `routes.py`.
- Evidencia: [backend/app/routes.py](backend/app/routes.py#L22), [backend/app/routes.py](backend/app/routes.py#L94), [backend/app/routes.py](backend/app/routes.py#L248).