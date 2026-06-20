## Especificación de Componentes UI

Este documento describe la arquitectura de la capa de interfaz para tres funcionalidades del dashboard financiero. Los tipos referenciados deben importarse desde:

- frontend/specs/api-types.ts
- frontend/specs/param-types.ts

## Funcionalidad 1: Filtro de Fechas

### Jerarquía de Componentes

1. MetricsDateFilterSection
2. DateRangeReference
3. DateRangePicker
4. DateFilterActions

### 1) Componente: MetricsDateFilterSection

Propósito: Contenedor orquestador del bloque de filtrado temporal.

| Prop | Tipo TypeScript | Descripción |
|---|---|---|
| facets | FacetsResponse | Datos de rango disponible y facetas para mostrar límites válidos. |
| value | DateRangeFilter | Estado actual del formulario de fechas. |
| onChange | (next: DateRangeFilter) => void | Actualiza valores de fechas en cada interacción. |
| onApply | () => void | Dispara la recarga de consultas con el filtro vigente. |
| onReset | () => void | Limpia fechas seleccionadas y vuelve al estado inicial. |
| isLoading | boolean | Deshabilita controles durante fetch de datos. |

### 2) Componente: DateRangeReference

Propósito: Mostrar el rango disponible del dataset proveniente de FacetsResponse.

| Prop | Tipo TypeScript | Descripción |
|---|---|---|
| minDate | FacetsResponse["min_date"] | Fecha mínima disponible en formato YYYY-MM-DD. |
| maxDate | FacetsResponse["max_date"] | Fecha máxima disponible en formato YYYY-MM-DD. |

Reglas de renderizado:

- Siempre visible cuando facets está cargado.
- Texto esperado: Rango disponible: desde {minDate} hasta {maxDate}.
- Si facets no está disponible aún: renderizar placeholder de carga de una sola línea.

### 3) Componente: DateRangePicker

Propósito: Captura de fecha inicial y final.

| Prop | Tipo TypeScript | Descripción |
|---|---|---|
| start_date | DateRangeFilter["start_date"] | Fecha inicial seleccionada por el usuario. |
| end_date | DateRangeFilter["end_date"] | Fecha final seleccionada por el usuario. |
| minAllowed | FacetsResponse["min_date"] | Límite inferior permitido en controles. |
| maxAllowed | FacetsResponse["max_date"] | Límite superior permitido en controles. |
| onChange | (next: DateRangeFilter) => void | Emite cambios de ambos campos. |
| disabled | boolean | Deshabilita inputs si hay carga en progreso. |

Reglas de comportamiento (obligatorias):

- Si solo start_date está informado y end_date está vacío:
	la UI debe aplicar filtro desde start_date hasta facets.max_date.
- Si solo end_date está informado y start_date está vacío:
	la UI debe aplicar filtro desde facets.min_date hasta end_date.
- Si ambos campos están vacíos:
	la UI consulta sin start_date ni end_date para usar todo el dataset.
- Si start_date es mayor que end_date:
	bloquear acción Aplicar y mostrar mensaje de validación inline.

### 4) Componente: DateFilterActions

Propósito: Contener acciones de aplicación y limpieza.

| Prop | Tipo TypeScript | Descripción |
|---|---|---|
| canApply | boolean | Habilita o bloquea el envío según validaciones. |
| onApply | () => void | Ejecuta consulta con filtros normalizados. |
| onReset | () => void | Restaura fechas vacías. |
| isLoading | boolean | Muestra estado de ejecución en botón aplicar. |

---

## Funcionalidad 2: Tabla de Alertas

### Jerarquía de Componentes

1. AlertsSection
2. AlertThresholdControl
3. AnomaliesTable
4. AnomaliesEmptyState

### 1) Componente: AlertsSection

Propósito: Orquestar filtros y visualización de alertas.

| Prop | Tipo TypeScript | Descripción |
|---|---|---|
| params | AlertsParams | Query params vigentes para endpoint de alertas. |
| alerts | AlertEntry[] | Lista normalizada de anomalías para render. |
| onParamsChange | (next: AlertsParams) => void | Actualiza threshold y rango de fechas. |
| isLoading | boolean | Indica carga de datos. |
| errorMessage | string \| null | Error de red o backend para mostrar estado de error. |

### 2) Componente: AlertThresholdControl

Propósito: Ajustar sensibilidad del detector de anomalías.

| Prop | Tipo TypeScript | Descripción |
|---|---|---|
| value | AlertsParams["threshold"] | Valor del umbral activo, default visual 0.3 si no viene definido. |
| min | number | Límite inferior del control, recomendado 0.01. |
| max | number | Límite superior del control, recomendado 1.0. |
| step | number | Granularidad de ajuste del control. |
| onChange | (threshold: number) => void | Emite nuevo umbral para refrescar datos. |
| disabled | boolean | Bloquea interacción durante carga. |

### 3) Componente: AnomaliesTable

Propósito: Mostrar tabla de resultados cuando existen alertas.

