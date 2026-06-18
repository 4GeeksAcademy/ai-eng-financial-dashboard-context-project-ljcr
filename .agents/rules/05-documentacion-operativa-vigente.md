# Regla de Ingeniería

## Nombre de la regla
La documentación operativa debe reflejar exactamente el estado real del repositorio.

## Alcance
Documentación (`README.md`, `README.es.md`) y DX.

## Razón
Documentación desalineada genera fricción de onboarding y errores de configuración.

## Ejemplo correcto vs incorrecto
**Correcto (este proyecto):**
- Instrucciones de ejecución con `docker compose up --build` y puertos reales.
- Evidencia: [README.md](README.md#L42), [README.md](README.md#L48), [README.es.md](README.es.md#L48).

**Incorrecto (a evitar):**
- Referenciar archivos inexistentes como `frontend/.env.example` sin incluirlos o sin aclaración explícita.
- Evidencia actual de riesgo: [README.md](README.md#L46), [README.es.md](README.es.md#L46).