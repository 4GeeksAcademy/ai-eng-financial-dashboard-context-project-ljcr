# Índice Maestro de Conocimiento del Proyecto

Este documento centraliza la navegación para asistentes de IA y personas colaboradoras sobre:

1. Reglas de ingeniería en `.agents/rules`.
2. Documentos del Memory Bank en `.agents/memory-bank`.
3. Resumen ejecutivo de auditoría y de arquitectura inicial.

## Índice de Rules

### Reglas de refuerzo (buenas prácticas)

1. [01 - Separación de servicios](rules/01-separacion-servicios.md)
2. [02 - Contratos API tipados](rules/02-contratos-api-tipados.md)
3. [03 - Lógica de dominio fuera de UI](rules/03-logica-dominio-fuera-ui.md)
4. [04 - Pruebas de contrato y filtros](rules/04-pruebas-contrato-filtros.md)
5. [05 - Documentación operativa vigente](rules/05-documentacion-operativa-vigente.md)

### Reglas de mitigación (riesgos técnicos)

1. [06 - CORS seguro por entorno](rules/06-cors-seguro-por-entorno.md)
2. [07 - Modularización de backend](rules/07-modularizacion-backend.md)
3. [08 - Fuente de datos no mock en rutas](rules/08-fuente-datos-no-mock-en-rutas.md)
4. [09 - Naming e idioma consistente](rules/09-naming-e-idioma-consistente.md)
5. [10 - Build reproducible y runtime estable](rules/10-build-reproducible-runtime-estable.md)

## Índice de Memory Bank

1. [Product Overview](memory-bank/product_overview.md)
2. [Tech Stack](memory-bank/tech_stack.md)
3. [Current State](memory-bank/current_state.md)

## Resumen de Auditoría

Fuente completa: [auditoria.md](auditoria.md)

### Hallazgos clave

1. Se identificaron 12 buenas prácticas y 12 riesgos técnicos.
2. Fortalezas observadas:
- Separación frontend/backend con Docker Compose.
- Contratos de API tipados con Pydantic y `response_model`.
- Cálculo financiero aislado en utilidades frontend con pruebas unitarias.
3. Riesgos prioritarios:
- CORS abierto con credenciales habilitadas.
- Concentración de responsabilidades en `backend/app/routes.py`.
- Datos mock en runtime sin persistencia observable.
- Reproducibilidad mejorable de entorno (`requirements` sin pinning, `npm install` en Docker).
- Cobertura de testing frontend enfocada solo en utilidades, sin pruebas de UI/integración.

## Resumen Inicial de Arquitectura

Fuente completa: [resumen_inicial.md](resumen_inicial.md)

### Vista resumida

1. Arquitectura de 2 servicios: frontend (Vite + React + TS) y backend (FastAPI).
2. Flujo principal implementado hoy:
- Frontend consume `/api/metrics`.
- Backend genera movimientos mock (`seed=42`), aplica filtros y devuelve datos.
- Frontend calcula KPIs y series mensuales, luego renderiza KPI row + 2 gráficos.
3. Endpoints backend disponibles además de `/api/metrics`:
- `/api/metrics/facets`
- `/api/metrics/summary`
- `/api/metrics/categories/top`
- `/api/metrics/comparison`
- `/api/metrics/alerts`
- `/api/metrics/b2b`
- `/api/metrics/b2c`

## Uso recomendado para asistentes de IA

1. Leer primero este índice.
2. Aplicar reglas en `rules/` antes de proponer o editar código.
3. Consultar `memory-bank/current_state.md` para priorización.
4. Actualizar `memory-bank` cuando cambie el estado real del código.
