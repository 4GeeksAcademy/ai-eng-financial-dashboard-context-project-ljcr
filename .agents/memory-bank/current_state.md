# Current State

## Features implementadas

1. API de salud
- Endpoint /health retorna status ok.
- Evidencia: [backend/app/routes.py](backend/app/routes.py#L243).

2. API de métricas base con filtros
- Endpoint /api/metrics con filtros por fecha, categoría y tipo de operación.
- Evidencia: [backend/app/routes.py](backend/app/routes.py#L248), [backend/app/routes.py](backend/app/routes.py#L250).

3. Endpoints analíticos adicionales ya implementados
- facets, summary, categories/top, comparison, alerts, b2b, b2c.
- Evidencia: [backend/app/routes.py](backend/app/routes.py#L262), [backend/app/routes.py](backend/app/routes.py#L268), [backend/app/routes.py](backend/app/routes.py#L342), [backend/app/routes.py](backend/app/routes.py#L378).

4. Dashboard frontend funcional
- Fetch de datos, manejo de loading/error, render de KPIs y 2 gráficos.
- Evidencia: [frontend/src/App.tsx](frontend/src/App.tsx#L16), [frontend/src/App.tsx](frontend/src/App.tsx#L29), [frontend/src/App.tsx](frontend/src/App.tsx#L57), [frontend/src/App.tsx](frontend/src/App.tsx#L65).

5. Cálculo local de métricas
- KPIs y agregación mensual calculados en utilidades puras.
- Evidencia: [frontend/src/lib/financial-utils.ts](frontend/src/lib/financial-utils.ts#L21), [frontend/src/lib/financial-utils.ts](frontend/src/lib/financial-utils.ts#L36).

6. Cobertura inicial de testing
- Backend con pruebas de filtros/endpoints.
- Frontend con pruebas de utilidades financieras.
- Evidencia: [backend/tests/test_routes.py](backend/tests/test_routes.py#L36), [backend/tests/test_routes.py](backend/tests/test_routes.py#L144), [frontend/src/lib/financial-utils.test.ts](frontend/src/lib/financial-utils.test.ts#L35).

## Gaps conocidos

1. Seguridad CORS débil para un escenario real
- Configuración abierta con allow_origins wildcard y credenciales habilitadas.
- Evidencia: [backend/app/main.py](backend/app/main.py#L9), [backend/app/main.py](backend/app/main.py#L10).

2. Acumulación de responsabilidades en backend/app/routes.py
- Modelos, generación de datos, lógica analítica y handlers en un solo archivo.
- Evidencia: [backend/app/routes.py](backend/app/routes.py#L22), [backend/app/routes.py](backend/app/routes.py#L94), [backend/app/routes.py](backend/app/routes.py#L248).

3. Fuente de datos no persistente
- Datos mock generados por request, sin persistencia observable.
- Evidencia: [backend/app/routes.py](backend/app/routes.py#L94), [backend/app/routes.py](backend/app/routes.py#L255).

4. Superficie API no aprovechada por frontend
- Frontend consume solo /api/metrics pese a tener endpoints avanzados disponibles.
- Evidencia: [frontend/src/App.tsx](frontend/src/App.tsx#L16), [backend/app/routes.py](backend/app/routes.py#L262).

5. Inconsistencias de naming e idioma
- Mezcla snake_case y camelCase en tipos de frontend.
- Mezcla de textos UI en inglés y mensajes de error en español.
- Evidencia: [frontend/src/lib/financial-types.ts](frontend/src/lib/financial-types.ts#L6), [frontend/src/lib/financial-types.ts](frontend/src/lib/financial-types.ts#L14), [frontend/src/App.tsx](frontend/src/App.tsx#L37), [frontend/src/components/dashboard/kpi-row.tsx](frontend/src/components/dashboard/kpi-row.tsx#L15).

6. Reproducibilidad mejorable en entorno
- Dependencias Python sin pinning.
- Docker frontend usa npm install en lugar de npm ci.
- Backend arranca en modo debug/reload por defecto.
- Evidencia: [backend/requirements.txt](backend/requirements.txt#L1), [frontend/Dockerfile](frontend/Dockerfile#L6), [backend/Dockerfile](backend/Dockerfile#L12).

7. Brecha de documentación
- README menciona frontend/.env.example, archivo no observado en árbol actual.
- Evidencia: [README.md](README.md#L46).

## Siguientes prioridades

Prioridad 1
- Endurecer CORS por entorno y eliminar wildcard en configuraciones no locales.
- Relacionado con regla: [06-cors-seguro-por-entorno.md](.agents/rules/06-cors-seguro-por-entorno.md).

Prioridad 2
- Modularizar backend/app/routes.py en capas (schemas, services, routers).
- Relacionado con regla: [07-modularizacion-backend.md](.agents/rules/07-modularizacion-backend.md).

Prioridad 3
- Definir estrategia de fuente de datos (persistencia o modo demo explícito por entorno).
- Relacionado con regla: [08-fuente-datos-no-mock-en-rutas.md](.agents/rules/08-fuente-datos-no-mock-en-rutas.md).

Prioridad 4
- Alinear naming de DTOs y estrategia de idioma de interfaz.
- Relacionado con regla: [09-naming-e-idioma-consistente.md](.agents/rules/09-naming-e-idioma-consistente.md).

Prioridad 5
- Mejorar reproducibilidad de builds y separar runtime de dev/prod.
- Relacionado con regla: [10-build-reproducible-runtime-estable.md](.agents/rules/10-build-reproducible-runtime-estable.md).

Prioridad 6
- Ampliar pruebas a escenarios negativos y pruebas de UI/integración frontend.
- Relacionado con regla: [04-pruebas-contrato-filtros.md](.agents/rules/04-pruebas-contrato-filtros.md).

Prioridad 7
- Sincronizar README con archivos reales del repositorio.
- Relacionado con regla: [05-documentacion-operativa-vigente.md](.agents/rules/05-documentacion-operativa-vigente.md).