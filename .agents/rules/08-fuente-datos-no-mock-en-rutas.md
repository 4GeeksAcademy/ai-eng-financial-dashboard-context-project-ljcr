# Regla de Ingeniería

## Nombre de la regla
Los endpoints de negocio no deben generar datos mock en runtime.

## Alcance
Backend y arquitectura de datos.

## Razón
Generar mocks por request impide trazabilidad, no representa estado real y bloquea evolución hacia persistencia.

## Ejemplo correcto vs incorrecto
**Correcto (objetivo del proyecto):**
- Usar repositorio/fuente de datos explícita (DB, fixtures, o proveedor configurable).
- Si hay modo demo, activarlo por flag de entorno y documentarlo.

**Incorrecto (estado actual a corregir):**
- Llamar `generate_mock_movements(seed=42)` dentro de endpoints productivos.
- Evidencia: [backend/app/routes.py](backend/app/routes.py#L255), [backend/app/routes.py](backend/app/routes.py#L277), [backend/app/routes.py](backend/app/routes.py#L350).