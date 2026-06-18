# Auditoría de Calidad de Ingeniería

Análisis del repositorio con foco en calidad de ingeniería, basado en evidencia del código actual.

## Resumen

- Buenas prácticas identificadas: 12.
- Malas prácticas, anti-patrones o riesgos técnicos identificados: 12.
- Categorías cubiertas: Arquitectura, Naming conventions, Testing, Documentación, Developer Experience.

## Arquitectura

### Buenas prácticas

1. Separación explícita de servicios frontend y backend con dependencia declarada en orquestación local. Evidencia: [docker-compose.yml](docker-compose.yml#L1), [docker-compose.yml](docker-compose.yml#L11), [docker-compose.yml](docker-compose.yml#L14).
2. Contratos de API tipados con modelos Pydantic y response_model en endpoints, lo que reduce ambigüedad en payloads. Evidencia: [backend/app/routes.py](backend/app/routes.py#L22), [backend/app/routes.py](backend/app/routes.py#L248), [backend/app/routes.py](backend/app/routes.py#L305).
3. Capa de transformación de datos en frontend separada en utilidades puras, desacoplando cálculo de la vista. Evidencia: [frontend/src/lib/financial-utils.ts](frontend/src/lib/financial-utils.ts#L21), [frontend/src/App.tsx](frontend/src/App.tsx#L32).

### Malas prácticas, anti-patrones o riesgos

1. CORS totalmente abierto junto con credenciales habilitadas, configuración riesgosa para escenarios reales. Evidencia: [backend/app/main.py](backend/app/main.py#L9), [backend/app/main.py](backend/app/main.py#L10), [backend/app/main.py](backend/app/main.py#L11).
2. Archivo único de rutas concentra modelos, generación de datos, agregaciones y handlers HTTP; riesgo de baja mantenibilidad por alta cohesión accidental. Evidencia: [backend/app/routes.py](backend/app/routes.py#L22), [backend/app/routes.py](backend/app/routes.py#L94), [backend/app/routes.py](backend/app/routes.py#L161), [backend/app/routes.py](backend/app/routes.py#L248).
3. Uso de datos simulados en cada request en endpoints productivos del servicio; no hay capa de persistencia real observable. Evidencia: [backend/app/routes.py](backend/app/routes.py#L255), [backend/app/routes.py](backend/app/routes.py#L277), [backend/app/routes.py](backend/app/routes.py#L311).

## Naming conventions

### Buenas prácticas

1. Uso consistente de PascalCase para interfaces y tipos en frontend, y nombres descriptivos de dominio. Evidencia: [frontend/src/lib/financial-types.ts](frontend/src/lib/financial-types.ts#L5), [frontend/src/lib/financial-types.ts](frontend/src/lib/financial-types.ts#L13), [frontend/src/lib/financial-types.ts](frontend/src/lib/financial-types.ts#L20).
2. Componentes e interfaces de props mantienen convención clara y predecible. Evidencia: [frontend/src/components/dashboard/kpi-card.tsx](frontend/src/components/dashboard/kpi-card.tsx#L6), [frontend/src/components/dashboard/kpi-card.tsx](frontend/src/components/dashboard/kpi-card.tsx#L34), [frontend/src/components/dashboard/kpi-row.tsx](frontend/src/components/dashboard/kpi-row.tsx#L6).

### Malas prácticas, anti-patrones o riesgos

1. Mezcla de estilos snake_case y camelCase dentro del mismo modelo frontend, elevando fricción cognitiva y riesgo de mapeos inconsistentes. Evidencia: [frontend/src/lib/financial-types.ts](frontend/src/lib/financial-types.ts#L6), [frontend/src/lib/financial-types.ts](frontend/src/lib/financial-types.ts#L14), [frontend/src/lib/financial-types.ts](frontend/src/lib/financial-types.ts#L17).
2. Convención de idioma inconsistente en UI y errores, con textos en inglés y español coexistiendo en la misma pantalla. Evidencia: [frontend/src/components/dashboard/kpi-row.tsx](frontend/src/components/dashboard/kpi-row.tsx#L15), [frontend/src/components/dashboard/kpi-row.tsx](frontend/src/components/dashboard/kpi-row.tsx#L39), [frontend/src/App.tsx](frontend/src/App.tsx#L37).

## Testing

### Buenas prácticas

1. Existe suite de pruebas backend cubriendo endpoints principales y filtros funcionales. Evidencia: [backend/tests/test_routes.py](backend/tests/test_routes.py#L29), [backend/tests/test_routes.py](backend/tests/test_routes.py#L36), [backend/tests/test_routes.py](backend/tests/test_routes.py#L144).
2. Se validan propiedades de orden y forma de respuesta, no solo status code. Evidencia: [backend/tests/test_routes.py](backend/tests/test_routes.py#L16), [backend/tests/test_routes.py](backend/tests/test_routes.py#L59), [backend/tests/test_routes.py](backend/tests/test_routes.py#L165).
3. Pruebas frontend de utilidades puras cubren casos normales y edge case de división por cero. Evidencia: [frontend/src/lib/financial-utils.test.ts](frontend/src/lib/financial-utils.test.ts#L35), [frontend/src/lib/financial-utils.test.ts](frontend/src/lib/financial-utils.test.ts#L47), [frontend/src/lib/financial-utils.test.ts](frontend/src/lib/financial-utils.test.ts#L63).

### Malas prácticas, anti-patrones o riesgos

1. Predominio de happy-path en backend; no se observan pruebas de validación negativa de query params inválidos o errores 4xx/5xx. Evidencia: [backend/tests/test_routes.py](backend/tests/test_routes.py#L32), [backend/tests/test_routes.py](backend/tests/test_routes.py#L46), [backend/tests/test_routes.py](backend/tests/test_routes.py#L179).
2. Frontend no muestra evidencia de pruebas de componentes, integración de fetch ni estados de carga/error en UI. Evidencia: [frontend/src/lib/financial-utils.test.ts](frontend/src/lib/financial-utils.test.ts#L1), [frontend/src/App.tsx](frontend/src/App.tsx#L29), [frontend/src/App.tsx](frontend/src/App.tsx#L51).

## Documentación

### Buenas prácticas

1. Documentación bilingüe (inglés y español) con instrucciones de ejecución local claras. Evidencia: [README.md](README.md#L39), [README.es.md](README.es.md#L39), [README.md](README.md#L42), [README.es.md](README.es.md#L42).
2. La documentación expone endpoints de acceso local y docs de API, útil para onboarding rápido. Evidencia: [README.md](README.md#L48), [README.md](README.md#L50), [README.es.md](README.es.md#L50).

### Malas prácticas, anti-patrones o riesgos

1. Se documenta un archivo de entorno de ejemplo que no forma parte del árbol actual del repositorio, creando ambigüedad de setup. Evidencia: [README.md](README.md#L46), [README.es.md](README.es.md#L46).
2. El backend implementa varios endpoints avanzados pero el frontend documentado y observable consume solo uno, lo que deja parte de la superficie funcional sin narrativa de uso en docs. Evidencia: [backend/app/routes.py](backend/app/routes.py#L262), [backend/app/routes.py](backend/app/routes.py#L305), [frontend/src/App.tsx](frontend/src/App.tsx#L16).

## Developer Experience

### Buenas prácticas

1. Scripts de desarrollo, build, lint y test definidos de forma explícita para frontend. Evidencia: [frontend/package.json](frontend/package.json#L6), [frontend/package.json](frontend/package.json#L8), [frontend/package.json](frontend/package.json#L9), [frontend/package.json](frontend/package.json#L11).
2. Proxy de Vite para /api simplifica desarrollo local y evita configuración manual de CORS en cliente. Evidencia: [frontend/vite.config.ts](frontend/vite.config.ts#L11), [frontend/vite.config.ts](frontend/vite.config.ts#L13).
3. Entorno de desarrollo containerizado para ambos servicios con puertos definidos. Evidencia: [backend/Dockerfile](backend/Dockerfile#L12), [frontend/Dockerfile](frontend/Dockerfile#L12), [docker-compose.yml](docker-compose.yml#L7), [docker-compose.yml](docker-compose.yml#L19).

### Malas prácticas, anti-patrones o riesgos

1. Dependencias Python sin versionado explícito, reduciendo reproducibilidad entre entornos. Evidencia: [backend/requirements.txt](backend/requirements.txt#L1), [backend/requirements.txt](backend/requirements.txt#L2), [backend/requirements.txt](backend/requirements.txt#L3).
2. Imagen frontend usa npm install en lugar de npm ci, lo que puede introducir variabilidad del árbol de dependencias en CI/dev. Evidencia: [frontend/Dockerfile](frontend/Dockerfile#L6).
3. Imagen backend ejecuta debugpy y modo reload por defecto en CMD, configuración más orientada a desarrollo que a operación estable. Evidencia: [backend/Dockerfile](backend/Dockerfile#L12).

## Observaciones finales

- El proyecto muestra buenas bases en tipado, separación frontend/backend y cobertura inicial de pruebas.
- Los principales riesgos actuales están en seguridad de configuración, mantenibilidad de backend monolítico por archivo, reproducibilidad del entorno y profundidad de testing de UI/errores.