| Prop | Tipo TypeScript | Descripción |
|---|---|---|
| rows | AlertEntry[] | Filas de anomalías a mostrar. |
| isLoading | boolean | Permite renderizar skeleton de tabla al cargar. |

Columnas visibles:

- Periodo: row.period
- Outcome registrado: row.outcome_total
- Media base: row.baseline_average
- Incremento porcentual: row.increase_ratio multiplicado por 100 con sufijo %

### 4) Componente: AnomaliesEmptyState

Propósito: Estado vacío explícito cuando no hay anomalías.

| Prop | Tipo TypeScript | Descripción |
|---|---|---|
| threshold | number | Umbral evaluado para el mensaje contextual. |
| dateRange | DateRangeFilter | Rango aplicado en la consulta actual. |

Reglas de renderizado y contenido:

- Si la API devuelve lista vacía de alertas para el umbral vigente:
	no ocultar la sección; mostrar AnomaliesEmptyState en lugar de la tabla.
- Mensaje principal obligatorio:
	No se detectaron anomalías para el umbral seleccionado.
- Mensaje secundario sugerido:
	Prueba reducir el umbral o ampliar el rango de fechas para aumentar la sensibilidad.
- Debe incluir visualmente el umbral usado y el rango efectivo aplicado.

---

## Funcionalidad 3: Vista B2B vs B2C

### Jerarquía de Componentes

1. BusinessLineComparison
2. BusinessLinePanel
3. TopCategoriesList
4. TopCategoriesEmptyState
5. BusinessComparisonChart

### 1) Componente: BusinessLineComparison

Propósito: Layout maestro de comparación entre líneas de negocio.

| Prop | Tipo TypeScript | Descripción |
|---|---|---|
| b2bTopCategories | CategoryEntry[] | Top categorías para panel B2B. |
| b2cTopCategories | CategoryEntry[] | Top categorías para panel B2C. |
| dateFilter | DateRangeFilter | Rango de fechas aplicado en ambos paneles. |
| isLoading | boolean | Estado de carga global de la vista comparativa. |
| errorMessage | string \| null | Error para renderizar feedback de fallo. |

Composición de layout:

- Fila superior con dos paneles paralelos: B2B a la izquierda y B2C a la derecha.
- Fila inferior con un único gráfico comparativo ocupando ancho completo.

### 2) Componente: BusinessLinePanel

Propósito: Contenedor reutilizable para cada segmento (B2B y B2C).

| Prop | Tipo TypeScript | Descripción |
|---|---|---|
| title | "B2B" \| "B2C" | Título fijo del panel. |
| categories | CategoryEntry[] | Lista de categorías top para el segmento. |
| isLoading | boolean | Estado de carga local del panel. |

Reglas de renderizado para lista vacía:

- Si categories.length es 0 en B2B:
	renderizar TopCategoriesEmptyState con texto No hay categorías de ingresos para B2B en el rango seleccionado.
- Si categories.length es 0 en B2C:
	renderizar TopCategoriesEmptyState con texto No hay categorías de ingresos para B2C en el rango seleccionado.
- En ambos casos mantener visible el título del panel para preservar contexto comparativo.

### 3) Componente: TopCategoriesList

Propósito: Listado ordenado de top-5 categorías de ingresos.

| Prop | Tipo TypeScript | Descripción |
|---|---|---|
| items | CategoryEntry[] | Colección de categorías a renderizar en orden descendente. |
| maxItems | TopCategoriesParams["limit"] | Límite de elementos esperados, valor 5. |

Reglas:

- Renderizar máximo 5 filas.
- Mostrar nombre de categoría y total_amount.
- Si existe group_share_ratio, mostrar porcentaje relativo del grupo.

### 4) Componente: TopCategoriesEmptyState

Propósito: Estado vacío por panel cuando no hay categorías.

| Prop | Tipo TypeScript | Descripción |
|---|---|---|
| businessType | "B2B" \| "B2C" | Segmento para personalizar mensaje. |
| dateFilter | DateRangeFilter | Rango aplicado para aportar contexto. |

Contenido mínimo:

- Título: Sin categorías disponibles.
- Descripción contextual por segmento y rango activo.

### 5) Componente: BusinessComparisonChart

Propósito: Gráfico comparativo inferior de desempeño B2B vs B2C.

| Prop | Tipo TypeScript | Descripción |
|---|---|---|
| b2bSeries | CategoryEntry[] | Serie agregada para la línea B2B. |
| b2cSeries | CategoryEntry[] | Serie agregada para la línea B2C. |
| isLoading | boolean | Habilita skeleton o placeholder del gráfico. |

Especificación de visualización:

- Tipo sugerido: gráfico de barras agrupadas por categoría (dos barras por categoría: B2B y B2C).
- Eje X: categoría.
- Eje Y: total_amount en moneda.
- Leyenda obligatoria con etiquetas B2B y B2C.
- Tooltip debe mostrar total por línea y diferencia absoluta entre ambas.
- Si ambas series están vacías, renderizar estado vacío del gráfico con mensaje:
	No hay datos comparativos para el rango seleccionado.
