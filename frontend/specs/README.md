# Especificación Funcional y Contrato de Datos

Documento de referencia para implementar la capa frontend del dashboard financiero con base en los contratos actuales del backend.

## Alcance

Este documento cubre tres funcionalidades:

1. Filtro de fechas global
2. Tabla de alertas de anomalías
3. Vista comparativa B2B vs B2C

También define restricciones, valores válidos y casos límite con comportamiento esperado de UI.

---

## Funcionalidad 1: Filtro de Fechas Global

### Objetivo

Permitir que el usuario acote el rango temporal de consulta, respetando los límites del dataset y aplicando reglas consistentes cuando solo se completa uno de los dos extremos.

### Endpoints Consumidos

| Método y ruta | Uso en la funcionalidad | Ejemplo |
|---|---|---|
| GET /api/metrics/facets | Obtener rango temporal válido y facetas de dataset. | GET /api/metrics/facets |
| GET /api/metrics/alerts | Aplicar filtro temporal al flujo de alertas. | GET /api/metrics/alerts?start_date=2025-01-01&end_date=2025-03-31&threshold=0.3 |
| GET /api/metrics/categories/top | Aplicar filtro temporal al flujo comparativo de top categorías. | GET /api/metrics/categories/top?operation_type=income&limit=5&business_type=B2B&start_date=2025-01-01&end_date=2025-03-31 |
| GET /api/metrics/summary | Alimentar visual comparativa inferior por línea de negocio. | GET /api/metrics/summary?group_by=month&business_type=B2C&start_date=2025-01-01&end_date=2025-03-31 |

### Tipos TypeScript Asociados

| Rol | Tipo | Archivo |
|---|---|---|
| Parámetros de rango de fechas | DateRangeFilter | frontend/specs/param-types.ts |
| Respuesta de facetas/rango | FacetsResponse | frontend/specs/api-types.ts |

### Restricciones y Valores Válidos

- start_date y end_date usan formato YYYY-MM-DD.
- Ambos campos son opcionales a nivel de contrato de query.
- El rango efectivo debe permanecer dentro de FacetsResponse.min_date y FacetsResponse.max_date.
- Si se envían ambas fechas, start_date debe ser menor o igual que end_date.
- Regla de normalización de UI:
	si falta end_date, usar FacetsResponse.max_date;
	si falta start_date, usar FacetsResponse.min_date.

### Casos Edge y Comportamiento Esperado de UI

| Caso edge | Entrada / condición | Comportamiento UI esperado |
|---|---|---|
| Fecha fin anterior a fecha inicio | start_date=2025-06-10 y end_date=2025-05-10 | Bloquear acción de aplicar, mostrar validación inline clara, no disparar request. |
| Solo fecha de inicio informada | start_date=2025-03-01 y end_date vacío | Mostrar chip o texto de rango efectivo: 2025-03-01 a max_date; ejecutar requests con end_date=max_date. |
| Solo fecha de fin informada | start_date vacío y end_date=2025-03-31 | Mostrar rango efectivo: min_date a 2025-03-31; ejecutar requests con start_date=min_date. |
| Fechas fuera del dataset | start_date menor que min_date o end_date mayor que max_date | Autoajustar a límites válidos o bloquear con mensaje; en ambos casos, comunicar el rango aplicado final en UI. |

---

## Funcionalidad 2: Tabla de Alertas

### Objetivo

Mostrar periodos con incrementos anómalos de outcome respecto a su baseline, controlando sensibilidad con threshold.

### Endpoints Consumidos

| Método y ruta | Uso en la funcionalidad | Ejemplo |
|---|---|---|
| GET /api/metrics/alerts | Obtener lista de anomalías para umbral y rango dados. | GET /api/metrics/alerts?threshold=0.3&group_by=month&start_date=2025-01-01&end_date=2025-06-30 |

Parámetros relevantes del endpoint:

- threshold: number, backend acepta ge=0; frontend restringe operativamente a 0.01..1.0
- group_by: day | week | month (se recomienda month para la tabla principal)
- start_date / end_date: opcionales, formato YYYY-MM-DD
- business_type: opcional, B2B | B2C

### Tipos TypeScript Asociados

| Rol | Tipo | Archivo |
|---|---|---|
| Parámetros de consulta | AlertsParams | frontend/specs/param-types.ts |
| Elemento de respuesta | AlertEntry | frontend/specs/api-types.ts |
| Colección de respuesta | AlertsResponse | frontend/specs/api-types.ts |
| Soporte de rango temporal | DateRangeFilter | frontend/specs/param-types.ts |

### Restricciones y Valores Válidos

- threshold debe tratarse en UI como ratio decimal en el rango 0.01 a 1.0.
- Valor por defecto funcional para frontend: 0.3.
- Al mostrar incremento porcentual:
	porcentaje = increase_ratio * 100, con formato porcentual legible.
