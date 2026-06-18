# Regla de Ingeniería

## Nombre de la regla
La lógica de cálculo financiero vive fuera de componentes de UI.

## Alcance
Frontend React + TypeScript.

## Razón
Separar presentación de cálculo facilita pruebas, reutilización y cambios de UI sin alterar reglas de negocio.

## Ejemplo correcto vs incorrecto
**Correcto (este proyecto):**
- Cálculos en utilidades puras consumidas por `App`.
- Evidencia: [frontend/src/lib/financial-utils.ts](frontend/src/lib/financial-utils.ts#L21), [frontend/src/App.tsx](frontend/src/App.tsx#L32).

**Incorrecto (a evitar):**
- Calcular `profitPercent` dentro de JSX en `KPIRow` o en cada chart.
- Duplicar agregaciones mensuales en varios componentes.