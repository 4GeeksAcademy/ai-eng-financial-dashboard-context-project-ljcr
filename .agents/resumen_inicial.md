# Resumen Inicial de Arquitectura

Análisis basado únicamente en evidencia observable en el código del repositorio.

## Vista general

- Arquitectura de 2 servicios orquestados con Docker Compose: frontend y backend, con dependencia explícita del frontend hacia backend ([docker-compose.yml:1](docker-compose.yml#L1), [docker-compose.yml:11](docker-compose.yml#L11)).
- Backend implementado con FastAPI, exponiendo endpoints bajo /api/metrics y /health ([backend/app/routes.py:243](backend/app/routes.py#L243)).
- Frontend implementado con React + Vite + TypeScript. Consume /api/metrics vía fetch y usa proxy de Vite hacia http://backend:8000 ([frontend/src/App.tsx:16](frontend/src/App.tsx#L16), [frontend/vite.config.ts:12](frontend/vite.config.ts#L12)).

## Carpetas principales y propósito

### backend

- API FastAPI y lógica de dominio para movimientos financieros simulados.
- Punto de arranque de la app en [backend/app/main.py:6](backend/app/main.py#L6).
- Rutas, modelos y funciones de cálculo en [backend/app/routes.py:22](backend/app/routes.py#L22).
- Dependencias Python en [backend/requirements.txt:1](backend/requirements.txt#L1).
- Contenedor backend en [backend/Dockerfile:1](backend/Dockerfile#L1).
- Tests de API y utilidades en [backend/tests/test_routes.py:12](backend/tests/test_routes.py#L12) y [backend/tests/conftest.py:1](backend/tests/conftest.py#L1).

### frontend

- SPA React/Vite con visualización de KPIs y charts.
- Entry HTML en [frontend/index.html:11](frontend/index.html#L11).
- Bootstrap React en [frontend/src/main.tsx:6](frontend/src/main.tsx#L6).
- Componente raíz y fetch de datos en [frontend/src/App.tsx:23](frontend/src/App.tsx#L23).
- Componentes de dashboard en [frontend/src/components/dashboard](frontend/src/components/dashboard).
- UI base reutilizable en [frontend/src/components/ui](frontend/src/components/ui).
- Tipos y cálculos en [frontend/src/lib/financial-types.ts:1](frontend/src/lib/financial-types.ts#L1) y [frontend/src/lib/financial-utils.ts:21](frontend/src/lib/financial-utils.ts#L21).
- Configuración de build/lint en [frontend/package.json:6](frontend/package.json#L6), [frontend/vite.config.ts:7](frontend/vite.config.ts#L7), [frontend/eslint.config.js:8](frontend/eslint.config.js#L8), [frontend/tsconfig.app.json:2](frontend/tsconfig.app.json#L2).
- Contenedor frontend en [frontend/Dockerfile:1](frontend/Dockerfile#L1).

### Raíz del repositorio

- Orquestación local de servicios en [docker-compose.yml:1](docker-compose.yml#L1).
- Documentación en [README.md:39](README.md#L39) y [README.es.md:39](README.es.md#L39).
- Guía para agentes en [AGENTS.md](AGENTS.md).

## Servicios backend y frontend

### Backend service

- Imagen Python slim, instala requirements y levanta uvicorn bajo debugpy ([backend/Dockerfile:12](backend/Dockerfile#L12)).
- FastAPI app con CORS abierto ([backend/app/main.py:7](backend/app/main.py#L7)).
- Router incluido en la app ([backend/app/main.py:14](backend/app/main.py#L14)).
- Datos generados en memoria mediante generate_mock_movements con seed fija ([backend/app/routes.py:94](backend/app/routes.py#L94)), usados en endpoints como [backend/app/routes.py:255](backend/app/routes.py#L255).

### Frontend service

- Imagen Node Alpine, ejecuta Vite dev server ([frontend/Dockerfile:12](frontend/Dockerfile#L12)).
- Proxy para /api hacia backend container ([frontend/vite.config.ts:12](frontend/vite.config.ts#L12)).
- Consumo real de API observado: solo /api/metrics ([frontend/src/App.tsx:16](frontend/src/App.tsx#L16)).

## Entry points clave

### Backend

- Inicialización de FastAPI y middleware en [backend/app/main.py:6](backend/app/main.py#L6).
- Arranque del proceso API en contenedor en [backend/Dockerfile:12](backend/Dockerfile#L12).

### Frontend

- Inyección del bundle en HTML en [frontend/index.html:11](frontend/index.html#L11).
- Render de App en root en [frontend/src/main.tsx:6](frontend/src/main.tsx#L6).
- Carga de datos y composición principal de UI en [frontend/src/App.tsx:23](frontend/src/App.tsx#L23).

### Orquestación

- Definición de servicios y puertos en [docker-compose.yml:2](docker-compose.yml#L2), [docker-compose.yml:14](docker-compose.yml#L14) y [docker-compose.yml:19](docker-compose.yml#L19).

## Funcionalidad programada (evidencia)

### Endpoints backend implementados

- /health en [backend/app/routes.py:243](backend/app/routes.py#L243).
- /api/metrics en [backend/app/routes.py:248](backend/app/routes.py#L248).
- /api/metrics/facets en [backend/app/routes.py:262](backend/app/routes.py#L262).
- /api/metrics/summary en [backend/app/routes.py:268](backend/app/routes.py#L268).
- /api/metrics/categories/top en [backend/app/routes.py:287](backend/app/routes.py#L287).
- /api/metrics/comparison en [backend/app/routes.py:305](backend/app/routes.py#L305).
- /api/metrics/alerts en [backend/app/routes.py:342](backend/app/routes.py#L342).
- /api/metrics/b2b en [backend/app/routes.py:362](backend/app/routes.py#L362).
- /api/metrics/b2c en [backend/app/routes.py:378](backend/app/routes.py#L378).

### Frontend actual renderiza

- KPIs (income, outcome, profit, margin) vía [frontend/src/components/dashboard/kpi-row.tsx:14](frontend/src/components/dashboard/kpi-row.tsx#L14).
- Chart de income vs outcome vía [frontend/src/components/dashboard/income-outcome-chart.tsx:49](frontend/src/components/dashboard/income-outcome-chart.tsx#L49).
- Chart de profit percent vía [frontend/src/components/dashboard/profit-percent-chart.tsx:50](frontend/src/components/dashboard/profit-percent-chart.tsx#L50).

### Pruebas

- Backend valida endpoints y filtros en [backend/tests/test_routes.py:29](backend/tests/test_routes.py#L29) y [backend/tests/test_routes.py:104](backend/tests/test_routes.py#L104).
- Frontend valida utilidades de cálculo y formato en [frontend/src/lib/financial-utils.test.ts:29](frontend/src/lib/financial-utils.test.ts#L29).

## Puntos no claros o no evidenciados en código

- No hay evidencia de persistencia en base de datos. Los datos parecen simulados en memoria por request, usando generación aleatoria con seed=42 ([backend/app/routes.py:94](backend/app/routes.py#L94)).
- No hay evidencia de autenticación/autorización ni gestión de usuarios en los archivos revisados.
- El frontend solo consume /api/metrics; no se observan consumos de otros endpoints implementados ([frontend/src/App.tsx:16](frontend/src/App.tsx#L16)).
- Existe un dataset local en [frontend/src/lib/mock-data.ts:3](frontend/src/lib/mock-data.ts#L3), pero no aparece referenciado desde otros archivos del frontend.
- README menciona un archivo de entorno de ejemplo que no aparece en el árbol actual, posible desalineación documental ([README.md:46](README.md#L46), [README.es.md:46](README.es.md#L46)).
