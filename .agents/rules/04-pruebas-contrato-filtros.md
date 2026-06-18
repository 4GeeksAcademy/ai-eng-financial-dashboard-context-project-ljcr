# Regla de Ingeniería

## Nombre de la regla
Cada endpoint y filtro nuevo debe venir con pruebas funcionales y de contrato.

## Alcance
Testing backend y frontend.

## Razón
Evita regresiones en parámetros, orden, estructura de respuesta y reglas de negocio.

## Ejemplo correcto vs incorrecto
**Correcto (este proyecto):**
- Se prueban filtros y shape de respuestas.
- Evidencia: [backend/tests/test_routes.py](backend/tests/test_routes.py#L36), [backend/tests/test_routes.py](backend/tests/test_routes.py#L104), [backend/tests/test_routes.py](backend/tests/test_routes.py#L157).

**Incorrecto (a evitar):**
- Crear `/api/metrics/new-feature` sin prueba en `backend/tests/`.
- Verificar solo `status_code == 200` sin validar contenido ni campos.