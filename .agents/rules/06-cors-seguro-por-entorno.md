# Regla de Ingeniería

## Nombre de la regla
CORS debe ser restrictivo y parametrizado por entorno.

## Alcance
Backend FastAPI, seguridad.

## Razón
`allow_origins=["*"]` con credenciales habilitadas eleva riesgo de exposición y comportamiento no deseado.

## Ejemplo correcto vs incorrecto
**Correcto (objetivo del proyecto):**
- Definir lista explícita de orígenes permitidos por variable de entorno.
- Mantener `allow_credentials=True` solo cuando sea necesario y con orígenes concretos.

**Incorrecto (estado actual a corregir):**
- `allow_origins=["*"]` y `allow_credentials=True` en producción.
- Evidencia: [backend/app/main.py](backend/app/main.py#L9), [backend/app/main.py](backend/app/main.py#L10).