# Regla de Ingeniería

## Nombre de la regla
Todo endpoint público debe declarar contrato explícito de entrada/salida.

## Alcance
Backend FastAPI.

## Razón
Contratos tipados reducen ambigüedad, mejoran validación automática y hacen más seguras las integraciones.

## Ejemplo correcto vs incorrecto
**Correcto (este proyecto):**
- Modelos `BaseModel` + `response_model` en rutas.
- Evidencia: [backend/app/routes.py](backend/app/routes.py#L22), [backend/app/routes.py](backend/app/routes.py#L248), [backend/app/routes.py](backend/app/routes.py#L342).

**Incorrecto (a evitar):**
- Retornar diccionarios sin esquema declarado.
- Agregar un endpoint nuevo sin `response_model` ni tipos de query params.