- El resultado puede ser lista vacía; esto no es error de API.

### Casos Edge y Comportamiento Esperado de UI

| Caso edge | Entrada / condición | Comportamiento UI esperado |
|---|---|---|
| Umbral extremo alto | threshold=1.0 | Alta probabilidad de cero resultados; renderizar estado vacío explícito con mensaje No se detectaron anomalías para el umbral seleccionado. |
| Umbral extremo bajo | threshold=0.01 | Potencial aumento de resultados; mantener tabla paginada o scrollable, sin truncar silenciosamente filas. |
| Respuesta vacía | API retorna [] | No ocultar módulo; mostrar estado vacío con recomendación de ajustar umbral o ampliar rango temporal. |
| Rango de fechas inválido heredado del filtro global | start_date > end_date | No llamar endpoint; reutilizar mensaje de validación del filtro global y mantener último resultado válido visible. |

---

## Funcionalidad 3: Vista B2B vs B2C

### Objetivo

Comparar desempeño de líneas de negocio B2B y B2C mostrando top-5 categorías de ingresos por panel y una visual inferior comparativa.

### Endpoints Consumidos

| Método y ruta | Uso en la funcionalidad | Ejemplo |
|---|---|---|
| GET /api/metrics/categories/top | Obtener top categorías de ingresos para B2B. | GET /api/metrics/categories/top?operation_type=income&limit=5&business_type=B2B&start_date=2025-01-01&end_date=2025-03-31 |
| GET /api/metrics/categories/top | Obtener top categorías de ingresos para B2C. | GET /api/metrics/categories/top?operation_type=income&limit=5&business_type=B2C&start_date=2025-01-01&end_date=2025-03-31 |
| GET /api/metrics/summary | Fuente para gráfico comparativo inferior por periodo y business_type. | GET /api/metrics/summary?group_by=month&business_type=B2B&start_date=2025-01-01&end_date=2025-03-31 |
| GET /api/metrics/summary | Fuente para gráfico comparativo inferior por periodo y business_type. | GET /api/metrics/summary?group_by=month&business_type=B2C&start_date=2025-01-01&end_date=2025-03-31 |

Notas de implementación:

- El endpoint de top categorías retorna total_amount por categoría, sin porcentaje de grupo nativo.
- Si se desea porcentaje visual, calcularlo en frontend a partir del subtotal de cada panel.

### Tipos TypeScript Asociados

| Rol | Tipo | Archivo |
|---|---|---|
| Parámetros para top categorías | TopCategoriesParams | frontend/specs/param-types.ts |
| Soporte de rango temporal | DateRangeFilter | frontend/specs/param-types.ts |
| Entrada por categoría | CategoryEntry | frontend/specs/api-types.ts |
| Colección de top categorías | TopCategoriesResponse | frontend/specs/api-types.ts |

### Restricciones y Valores Válidos

- operation_type debe enviarse como valor literal income para este flujo.
- limit debe fijarse en 5 para cumplir top-5 funcional.
- business_type válido en query: B2B o B2C.
- start_date / end_date siguen formato YYYY-MM-DD.
- Para visual comparativa, usar mismo rango de fechas para ambos segmentos.

### Casos Edge y Comportamiento Esperado de UI

| Caso edge | Entrada / condición | Comportamiento UI esperado |
|---|---|---|
| Una línea sin transacciones en el rango | Top B2B con datos y Top B2C vacío, o viceversa | Mantener ambos paneles visibles; en panel vacío mostrar estado Sin categorías disponibles para el segmento en el rango seleccionado. |
| Ambas líneas sin transacciones | Top B2B=[] y Top B2C=[] | Mostrar empty state en ambos paneles y en gráfico inferior: No hay datos comparativos para el rango seleccionado. |
| Respuestas asimétricas en longitud | B2B devuelve 5, B2C devuelve 2 | Renderizar cada panel con su tamaño real, sin inventar categorías; mantener alineación visual con placeholders neutrales si aplica. |
| Error en una sola consulta | Falla B2C pero B2B responde | Mostrar panel B2B con datos disponibles y panel B2C con estado de error recuperable, incluyendo acción de reintento por panel. |

---

## Reglas Transversales de UI

### Manejo de carga

- Cada bloque funcional debe tener estado loading independiente.
- Evitar bloquear toda la pantalla por una sola consulta en progreso.

### Manejo de error

- Mostrar mensajes accionables y específicos por módulo.
- Conservar último estado exitoso cuando una recarga falle.

### Trazabilidad de rango aplicado

- Todas las vistas dependientes de tiempo deben mostrar el rango efectivo aplicado (normalizado), no solo el valor en inputs.

### Consistencia de formato

- Fechas: YYYY-MM-DD para inputs y etiquetas técnicas.
- Ratios: decimal en query, porcentaje en visualización cuando corresponda.
- Montos: formato monetario homogéneo en tablas y gráficos.
