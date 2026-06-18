# Regla de Ingeniería

## Nombre de la regla
Mantener convención de naming e idioma de UI consistentes por capa.

## Alcance
Frontend (tipos, componentes, textos UI) y documentación.

## Razón
La mezcla de estilos y de idioma incrementa deuda cognitiva y hace más difícil mantener UX y contratos.

## Ejemplo correcto vs incorrecto
**Correcto (objetivo del proyecto):**
- Elegir una convención por capa y sostenerla: API en `snake_case`, dominio frontend interno en `camelCase` con adaptador explícito.
- Definir idioma principal de UI (ES o EN) y aplicarlo en labels, helper text y errores.

**Incorrecto (estado actual a corregir):**
- Combinar `create_date` con `totalIncome` en el mismo flujo sin capa de adaptación.
- Combinar labels en inglés y errores en español en una misma vista.
- Evidencia: [frontend/src/lib/financial-types.ts](frontend/src/lib/financial-types.ts#L6), [frontend/src/lib/financial-types.ts](frontend/src/lib/financial-types.ts#L14), [frontend/src/components/dashboard/kpi-row.tsx](frontend/src/components/dashboard/kpi-row.tsx#L15), [frontend/src/App.tsx](frontend/src/App.tsx#L37).