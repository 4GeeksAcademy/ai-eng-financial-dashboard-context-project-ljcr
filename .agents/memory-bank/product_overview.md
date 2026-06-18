# Product Overview

## Qué hace realmente la aplicación

La aplicación muestra un tablero financiero que consume movimientos desde una API y calcula métricas en el cliente para visualizarlas.

## Entidades principales

1. FinancialMovement
- Campos: create_date, amount, operation_type, category, business_type.
- Evidencia: [backend/app/routes.py](backend/app/routes.py#L22), [frontend/src/lib/financial-types.ts](frontend/src/lib/financial-types.ts#L5).

2. KPIMetrics
- Agrega totalIncome, totalOutcome, profit, profitPercent.
- Evidencia: [frontend/src/lib/financial-types.ts](frontend/src/lib/financial-types.ts#L13), [frontend/src/lib/financial-utils.ts](frontend/src/lib/financial-utils.ts#L21).

3. MonthlyDataPoint
- Serie mensual para gráficos: month, income, outcome, profitPercent.
- Evidencia: [frontend/src/lib/financial-types.ts](frontend/src/lib/financial-types.ts#L20), [frontend/src/lib/financial-utils.ts](frontend/src/lib/financial-utils.ts#L36).

## Flujo de datos actual

1. Backend expone endpoints HTTP con FastAPI.
- Evidencia: [backend/app/main.py](backend/app/main.py#L6), [backend/app/routes.py](backend/app/routes.py#L248).

2. Fuente de datos backend
- Los movimientos se generan en memoria con generate_mock_movements(seed=42) por request y luego se filtran/agregan.
- Evidencia: [backend/app/routes.py](backend/app/routes.py#L94), [backend/app/routes.py](backend/app/routes.py#L255), [backend/app/routes.py](backend/app/routes.py#L277).

3. Consumo frontend
- El frontend solicita solo /api/metrics, maneja loading y error, y calcula KPIs y serie mensual localmente.
- Evidencia: [frontend/src/App.tsx](frontend/src/App.tsx#L16), [frontend/src/App.tsx](frontend/src/App.tsx#L29), [frontend/src/App.tsx](frontend/src/App.tsx#L32).

4. Render de UI
- Se renderizan header, fila de KPI y 2 gráficos.
- Evidencia: [frontend/src/App.tsx](frontend/src/App.tsx#L49), [frontend/src/App.tsx](frontend/src/App.tsx#L57), [frontend/src/App.tsx](frontend/src/App.tsx#L61).

## Endpoints disponibles en backend

1. /health
2. /api/metrics
3. /api/metrics/facets
4. /api/metrics/summary
5. /api/metrics/categories/top
6. /api/metrics/comparison
7. /api/metrics/alerts
8. /api/metrics/b2b
9. /api/metrics/b2c

Evidencia: [backend/app/routes.py](backend/app/routes.py#L243), [backend/app/routes.py](backend/app/routes.py#L262), [backend/app/routes.py](backend/app/routes.py#L378).

## Límites observables del producto actual

1. No hay evidencia de persistencia en base de datos.
- Evidencia: [backend/app/routes.py](backend/app/routes.py#L94).

2. No hay evidencia de autenticación/autorización.
- Evidencia: [backend/app/main.py](backend/app/main.py#L1), [backend/app/routes.py](backend/app/routes.py#L243).

3. El frontend no consume los endpoints avanzados del backend; solo usa /api/metrics.
- Evidencia: [frontend/src/App.tsx](frontend/src/App.tsx#L16), [backend/app/routes.py](backend/app/routes.py#L262).